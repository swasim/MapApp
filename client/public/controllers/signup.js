angular.module('signup', [])
  .controller('signupController', ['$scope', 'httpService', function ($scope, httpService) {

    $scope.sendUserInfo = function () {
      httpService.signUp($scope.username, $scope.password, $scope.email)
    };

  }])
