'use strict';

angular
  .module('yelling.main', ['ngMaterial', 'ngMessages', 'ui.router', 'uiGmapgoogle-maps'])
  .config(function($stateProvider, $urlRouterProvider)
  {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'main/main.html',
        controller: 'mainCtrl',
        authenticate: true
      })
      .state('main.messages', {
        templateUrl: 'main/messages/messages.html',
        controller: 'messagesCtrl',
        authenticate: true
      })
      .state('main.comments', {
        url: 'comments/{id}',
        templateUrl: 'main/comments/comments.html',
        controller: 'commentsCtrl',
        authenticate: true
      })
      .state('main.perfil', {
        templateUrl: 'main/perfil/perfil.html',
        controller: 'perfilCtrl',
        authenticate: true
      })
      .state('main.feedbacks', {
        templateUrl: 'main/feedbacks/feedbacks.html',
        controller: 'feedbacksCtrl',
        authenticate: true
      });
      $urlRouterProvider.otherwise('main/messages');
  })
  .directive('scrollBottom', function ()
  {
    return {
      scope: {
        scrollBottom: "="
      },
      link: function (scope, element) {
        scope.$watchCollection('scrollBottom', function (newValue) {
          if (newValue)
          {
            $(element).scrollTop($(element)[0].scrollHeight);
          }
        });
      }
    }
  })
  .controller('mainCtrl', function ($scope, $state,$location, Auth, $mdSidenav, uiGmapGoogleMapApi, User ,$mdDialog) {
    $state.transitionTo('main.messages');
    $scope.settings = [
    { name: 'Yelling!', path: 'main.messages', icon: 'dist/icons/ic_message_black_24px.svg'},
    // { name: 'Perfil', path: 'main.perfil', icon: 'dist/icons/ic_account_box_24px.svg'},
    ];
    $scope.mapOptions = { center: { latitude: -33.447487 , longitude: -70.673676  }, zoom: 8 };

    $scope.currentUser = User.get();

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
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.showSideNav = function(){
      $mdSidenav('left').open()
    }
    $scope.go = function(path){
      $state.transitionTo(path);
    }
  });
