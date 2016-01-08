angular.module('signup', [])
  .controller('signupController', ['$scope', 'signupService', function ($scope, signupService) {

    $scope.sendUserInfo = function () {
      
      signupService.signUp($scope.username, $scope.password, $scope.email)
    
    }

  }])
