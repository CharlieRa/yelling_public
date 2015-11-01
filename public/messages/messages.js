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

    /**
    * Funcion controller de Messages
    **/
    function messageCtrl($scope, $http)
    {
      var positionActual = {};
      $scope.messages = [];
      $scope.toggle = [{
        yelling: 'false',
        error: 'false',
        progress: 'false'
      }];
      $scope.error=[];

      /**
      * Obtener Posicion por navegador cuando aplicación inicia
      */
      if (navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition(function(position)
        {
          positionActual.longitude = position.coords.longitude;
          positionActual.latitude = position.coords.latitude;

          /**
          * Si te obtiene ubicacion se traen los mensajes cercanos del servidor
          */
          $http.post('http://54.207.86.25/api/posts/nearest',{
          // $http.post('/api/posts/nearest',{
            longitude : position.coords.longitude,
            latitude : position.coords.latitude
          })
          .success(function(data, status, headers, config)
          {
            /**
            * Se desactiva progress y activa input para enviar mensajes
            */
            $scope.toggle.yelling = 'true';
            $scope.toggle.progress = 'true';
            /**
            * Se comprueba cantidad de mensajes en la zona, si es cero se envia un mensaje por defecto(Pueder ser puesto en otra parte...)
            */
            if(data.length == 0)
            {
              var currentDatetime = new Date();
              $scope.messages.push({
                text: 'Bienvenido, aún no hay mensajes en esta zona, Se el primero!. Escribe algo divertido para empezar.',
                location: positionActual,
                dateTime: currentDatetime,
                // votes: value.obj.votes,
                // dis: Math.floor(value.dis)
              });
            }
            angular.forEach(data, function(value, key)
            {
              $scope.messages.push({
                text: value.obj.content,
                location: value.obj.location,
                dateTime: value.obj.dateTime,
                votes: value.obj.votes,
                dis: Math.floor(value.dis)
              });
            });
          })
          .error(function(data, status, headers, config)
          {
            /**
            * ToDo: Mensaje con error al no poder conectar con servidor
            */
            console.log("error");
          });
        },
        /**
        * Manejo de error al no poder obtener ubicacion de usuario
        */
       function(positionError)
       {
         errorGeo(positionError);
       });
    }else
    {
      $scope.$apply(function()
      {
        $scope.error.message = 'Tu navegador no soporta geolocalizacion, no puedes usar el sericio, te pedimos dislcupas :(';
        $scope.toggle.error = 'true';
        $scope.toggle.progress = 'true';
      });
      console.log("Navegador no soporta geolocalizacion.");
    }

      /**
      * Dinamyc background: Fondo dinamico para la vista messages
      */
      $http.get('/dist/img/backgrounds/bgsDin/backgrounds.json')
      .success(function(data)
      {
        var rndBg = Math.floor(Math.random() * data.length-1) + 1;
        var bg = data[rndBg]['bgUrl'];
        var path = '/dist/img/backgrounds/bgsDin/'
        var url = path+bg;
        if(angular.isDefined(bg)){
          $scope.bgUrl = url;
        }else
        {
          $scope.bgUrl = path+'bg1.png';
        }
      });
      /**
      * Funcion encargada en enviar nuevos mensajes escritos por el usuario al servidor
      */
      $scope.sendMessage2 = function()
      {
        /* Se comprueba que el mensaje no este vacío*/
        if(!$scope.messages.newMessage == "")
        {
           var currentDatetime = new Date();
           var loc = [];
           loc[0] = positionActual.longitude;
           loc[1] = positionActual.latitude;
           $scope.messages.push(
           {
             text: $scope.messages.newMessage,
             location: loc,
             dateTime: currentDatetime
            //  votes: value.obj.votes,
            //  dis: Math.floor(value.dis)
           });
           $scope.formNewMessage.$setPristine();
           $scope.messages.newMessage = "";
        }
      }
      $scope.sendMessage = function()
      {
        /* Se comprueba que el mensaje no este vacío*/
        if(!$scope.messages.newMessage == "")
        {
          // var currentDatetime = new Date();
          // var loc = [];
          // loc[0] = positionActual.longitude;
          // loc[1] = positionActual.latitude;
          // $scope.messages.push(
          // {
          //   text: $scope.messages.newMessage,
          //   location: loc,
          //   dateTime: currentDatetime
            // votes: value.obj.votes
            // dis: Math.floor(value.dis)
          // });

          $http.post('http://54.207.86.25/api/posts',{
          // $http.post('/api/posts/nearest',{
            content: $scope.messages.newMessage,
            location: positionActual
          })
          .success(function(data, status, headers, config)
          {
            /*ToDo Manejo de la data que llega para agregarla como  mensaje*/
            console.log(data);
          })
            /*ToDo Manejo de errores que se pueden producir */
          .error(function(data, status, headers, config)
          {
            console.log(data);
          });

          $scope.formNewMessage.$setPristine();
          $scope.messages.newMessage = "";
        }
      }

      /**
      * Watcher si la posicion del dispositivo cambia, actualiza la variable global positionActual
      */
      var id;
      id = navigator.geolocation.watchPosition(success, error);
      function success(position)
      {
        positionActual.longitude = position.coords.longitude;
        positionActual.latitude = position.coords.latitude;
      };
      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };

      /**
      * Funcion para manejar todos los errores de geolocalizacion
      */
      function errorGeo(errCode)
      {
        if(errCode.code == 1)
        {
          $scope.error.message = "Has denegado el uso de geolocalización, Yelling necesita saber tu ubicación.\
            Si deseas utilizar Yelling por favor recarga la página y presiona en 'Permitir' cuando pregunten por tu ubicación. Gracias!";
          console.log("err code:" + errCode.code);
        }
        else if (errCode.code == 2)
        {
          $scope.error.message = "No hemos podido obtener tu ubicación, por favor intenta recargando la página."
          console.log("err code:" + errCode.code);
        }
        else if (errCode.code == 3)
        {
          $scope.error.message = "No hemos podido obtener tu ubicación, por favor intenta recargando la página."
          console.log("err code:" + errCode.code);
        }
        $scope.$apply(function()
        {
          $scope.error.message;
          $scope.toggle.error = 'true';
          $scope.toggle.progress = 'true';
        });
      }

      $scope.user = {
        username : 'Carlos',
        avatar   : 'img/avatar.jpg'
      }
    }
