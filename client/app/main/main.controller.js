'use strict';

angular.module('testApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.post('/api/posts/nearest',{
      longitude : -70.5807622,
      latitude : -33.5065764
    }).success(function(awesomeThings) {

      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('post', $scope.awesomeThings);

    });

    $scope.addThing = function() {

      if($scope.newThing === '') {
        return;
      }

      $http.post('/api/posts', { 
        content: $scope.newThing,
        // author: {
        //   id: '5623195c1d5696d514eab562'
        // },
        location: {
          longitude: -70.5807622,
          latitude : -33.5065764
        }
      });
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
