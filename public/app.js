'use strict';

angular
  .module('yelling',[
    'ui.router',
    'yelling.login',
    'yelling.messages',
    // 'yelling.perfil',
    'yelling.main',
    'yelling.comments',
    'yelling.feedbacks',
    'apiMock',
    'ngCookies',
    '$feedback.directives',
    'ngResource', 'ngAnimate'])
  .config(function($urlRouterProvider, $locationProvider, $httpProvider, $stateProvider)
  {
    $urlRouterProvider.otherwise('/');
  //   $locationProvider.html5Mode({
  //     enabled: true,
  //     requireBase: true
  // })
  // .config(function($stateProvider)
  //   {
  //     $stateProvider
  //       .state('login', {
  //         url: '/login',
  //         templateUrl: 'login/login.html',
  //         controller: 'loginCtrl'
  //       })
  //   });
  //   $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        console.log("hola");
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens

          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function ($rootScope, $location, Auth, $state) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      // $rootScope.$on('$stateChangeSuccess', function (event, next) {
      console.log("siguiente: ", next);
      console.log("cambiando..");
      Auth.isLoggedInAsync(function(loggedIn) {
        console.log(next.authenticate);
        console.log(!loggedIn);
        if (next.authenticate && !loggedIn) {
          console.log("lalalaallalaalla");
            $state.go("login");
            event.preventDefault();
        }
      });
    });
  });
