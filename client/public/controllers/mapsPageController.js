app.controller('mapsPageController', ['$scope', '$http', 'httpService', function ($scope, $http, httpService) {

  $scope.tweets = {
    data: []
  };

  $scope.submitSearch = function () {
    console.log($scope.searchField)
    httpService.getTweets($scope.searchField)
      .then(function (success) {
        var tweet = success;
        for(var i = 0; i < tweet.length; i++) {
          $scope.tweets.data.push(tweet[i]);
        }
      });
  };

  $scope.favoriteSubmit = function () {
    httpService.sendFavorite($scope.favoriteField);
  };


  var onInit = function() {

    // var topic = 'golden';

    if(io !== undefined) {
      var socket = io.connect();

      socket.on('tweet-stream', function (data) {

        // THIS COULD BE IN A SERVICE
        $scope.tweets.data.push(data);
        // console.log($scope.tweets.data.length);
        // console.log('tweet stream client');
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
        //this could be in a service

      })

      socket.on('connected', function (r) {
        console.log('connected client');
        socket.emit('tweet flow');
      })
    };

  };

  onInit();

}]);
