  'use strict';

  angular.module('yelling.messages', ['ui.router', 'ngMaterial', 'ngMessages', 'uiGmapgoogle-maps', 'ngAnimate'])
    .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyASPPeOiF-w1w--6G4ZjS3jIO5l2jbydQ0',
          v: '3.20',
          libraries: 'weather,geometry,visualization'
      });
    })
    .controller('messagesCtrl', messageCtrl);

    /**
    * Controller de Messages
    **/
    function messageCtrl($scope, $http, uiGmapGoogleMapApi, $timeout, User, $location, $mdDialog, $mdToast, $rootScope)
    {
      var lastServerData;
      $scope.errorMessage = "";
      $scope.messages = [];
      $scope.toggle = [{
        yelling: 'false',
        error: 'false',
        progress: 'false'
      }];
      $scope.currentUser = User.get();
      /**
      * Obtener Posicion de usuario por navegador cuando aplicación inicia
      * Se setea ubicacion en var global de angular $rootScope
      * Si no existe se solicita por navegador, si existe se utiliza la actual
      */
      $scope.load = function () {
       console.log("Empezo la app");
        if($rootScope.positionActual === undefined)
        {
          $rootScope.positionActual = {};
          if (navigator.geolocation)
          {
            navigator.geolocation.getCurrentPosition(function(position)
            {
              $rootScope.positionActual.longitude = position.coords.longitude;
              $rootScope.positionActual.latitude = position.coords.latitude;
              console.log("valor de pos actual: ", $rootScope.positionActual.latitude);
              console.log("valor de pos actual: ", $rootScope.positionActual.longitude);
              getMessages(position.coords);
            },
            function(positionError)
            {
              errorGeo(positionError);
            }, {timeout:5000});
          }else
          {
            $scope.$apply(function()
            {
              $scope.errorMessage = 'Tu navegador no soporta geolocalizacion, no puedes usar el servicio, te pedimos dislcupas :(';
              $scope.toggle.error = 'true';
              $scope.toggle.progress = 'true';
            });
            console.log("Navegador no soporta geolocalizacion.");
          }
        }else{
          getMessages($rootScope.positionActual);
        }
      }
    /**
    * Obtiene mensajes segun localizacion.
    */
    function getMessages(positionActual){
      if(positionActual === undefined)
        return false;
      else{
        /**
        * Si te obtiene ubicacion se traen los mensajes cercanos del servidor
        */
        $http.post('/api/posts/nearest',{
        // $http.post('http://54.207.86.25/api/posts/nearest',{
          longitude : positionActual.longitude,
          latitude : positionActual.latitude
        })
        .success(function(data, status, headers, config)
        {
          /**
          * Se desactiva progress y activa aplicación para enviar mensajes
          */
          console.log(data);
          lastServerData = data;
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
              location: $rootScope.positionActual,
              dateTime: currentDatetime,
              votes: 0,
              dis: 0,
              avatar: '/dist/img/logos/mainLogo1.png',
              qtyComments: 0
            });
          }
          angular.forEach(data, function(value, key)
          {
            value.obj.location[0] = value.obj.location[0].toFixed(7);
            value.obj.location[1] = value.obj.location[1].toFixed(7);
            $scope.messages.push({
              text: value.obj.content,
              location: value.obj.location,
              dateTime: value.obj.dateTime,
              votes: value.obj.votes,
              distance: value.dis.toFixed(2),
              qtyComments: value.obj.comments.length,
              author: value.obj.author,
              avatar: 'http://graph.facebook.com/'+value.obj.author.facebook.id+'/picture',
              id: value.obj._id
            });
          });
        })
        .error(function(data, status, headers, config)
        {
          console.log("error");
          $scope.errorMessage = "Error con la comunicación con el servidor";
          $scope.toggle.error = 'true';
          $scope.toggle.progress = 'true';
        });
      }

    }
      /**
      * Funcion encargada en enviar nuevos mensajes escritos por el usuario al servidor
      */
      $scope.showNewMessage = function(ev){
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          controller: newMessageController,
          controllerAs: 'ctrl',
          clickOutsideToClose: true,
          locals: {
            currentUser: $scope.currentUser,
            messages: $scope.messages,
            positionActual: $rootScope.positionActual
          },
          template:'<md-dialog flex="40" aria-label="New Message"> \
                      <form ng-submit="$event.preventDefault()" name="formNewMessage" id="formNewMessage">\
                        <md-toolbar>\
                          <div class="md-toolbar-tools">\
                            <h2>Nuevo Mensaje</h2>\
                          </div>\
                        </md-toolbar>\
                        <md-progress-linear ng-if="toggleProgress" md-mode="indeterminate"></md-progress-linear>\
                        <md-dialog-content style="max-width:800px;max-height:810px; ">\
                          <div class="md-dialog-content">\
                            <md-input-container flex>\
                              <label>Nuevo Mensaje</label>\
                              <input ng-readonly="toggleProgress" ng-model="newMessage" md-maxlength="200"></input>\
                            </md-input-container>\
                          </div>\
                        </md-dialog-content>\
                        <div class="md-actions" layout="row" ng-if="!toggleProgress">\
                          <span flex></span>\
                          <md-button type="submit" ng-click="sendMessage()" class="md-primary"> Enviar </md-button>\
                          <md-button ng-click="cancelDialogNewMessage()"> Volver </md-button>\
                        </div>\
                      </form>\
                    </md-dialog>',
          targetEvent: ev,
        });
      }
      /* Controller del Dialog New Message */
      function newMessageController($scope, $mdDialog, messages, positionActual, currentUser, $mdToast) {
        $scope.toggleProgress = false;
        $scope.messages = messages;
        $scope.cancelDialogNewMessage = function() {
          $mdDialog.cancel();
        };
        $scope.sendMessage2 = function() {
          if(!$scope.newMessage == "")
          {
            $scope.toggleProgress = true;
             $scope.messages.push(
             {
               text: $scope.newMessage
             });
             $scope.formNewMessage.$setPristine();
             $scope.newMessage = "";
          }
        };

        $scope.sendMessage = function()
        {
          $scope.toggleProgress = false;
          $scope.currentUser = currentUser;
          $scope.messages = messages;
          /* Se comprueba que el mensaje no este vacío*/
          if(!$scope.newMessage == "")
          {
            $scope.toggleProgress = true;
            var newPost = {
              content: $scope.newMessage,
              location: $rootScope.positionActual,
              user: { id:  $scope.currentUser._id }
            };
            console.log('Enviando a server', newPost);
            // $http.post('http://54.207.86.25/api/posts',newPost)
            $http.post('/api/posts',newPost)
            .success(function(data, status, headers, config)
            {
              // al confirmarse, pusheo el mensaje que envie
              console.log(data);
              // $scope.messages.push(
              // {
              //   text: $scope.newMessage,
              //   location: data.location,
              //   dateTime: data.dateTime,
              //   votes: data.votes,
              //   // distance: value.dis.toFixed(2),
              //   qtyComments: data.comments.length,
              //   author: data.author,
              //   avatar: 'http://graph.facebook.com/'+data.author.facebook.id+'/picture',
              //   id: data._id
              // });
              // lastServerData.push();
              $mdToast.show(
                 $mdToast.simple()
                   .content('Mensaje enviado exitosamente!')
                   .hideDelay(3000)
               );
              $mdDialog.hide();
            })
              /*ToDo Manejo de errores que se pueden producir */
            .error(function(data, status, headers, config)
            {
              console.log('No hemos podido publicar tu mensaje');
              $scope.toggleProgress = false;
              $mdToast.show(
                 $mdToast.simple()
                   .content('No hemos podido publicar tu mensaje, intentalo nuevamente.')
                   .hideDelay(5000));
            });
          }
        }
      };
      /**
       * Funcion que se ejecutara cada x segundos buscando nuevos datos
      */
      var timer;
      function getNewMessages()
      {
        timer = $timeout(function()
        {
          console.log( "Timeout executed", Date.now() );
        },5000);

        timer.then(function()
        {
          // $http.post('http://54.207.86.25/api/posts/nearest',{
          $http.post('/api/posts/nearest',{
            longitude : $rootScope.positionActual.longitude,
            latitude : $rootScope.positionActual.latitude
          })
          .success(function(data, status, headers, config)
          {
            var result = data.filter(function(item1) {
              for (var i in lastServerData) {
                if (item1.obj._id === lastServerData[i].obj._id) { return false; }
              };
              return true;
            });
            console.log('diff:', result);
            angular.forEach(result, function(value, key)
            {
              value.obj.location[0] = value.obj.location[0].toFixed(7);
              value.obj.location[1] = value.obj.location[1].toFixed(7);
              $scope.messages.push({
                text: value.obj.content,
                location: value.obj.location,
                dateTime: value.obj.dateTime,
                votes: value.obj.votes,
                distance: value.dis.toFixed(2),
                qtyComments: value.obj.comments.length,
                author: value.obj.author,
                avatar: 'http://graph.facebook.com/'+value.obj.author.facebook.id+'/picture',
                id: value.obj._id
              });
            });
            lastServerData = data;
          })
          .error(function(data, status, headers, config)
          {
            console.log("error");
          });
          getNewMessages();
        },
        function()
        {
          console.log( "Timer apagado!" );
        });
      }
      getNewMessages();
      /* Destruyo $timeout cuando se cambia de vista */
      $scope.$on("$destroy", function(e) {
        $timeout.cancel(timer);
      });
      /**
      * Watcher si la posicion del dispositivo cambia, actualiza la variable global positionActual
      */
      var id;
      id = navigator.geolocation.watchPosition(success, error);
      function success(position)
      {
        $rootScope.positionActual.longitude = position.coords.longitude;
        $rootScope.positionActual.latitude = position.coords.latitude;
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
          $scope.errorMessage = "Has denegado el uso de geolocalización, Yelling necesita saber tu ubicación.\
            Si deseas utilizar Yelling por favor recarga la página y presiona en 'Permitir' cuando pregunten por tu ubicación. Gracias!";
          console.log("err code:" + errCode.code);
        }
        else if (errCode.code == 2)
        {
          $scope.errorMessage = "No hemos podido obtener tu ubicación, por favor intenta recargando la página."
          console.log("err code:" + errCode.code);
        }
        else if (errCode.code == 3)
        {
          $scope.errorMessage = "No hemos podido obtener tu ubicación, por favor intenta recargando la página."
          console.log("err code:" + errCode.code);
        }
        $scope.$apply(function()
        {
          $scope.errorMessage;
          $scope.toggle.error = 'true';
          $scope.toggle.progress = 'true';
        });
      }
    }
