var app = angular.module('app', ['signup', 'ui.router', 'renderMap'])
  .controller('mapsPageController', ['$scope', '$http', function ($scope, $http){

  }])

  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/'); 

    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'client/views/signup.html',
        controller: 'signupController'
      })

  })
