'use strict';
  angular
      .module('yelling.home', ['ngMaterial', 'ngMessages', 'ngRoute'])
      .config(function($routeProvider,$mdIconProvider, $locationProvider)
          {
            $routeProvider.when('/home', {
              templateUrl: 'home/home.html',
              controller: 'homeCtrl'
            });
            $mdIconProvider.iconSet('social', 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg');
          }
        )
      .controller('homeCtrl', homeCtrl)
      .run(['$rootScope', '$window', 'srvAuth',
        function($rootScope, $window, srvAuth) {
        $rootScope.user = {};
        $window.fbAsyncInit = function() {
          // Executed when the SDK is loaded
          FB.init({
            appId: '1676193472610816',
            /*
             Adding a Channel File improves the performance
             of the javascript SDK, by addressing issues
             with cross-domain communication in certain browsers.
            */

            // channelUrl: 'app/channel.html',

            /*
             Set if you want to check the authentication status
             at the start up of the app
            */
            status: false,
            cookie: true,
            xfbml: true
          });
          srvAuth.watchLoginChange();
        };
        // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?
        (function(d){
          // load the Facebook javascript SDK
          var js,
          id = 'facebook-jssdk',
          ref = d.getElementsByTagName('script')[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement('script');
          js.id = id;
          js.async = true;
          js.src = "//connect.facebook.net/en_US/all.js";
          ref.parentNode.insertBefore(js, ref);
        }(document));
      }]);
  function homeCtrl ($scope, srvAuth, $location)
  {
  if (navigator.geolocation)
  {
   navigator.geolocation.getCurrentPosition(function(position)
   {
     $scope.$apply(function()
     {
       $scope.position = position;
     });
    });
  }
    $scope.logout = function()
    {
      console.log("lala");
      srvAuth.logout();
    }
    $scope.fblogin = function()
    {
      console.log("lala2");
      srvAuth.fblogin();
    }
    $scope.resetForm = function()
    {
      var defaultForm = {
             email : "",
             password : ""
         };
      $scope.loginForm.$setPristine();
      $scope.user = defaultForm;
    }
    $scope.loginAuth = function()
    {
      var email = $scope.user.email;
      var pass = $scope.user.password;
      console.log("User: "+ email);
      console.log("Pass: "+ pass);
      if(email == "charlie")
        $location.path("/messages");
      else
        console.log("No tiene acceso");
    }
}