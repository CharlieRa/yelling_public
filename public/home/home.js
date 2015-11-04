'use strict';

angular
  .module('yelling.home', ['ngMaterial', 'ngMessages', 'ngRoute'])
  .config(function($routeProvider)
  {
    $routeProvider.when('/home',{
      templateUrl: 'home/home.html',
      controller: 'homeCtrl'
    });
  })

  .controller('homeCtrl', homeCtrl)

  function homeCtrl ($scope, $location, $window)
  {
    $scope.loginOauth = function(provider) {
      $window.open('/auth/' + provider);
    };
  }
