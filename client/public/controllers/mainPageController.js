app.controller('mapsPageController', ['$scope', '$http', 'httpService', function ($scope, $http, httpService){

    $scope.submitSearch = function () {
      //for Akash: $scope.searchField the result of the search in index.html
      httpService.getTweetsOntoMap($scope.searchField);
    };

    $scope.favoriteSubmit = function () {
      httpService.sendFavorite($scope.favoriteField);
    };

  }])
