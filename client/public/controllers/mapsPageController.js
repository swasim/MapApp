app.controller('mapsPageController', ['$scope', '$http', 'httpService', function ($scope, $http, httpService) {

  $scope.tweets = {
    data: [{
      coordinates: {
        coordinates: [37.7749295, -122.4194155]
      }
    }]
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

    var topic = 'golden';

    if(io !== undefined) {
      var socket = io.connect("http://localhost:3000");

      socket.on('tweet-stream', function (data) {
        // console.log(data);
        $scope.tweets.data.push(data);
        // console.log($scope.tweets.data.length);
        // console.log('tweet stream client');

      })

      socket.on('connected', function (r) {
        console.log('connected client');
        socket.emit('tweet flow');
      })
    };

  };

  onInit();

}]);
