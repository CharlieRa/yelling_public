'use strict';

angular
  .module('yelling.sidenav', ['ngMaterial', 'ngMessages', 'ui.router', 'uiGmapgoogle-maps'])
  .controller('sideNavCtrl', function ($scope, $location, Auth, $mdSidenav, uiGmapGoogleMapApi) {
    $scope.settings = [
    { name: 'Yelling', path: '/messages', icon: 'dist/icons/send.svg', enabled: true },
    // { name: 'Perfil', path: '/perfil', icon: 'dist/icons/send.svg', enabled: true },
    { name: 'Cerra Sesión', path: '/logout', icon: 'dist/icons/send.svg', enabled: true }];
  $scope.admin = [
    {
      link : '',
      title: 'Trash',
      icon: 'delete'
    }];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.mapOptions = { center: { latitude: -33.447487 , longitude: -70.673676  }, zoom: 8 };

    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(function(position)
      {
        $scope.mapOptions.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        $scope.mapOptions.zoom = 14;
        $scope.marker = {
          id: 0,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        };
        $scope.$apply();
      },
      function(error)
      {
        console.log("error");
      });
    }

    $scope.go = function(path){
          $location.path(path);
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/home');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
