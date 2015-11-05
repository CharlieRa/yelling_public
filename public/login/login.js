'use strict';

angular
  .module('yelling.login', ['ngMaterial', 'ngMessages', 'ui.router', 'ngAnimate'])
  .config(function($stateProvider)
  {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
      })
  })

  .controller('loginCtrl', loginCtrl);

  function loginCtrl ($scope, $location, $window)
  {
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
