'use strict';

angular.module('testApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/posts').success(function(awesomeThings) {

      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('post', $scope.awesomeThings);

    });

    $scope.addThing = function() {

      if($scope.newThing === '') {
        return;
      }

      $http.post('/api/posts', { name: $scope.newThing });
      $scope.newThing = '';

    };

    $scope.deletePost = function(post) {
      $http.delete('/api/posts/' + post.id); 
    };

    $scope.votePost = function(post) {
      $http.post('/api/posts/vote/' + post.id); 
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('post');
    });
  });
