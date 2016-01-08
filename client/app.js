var app = angular.module('app', ['signup', 'ui.router'])
  .controller('mapsPageController', ['$scope', '$http', function ($scope, $http){


  }])

  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/'); 

    $stateProvider
      .state('start', {
        url: '/signin',
        templateUrl: 'client/views/signup.html', //signup
        controller: "signupController"
      })
  })
