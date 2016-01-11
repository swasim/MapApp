app.controller('searchController', ['$scope', '$http', 'httpService', function ($scope, $http, httpService) {

  $scope.submitSearch = function () {
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
