  'use strict';
  angular.module('yelling.messages', ['ngMaterial', 'ngMessages', 'ngRoute', 'apiMock'])

      .config(function($routeProvider)
      {
        $routeProvider.when('/messages', {
          templateUrl: 'messages/messages.html',
          controller: 'messagesCtrl'
        })
      })

      .config(function (apiMockProvider) {
          apiMockProvider.config({
            mockDataPath: '/mock_data',
            apiPath: '/api'
          });
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

  function messageCtrl ($scope, $http)
  {
    // var side = 'right';
    $scope.messages = [];
    $http.get('/api/post/nearest') // http://localhost:8000/#/messages?apimock=true
    .success(function(data, status, headers, config)
    {
      // $scope.messages = data;
      angular.forEach(data, function(value, key)
      {
        $scope.messages.push({
            text: value.obj.content,
            location: value.obj.location,
            dateTime: value.obj.dateTime,
            votes: value.obj.votes,
            dis: Math.floor(value.dis)
        });
        console.log(key + ': ' + value);
      });
      console.log(data);
    })
    .error(function(data, status, headers, config)
    {
      console.log("error");
    });
    $scope.sendMessage = function()
    {
      // side = side == 'left' ? 'right' : 'left';
      if(!$scope.messages.newMessage == "")
      {
        $scope.messages.push(
          {
            text: $scope.messages.newMessage
            // side: 'lal'
          });
        $scope.formNewMessage.$setPristine();
        $scope.messages.newMessage = "";
      }
    }
    $scope.user = {
      username : 'Carlos',
      avatar   : 'img/avatar.jpg'
    }
    $scope.getMessages = function()
    {
      console.log("lala");
      $http.get('/api/post/nearest').success(function(data)
      {
        // $scope.name = data[0].dis;
        console.log(data);
      });

    }
  }
