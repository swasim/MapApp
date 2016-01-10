app.controller('mapsPageController', ['$scope', '$http', 'httpService', function ($scope, $http, httpService){

    $scope.tweets = {
      data: []
    };

    $scope.submitSearch = function () {
      //for Akash: $scope.searchField the result of the search in index.html
      httpService.getTweets($scope.searchField)
        .then(function (success) {
        });
    };

    $scope.favoriteSubmit = function () {
      httpService.sendFavorite($scope.favoriteField);
    };

    $scope.login = function () {
      httpService.login();
    };

  }])
