app.controller('mapsPageController', ['$scope', '$http', 'httpService', '$sce', function ($scope, $http, httpService, $sce) {

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


  var onInit = function() {
    /////////////////////////////////////////////ASSUMPTIONS////////////////////////////////////////////////////
    
    //establish tweet relevancy criteria; 
    var numOfFollowersToBeRelevant = 2500;
    var numOfRetweetsToBeRelevant = 10; 
    //establish relevant tweet limit;
    var maxNumOfRelevantTweetsAllowed = 15;

    ////////////////////////////////////////////SOCKET CONNECTION///////////////////////////////////////////////
    
    if(io !== undefined) {
      //connects to socket
      var socket = io.connect();
      //uses socket to listen for incoming tweet stream 
      socket.on('tweet-stream', function (data) {

        ///////////////////////////////////DETERMINE RELEVANCE/QUALITY OF TWEET//////////////////////////////////
        //set relevant parameters
        var numOfFollowers = data.followers_count;
        var numOfRetweets = data.retweet_count;
        var verifiedAccount = data.verified;
        var tweetString = "";
        //if incoming tweet meets relevancy criteria...
        if((numOfFollowers >= numOfFollowersToBeRelevant) || (numOfRetweets >= numOfRetweetsToBeRelevant)){
          //then check to see how many relevant tweets are already being displayed on page; if max limit 
          //has already been reached then pop last item out of relevantsTweets array
          if($scope.relevantTweets.length === maxNumOfRelevantTweetsAllowed){
            $scope.relevantTweets.pop();
          }
          //for all incoming tweets that match criteria, create a tweetString that contains most relevant info for tweet
          //(e.g. handle, content, and time);
          tweetString = "<b>"+data.handle+": <b>" + data.tweetText +  " <i>"+data.tweetTime+"</i>";
          //make sure tweetString can be accepted by DOM as html
          tweetString = $sce.trustAsHtml(tweetString);
          //add latest tweetString to the beginning of the relevantTweets array;
          $scope.relevantTweets.unshift(tweetString);
          console.log("relevant tweets arr -->", $scope.relevantTweets.length);
        }

        ///////////////////////////////////PLACE ALL INCOMING TWEETS ON MAP///////////////////////////////////////
        $scope.allTweets.data.push(data);

        var tweetLocation = new google.maps.LatLng(data["coordinates"]["coordinates"][1], data["coordinates"]["coordinates"][0]);
        var tweetMarker = new google.maps.Marker({
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

      })

      socket.on('connected', function (r) {
        console.log('connected client');
        socket.emit('tweet flow');
      })
    };

  };

  onInit();

}]);
