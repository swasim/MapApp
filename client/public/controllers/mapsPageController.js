app.controller('mapsPageController', ['$scope', '$http', 'httpService', function ($scope, $http, httpService){

    $scope.tweets = {
      data: []
    };

    $scope.submitSearch = function () {
      httpService.getTweets($scope.searchField)
        .then(function (data) {
          $scope.tweets.data.push(data);
        });
    };

    $scope.favoriteSubmit = function () {
      httpService.sendFavorite($scope.favoriteField);
    };

    $scope.login = function () {
      httpService.login();
    };

  }])
