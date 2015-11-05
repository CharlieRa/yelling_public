'use strict';

angular
  .module('yelling.home', ['ngMaterial', 'ngMessages', 'ui.router', 'ngAnimate'])
  .config(function($stateProvider)
  {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
      })
  })

  .controller('homeCtrl', homeCtrl)

  function homeCtrl ($scope, $location, $window)
  {
    $scope.loginOauth = function(provider) {
      $window.open('/auth/' + provider);
    };
  }
