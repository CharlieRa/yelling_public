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
      $scope.position;
      /* Obtener Posicion por navegador */
      if (navigator.geolocation)
      {
       navigator.geolocation.getCurrentPosition(function(position)
       {
        //  position =
        //  {
        //    latitude: position.coords.latitude,
        //    longitude: position.coords.longitude
        //  }
        //  console.log(position);
         $scope.$apply(function()
         {
            //$scope.geolocation = position;
            $scope.position =
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
            console.log($scope.position);
          });
        });
      }

      /* solo por ejemplo */
        $scope.places = [
        {
          name: 'Casa',
          location: {lat:-33.4656 , lng: -77.6546},
          distance: 156
        },
        {
          name: 'pega',
          location: {lat:-33.4656 , lng: -77.6546},
          distance: 154
        },
        {
          name: 'otro',
          location: {lat:-33.4656 , lng: -77.6546},
          distance: 153
        },
        {
          name: 'parque',
          location: {lat:-33.4656 , lng: -77.6546},
          distance: 152
        },
        {
          name: 'universidad',
          location: {lat:-33.4656 , lng: -77.6546},
          distance: 151
        },
        {
          name: 'barrio',
          location: {lat:-33.4656 , lng: -77.6546},
          distance: 148
        },
        {
          name: 'supermercado',
          location: {lat:-33.4656 , lng: -77.6546},
          distance: 148
        }];
      /*      */
      // http://localhost:8000/#/messages?apimock=true
      $http.get('/api/posts/nearest')
      // $http.post('/api/posts/nearest',{
      //   longitude : -70.5807622,
      //   latitude : -33.5065764
      //   })
      // $http.post('/api/posts/nearest',{
      //   longitude : $scope.position.longitude,
      //   latitude : $scope.position.latitude
      //   })
      // $http.post('http://54.207.86.25/api/posts/nearest',{
      //     longitude : -70.5807622,
      //     latitude : -33.5065764
      //   })
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
          var currentDatetime = new Date();
          $scope.messages.push(
            {
              text: $scope.messages.newMessage,
              location: $scope.position,
              dateTime: currentDatetime
              // votes: value.obj.votes
              // dis: Math.floor(value.dis)
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
