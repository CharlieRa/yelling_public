'use strict';

// Declare app level module which depends on views, and components
angular
.module('yelling',
  [
    'ngRoute',
    'yelling.home',
    'yelling.messages',
    'yelling.perfil'
    // 'yelling.version'
  ])
.config(['$routeProvider', function($routeProvider)
  {
    $routeProvider.otherwise({redirectTo: '/home'});
  }])
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
        // console.log("lala");
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
  ]);
