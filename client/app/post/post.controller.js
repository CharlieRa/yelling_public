'use strict';

angular.module('testApp')
  .controller('PostCtrl', function ($scope, $http, socket, $stateParams, Auth) {
  	console.log('Entrando a PostCtrl con stateParam:', $stateParams);
  	$scope.currentUser = Auth.getCurrentUser;
  	$scope.comments = [];
    $http.get('/api/posts/'+$stateParams.id,{
    }).success(function(post) {
      console.log('[POST/Show] Result:', post);
      $scope.title = post.content;
      $scope.comments = post.comments;

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
      	$scope.comments.push(comment)
    	});
      $scope.newComment = '';

    };

  });
