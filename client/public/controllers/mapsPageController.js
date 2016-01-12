app.controller('mapsPageController', ['$scope', '$http', 'httpService', '$sce', "$timeout", function ($scope, $http, httpService, $sce, $timeout) {

  //contains data for ALL incoming tweets
  $scope.allTweets = {
    data: []
  };

  //contains data for ONLY quality/relevant tweets
  $scope.relevantTweets = [];

  $scope.submitSearch = function () {
    console.log($scope.searchField)
    httpService.getTweets($scope.searchField)
      .then(function (success) {
        var tweet = success;
        for(var i = 0; i < tweet.length; i++) {
          $scope.allTweets.data.push(tweet[i]);
        }
      });
  };

  $scope.favoriteSubmit = function () {
    httpService.sendFavorite($scope.favoriteField);
  };

  //used for relevantTweets
  $scope.addRelevantTweet = function(tweet){
    $scope.relevantTweets.unshift(tweet);
  }

  var onInit = function() {
    ///////////////////////////////////ASSUMPTIONS + VARIABLES//////////////////////////////////////////////////
    //establish criteria for tweets on map
    var maxNumOfTweetsAllowedOnMap = 100;
    var heatmap = new google.maps.visualization.HeatmapLayer({
      radius: 15
    });
    //establish tweet relevancy criteria; 
    var numOfFollowersToBeRelevant = 2500;
    var numOfRetweetsToBeRelevant = 10; 
    //establish relevant tweet limit;
    var maxNumOfRelevantTweetsAllowed = 15;


    //SET UP HEAT MAP
    $timeout(function(){
      heatmap.setMap(window.map);
    }, 10);
 
    ////////////////////////////////////////////SOCKET CONNECTION///////////////////////////////////////////////
    if(io !== undefined) {
      //connects to socket
      var socket = io.connect();
      //uses socket to listen for incoming tweet stream 
      socket.on('tweet-stream', function (data) {

        if($scope.allTweets.data.length > maxNumOfTweetsAllowedOnMap){
          var pinToRemove = $scope.allTweets.data.shift();
          pinToRemove.setMap(null);
        }
        ///////////////////////////////////DETERMINE RELEVANCE/QUALITY OF TWEET//////////////////////////////////
        //set relevant parameters
        var numOfFollowers = data.followers_count;
        var numOfRetweets = data.retweet_count;
        var verifiedAccount = data.verified;
        var tweetObject = {};
        //if incoming tweet meets relevancy criteria...
        if((numOfFollowers >= numOfFollowersToBeRelevant) || (numOfRetweets >= numOfRetweetsToBeRelevant)){
          //then check to see how many relevant tweets are already being displayed on page; if max limit 
          //has already been reached then pop last item out of relevantsTweets array
          if($scope.relevantTweets.length === maxNumOfRelevantTweetsAllowed){
            $scope.relevantTweets.pop();
          }
          //for all incoming tweets that match criteria, create a tweetObject that contains most relevant info for tweet
          //(e.g. handle, content, and time);         
          tweetObject = {
            handle: data.handle,
            text: data.tweetText,
            time: data.tweetTime
          };
          //add latest tweetObject to the beginning of the relevantTweets array;
          $scope.$apply(function() {
            $scope.addRelevantTweet(tweetObject);
          })
          console.log("relevant tweets arr -->", $scope.relevantTweets);
        }

        ///////////////////////////////////PLACE ALL INCOMING TWEETS ON MAP///////////////////////////////////////

        var tweetLocation = new google.maps.LatLng(data["coordinates"]["coordinates"][1], data["coordinates"]["coordinates"][0]);
        
        heatmap.data.push(tweetLocation);
        
        var tweetMarker = new google.maps.Marker({
           icon: "client/assets/small-dot-icon.png",
           position: tweetLocation,
           map: window.map
         });

        //determine content added to info window on each marker  
        var tweetContent = '<div>' + data['name'] + ": " + data['tweetText'] + '</div>';
        var markerInfoWindow = new google.maps.InfoWindow({
           content: tweetContent
         });

        //set up listeners for each tweetMarker...
        tweetMarker.addListener('mouseover', function () {
          markerInfoWindow.open(map, tweetMarker);
         });
        tweetMarker.addListener('mouseout', function () {
        markerInfoWindow.close();
         });
        // //set tweet on map...
        tweetMarker.setMap(window.map, tweetLocation, tweetContent);

        $scope.allTweets.data.push(tweetMarker);

      })

      socket.on('connected', function (r) {
        console.log('connected client');
        socket.emit('tweet flow');
      })
    };

  };

  onInit();

}]);
