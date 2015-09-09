'use strict';
  angular
      .module('yell.home', ['ngMaterial', 'ngMessages', 'ngRoute'])
      // .config(
      //   ['$routeProvider', function($routeProvider,$mdIconProvider)
      .config(function($routeProvider,$mdIconProvider)
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
  function homeCtrl ($scope, $timeout, $q,srvAuth)
  {
    $scope.logout = function() {
      console.log("lala");
      srvAuth.logout();
    }
    $scope.fblogin = function() {
      console.log("lala2");
      srvAuth.fblogin();
    }
    // var self = this;
    // list of `state` value/display objects
    // self.states        = loadAll();
    // self.selectedItem  = null;
    // self.searchText    = null;
    // self.querySearch   = querySearch;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    // function querySearch (query) {
    //   var results = query ? self.states.filter( createFilterFor(query) ) : [];
    //   return results;
    // }
    /**
     * Build `states` list of key/value pairs
     */
    // function loadAll() {
    //   var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
    //           Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
    //           Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
    //           Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
    //           North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
    //           South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
    //           Wisconsin, Wyoming';
    //   return allStates.split(/, +/g).map( function (state) {
    //     return {
    //       value: state.toLowerCase(),
    //       display: state
    //     };
    //   });
    // }
    /**
     * Create filter function for a query string
     */
    // function createFilterFor(query) {
    //   var lowercaseQuery = angular.lowercase(query);
    //   return function filterFn(state) {
    //     return (state.value.indexOf(lowercaseQuery) === 0);
    //   };
    // }
}
