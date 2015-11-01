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

  function homeCtrl ($scope)
  {
    // $scope.logout = function()
    // {
    //   srvAuth.logout();
    // }
    // $scope.fblogin = function()
    // {
    //   srvAuth.fblogin();
    // }
  }
