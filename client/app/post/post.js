'use strict';

angular.module('testApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('post', {
        url: '/post/:id',
        templateUrl: 'app/post/post.html',
        controller: 'PostCtrl'
      });
  });