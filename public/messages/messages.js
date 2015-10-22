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

    $scope.messages = [];

    /* solo por ejemplo */
      $scope.todos = [
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      }];
    /*      */
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

    /* Dinamyc background */
    $http.get('/dist/img/backgrounds/bgsDin/backgrounds.json')
    .success(function(data) {
      var rndBg = Math.floor(Math.random() * data.length) + 1;
      var bg = data[rndBg]['bgUrl'];
      var path = '/dist/img/backgrounds/bgsDin/'
      var url = path+bg;
      if(angular.isDefined(bg)){
        $scope.bgUrl = url;
      }else{
        $scope.bgUrl = path+'bg1.png';
      }
    });

    $scope.sendMessage = function()
    {
      if(!$scope.messages.newMessage == "")
      {
        $scope.messages.push(
          {
            text: $scope.messages.newMessage
          });
        $scope.formNewMessage.$setPristine();
        $scope.messages.newMessage = "";
      }
    }
    $scope.user = {
      username : 'Carlos',
      avatar   : 'img/avatar.jpg'
    }
  }
