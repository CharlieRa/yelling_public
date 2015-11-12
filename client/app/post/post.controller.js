'use strict';

angular.module('testApp')
  .controller('PostCtrl', function ($scope, $http, socket, $stateParams, User) {
  	console.log('Entrando a PostCtrl con stateParam:', $stateParams);
  	$scope.currentUser = User.get();
  	$scope.comments = [];
    $http.get('/api/posts/'+$stateParams.id,{
    }).success(function(post) {
      console.log('[POST/Show] Result:', post);
      $scope.post = post;

    });

    $scope.addComment = function() {

      if($scope.newComment === '') {
        return ;
      }

      $http.post('/api/comments', { 
        content: $scope.newComment,
        post: {
          id: $stateParams.id
        },
        user: {
        	id: $scope.currentUser._id
        }
      }).success(function(comment) {
      	$scope.comments.push(comment);
    	});
      $scope.newComment = '';

    };

  });
