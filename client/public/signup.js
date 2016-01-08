angular.module('signup', [])
  .controller('signupController', ['$scope', '$http', function ($scope, $http) {

    $scope.sendUsernameAndPass = function () {
      
      var signupUser = {
        username: $scope.username,
        password: $scope.password,
        email: $scope.email
      };

      $http.post('/newUser', signupUser)  // "/newuser" is a temporary route
        .then(function (success) {
          //successful post to endpoint
        }, function (error) {
          //failure to post
        })
    }

  }])
