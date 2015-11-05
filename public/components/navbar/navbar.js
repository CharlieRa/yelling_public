'use strict';

angular
  .module('yelling.navbar', ['ngMaterial', 'ngMessages', 'ui.router'])
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    console.log('Current user: ', Auth.getCurrentUser());
    console.log(Auth.isLoggedIn());
    $scope.logout = function() {

      Auth.logout();
      $location.path('/home');
    };
  });
