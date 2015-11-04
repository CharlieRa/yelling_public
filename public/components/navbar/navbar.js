'use strict';

angular
  .module('yelling.navbar', ['ngMaterial', 'ngMessages', 'ngRoute'])
  .controller('NavbarCtrl', function ($scope, $location, Auth,  $mdSidenav) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.menu = [
    {
      link : '',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link : '',
      title: 'Friends',
      icon: 'group'
    },
    {
      link : '',
      title: 'Messages',
      icon: 'message'
    }
  ];
  $scope.admin = [
    {
      link : '',
      title: 'Trash',
      icon: 'delete'
    }
  ];
      this.toggleMenu = function()
      {
        console.log("click");
        $mdSidenav('left')
          .toggle()
          .then(function ()
          {
            console.log("se abre");
          });
      };

      this.closeMenu = function ()
      {
        $mdSidenav('left')
          .toggle()
          .then(function ()
          {
            console.log("se cierra");
          });
      };

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    // console.log('Current user: ',Auth.getCurrentUser());
    $scope.logout = function() {
      Auth.logout();
      $location.path('/home');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
