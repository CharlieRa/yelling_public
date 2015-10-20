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
      .directive('scrollBottom', function ()
      {
        return {
          scope: {
            scrollBottom: "="
          },
          link: function (scope, element) {
            scope.$watchCollection('scrollBottom', function (newValue) {
              if (newValue)
              {
                $(element).scrollTop($(element)[0].scrollHeight);
              }
            });
          }
        }
      })
      .controller('messagesCtrl', messageCtrl);

  function messageCtrl ($scope)
  {
    var side = 'right';
    $scope.messages = [{text: "Bienvenido!, escribe algo interesante..."}];
    // $scope.messages = [];
    $scope.sendMessage = function()
    {
      side = side == 'left' ? 'right' : 'left';
      if(!$scope.messages.newMessage == "")
      {
        $scope.messages.push(
          {
            text: $scope.messages.newMessage,
            side: 'left'
          });
        $scope.formNewMessage.$setPristine();
        $scope.messages.newMessage = "";
      }
    }
    $scope.user = {
      username : 'Carlos',
      avatar   : 'img/avatar.jpg'
    }
    // $(".bubble-container").animate({
    //     bottom: $(".bubble-container").height() - $("#chatbox").height()
    // }, 250);
  }
