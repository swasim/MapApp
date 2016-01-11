app.controller('mapsPageController', ['$scope', '$http', 'httpService', function ($scope, $http, httpService) {

  $scope.tweets = {
    data: []
  };

  $scope.submitSearch = function () {
    console.log($scope.searchField)
    httpService.getTweets($scope.searchField)
      .then(function (success) {
        var tweet = success;
        $scope.tweets.data.push(tweet);
      });
  };

  $scope.favoriteSubmit = function () {
    httpService.sendFavorite($scope.favoriteField);
  };


}]);
