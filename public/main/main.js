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

    $scope.showFeedback = function(ev){
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          controller: function($scope , $mdDialog, $http ,$mdToast)
          {
            $scope.submitMe = function() {
            var comment;
            comment = $scope.feedback.comment;
            console.log('Enviando feedback con valor:', comment);
            $http.post('/api/feedbacks', {
              content: comment
            }).success(function(){
              $mdToast.show(
                 $mdToast.simple()
                   .content('Feedback enviado, gracias!')
                   .hideDelay(5000)
               );
              $mdDialog.hide();
            });
          };
          $scope.cancelDialog = function()
          {
            $mdDialog.hide();
          }
          },
          clickOutsideToClose: true,
          template:'<md-dialog flex="40" aria-label="New Feedback"> \
                      <form ng-submit="$event.preventDefault()" name="formNewMessage" id="formNewMessage">\
                        <md-toolbar>\
                          <div class="md-toolbar-tools">\
                            <h2>Nuevo Feedback</h2>\
                          </div>\
                        </md-toolbar>\
                        <md-progress-linear ng-if="toggleProgress" md-mode="indeterminate"></md-progress-linear>\
                        <md-dialog-content style="max-width:800px;max-height:810px; ">\
                          <div class="md-dialog-content">\
                          <md-input-container flex>\
                              <label>Nuevo Feedback</label>\
                              <input ng-readonly="toggleProgress" ng-model="feedback.comment" md-maxlength="200"></input>\
                            </md-input-container>\
                          </div>\
                        </md-dialog-content>\
                        <div class="md-actions" layout="row" ng-if="!toggleProgress">\
                          <span flex></span>\
                          <md-button type="submit" ng-click="submitMe()" class="md-primary"> Enviar </md-button>\
                          <md-button ng-click="cancelDialog()"> Volver </md-button>\
                        </div>\
                      </form>\
                    </md-dialog>',
          targetEvent: ev,
        });
      }
  });
