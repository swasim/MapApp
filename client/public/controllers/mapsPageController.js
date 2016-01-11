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


}]);
