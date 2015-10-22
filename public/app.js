'use strict';
// Declare app level module which depends on views, and components
angular
.module('yelling',['ngRoute','yelling.home','yelling.messages','yelling.perfil','apiMock'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
  {
    $routeProvider
    .otherwise({redirectTo: '/home'});
    // $locationProvider.html5Mode({
    //   enabled: false,
    //   requireBase: false
    // });
  }])
.controller('mainCtrl', function($scope,  $mdSidenav, $mdDialog, $mdUtil, $timeout, $log)
{
  var originatorEv;
   this.openMenu = function($mdOpenMenu, ev)
   {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };
   /* Abre un alert message */
   this.redial = function()
   {
     $mdDialog.show(
       $mdDialog.alert()
         .targetEvent(originatorEv)
         .clickOutsideToClose(true)
         .parent('body')
         .title('Suddenly, a redial')
         .content('You just called a friend; who told you the most amazing story. Have a cookie!')
         .ok('That was easy')
     );
     originatorEv = null;
   };

  this.togglePerfil = function()
  {
      $mdSidenav('left')
        .toggle()
        .then(function ()
        {
          $log.debug("toggle " + 'left' + " is done");
        });
    };
  this.closeSidenav = function ()
  {
    $mdSidenav('left')
      .toggle()
      .then(function ()
      {
        $log.debug("close LEFT is done");
      });
  };
})
.factory("srvAuth", ['$rootScope',
    function($rootScope) {
      var srvAuth = {};

      srvAuth.fblogin = function() {
        FB.login(function (response) {
          if (response.status === 'connected') {
            // You can now do what you want with the data fb gave you.
            console.info(response.authResponse);
            FB.api('/me', {fields: 'gender, locale, first_name'}, function(response) {
              console.log(response);
            });
            // console.info(response.email);
            // console.info(response.user_likes);
            // console.info(response.authResponse);
            // console.info(response.scope);
          }
        }, {
          scope: 'public_profile,email,user_likes',
          return_scopes: true
        });
      }

      srvAuth.watchLoginChange = function() {
        var _self = this;
        FB.Event.subscribe('auth.authResponseChange', function(res)
        {
          if (res.status === 'connected') {
            FB.api('/me', function(res) {
              $rootScope.$apply(function() {
                $rootScope.user = _self.user = res;
                console.info($rootScope.user);
              });
            });
          } else {
            alert('Not Connected');
          }
        });
      }
      srvAuth.logout = function() {
        var _self = this;
        FB.logout(function(response) {
          $rootScope.$apply(function() {
            $rootScope.user = _self.user = {};
            console.log("logout");
          });
        });
      }
      return srvAuth;
    }
  ]).
factory('mySocket', function (socketFactory) {
  var mySocket = socketFactory();
  mySocket.forward('error');
  return mySocket;
});
