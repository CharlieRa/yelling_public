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
  .controller('mainCtrl', function ($scope, $state,$location, Auth, $mdSidenav, uiGmapGoogleMapApi, User ,$mdDialog, $mdToast, $rootScope, socket) {
    socket.notifications();

    $rootScope.notifications = [
      {user: 'Charles', message: 'Sale Pilsen?', data:'Fecha: 12-12-2015' },
      {user: 'Charles', message: 'Sale Pilsen?', data:'Fecha: 12-12-2015' },
      {user: 'Charles', message: 'Sale Pilsen?', data:'Fecha: 12-12-2015' },
      {user: 'Charles', message: 'Sale Pilsen?', data:'Fecha: 12-12-2015' },
      {user: 'Charles', message: 'Sale Pilsen?', data:'Fecha: 12-12-2015' },
      {user: 'Charles', message: 'Sale Pilsen?', data:'Fecha: 12-12-2015' },
    ];
    $state.transitionTo('main.messages');

    $scope.mapOptions = { center: { latitude: -33.447487 , longitude: -70.673676  }, zoom: 8 };
    $scope.currentUser = User.get();

    // $scope.$on('event', function(event, userId)
    // {
    //   console.log(userId);
    // });

    $scope.notificationToast = function() {
      $mdToast.show({
        controller: 'ToastCtrl',
        template:'<md-toast class="pointer" style="background-color: #16a085;"> \
                    <md-button ng-click="showActionToast()">\
                      Nuevo comentario en uno de tus Post!\
                    </md-button>\
                    <md-button ng-click="closeToast()">\
                      Cerrar\
                    </md-button>\
                  </md-toast>',
        hideDelay: 2000,
        position: 'top right'
      });
    };

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
    $scope.yelling = function() {
      $state.transitionTo('main.messages');
    };
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.showSideNav = function(){
      $mdSidenav('left').open()
    }
    $scope.closeSideNav = function(){
      $mdSidenav('left').close()
    }
    $scope.go = function(path){
      $state.transitionTo(path);
    }
    $scope.openNotifications = function() {
      $mdSidenav('right').open()
    };
    $scope.closeNotifications = function() {
      $mdSidenav('right').close()
    };
  })
  .controller('ToastCtrl', function($scope, $mdToast, $state, $rootScope) {
    $scope.closeToast = function() {
      $mdToast.hide();
    };

    $scope.showActionToast = function() {
      $state.go('main.comments', {id: '5670caffc36b80f54793c8f5'});
      $mdToast.hide();
      console.log($rootScope.notifications);
    };

    $scope.getNotifications = function(userId)
    {
      if(userId === undefined)
        return false;
      else{
        $http.post('/api/notifications',{
          content : userId
        })
        .success(function(data, status, headers, config)
        {
          console.log(data);
          if(data.length == 0)
          {
            console.log("no hay notificaciones");
          }
        })
        .error(function(data, status, headers, config)
        {
          console.log("error al obtener notificaiones");
        });
      }
    };
  });
