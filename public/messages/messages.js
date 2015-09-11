  'use strict';
  angular
      .module('yelling.messages', ['ngMaterial', 'ngMessages', 'ngRoute'])
      .config(function($routeProvider)
      {
        $routeProvider.when('/messages', {
          templateUrl: 'messages/messages.html',
          controller: 'messagesCtrl'
        });
        // $mdIconProvider.iconSet('content', 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg');
      })
      .controller('messagesCtrl', DemoCtrl);

  function DemoCtrl ($scope)
  {
    $scope.messages = [{text: "hola"}];
    // $scope.messages = [];
    console.log("lala");
    $scope.sendMessage = function()
    {
      console.log($scope.messages.newMessage);
      $scope.messages.push({text: $scope.messages.newMessage});
      $scope.formNewMessage.$setPristine();
      $scope.messages.newMessage = "";
    }
  }
