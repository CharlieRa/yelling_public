'use strict';

angular.module('yelling.comments', ['ui.router', 'ngMaterial', 'ngMessages', 'apiMock', 'uiGmapgoogle-maps', 'ngAnimate'])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyASPPeOiF-w1w--6G4ZjS3jIO5l2jbydQ0',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
  })
  .controller('commentsCtrl',
  function ($scope, uiGmapGoogleMapApi, User, $location, $state, $stateParams, $http, $mdDialog)
  {
    $scope.mapOptions = { center: { latitude: -33.447487 , longitude: -70.673676  }, zoom: 8 };
    $scope.toggle = [{
      comments: 'false',
      error: 'false',
      progress: 'false'
    }];
    $scope.currentUser = User.get();
    $scope.comments = [];
    $scope.params = $stateParams;

    $http.get('http://54.207.86.25/api/posts/'+$stateParams.id)
    .success(function(post, status, headers, config)
    {
      console.log('[POST/Show] Result:', post);
      $scope.message = {
        content: post.content,
        datetime: post.dateTime,
        votes: post.votes,
        qtyComments: post.comments.length,
        location: post.location
      }

      /* Se setea el mapa donde se escribio el mensaje */
      $scope.mapOptions.center = {
          latitude: post.location[1],
          longitude: post.location[0]
      };
      $scope.mapOptions.zoom = 14;
      $scope.marker = {
        id: 0,
        coords: {
          latitude: post.location[1],
          longitude: post.location[0]
        }
      };

      /* Se verifica si tiene comentarios, si no tiene se coloca mensaje por defecto*/
      if(post.comments.length == 0){

        $scope.comments.push({
          content: 'Aún no existen comentarios, tu puedes ser el primero!. Escribe un comentario presionando el boton con el ícono + del fondo.',
          datetime: new Date(),
          author: 'Yelling'
        });
      }else{
        angular.forEach(post.comments, function(value, key)
        {
          $scope.comments.push({
              content: value.content,
              datetime: value.dateTime,
              author: value.author
            });
          });
      }

      /* Se esconde progress y se muestran comentarios */
      $scope.toggle.comments = 'true';
      $scope.toggle.progress = 'true';
    })
    .error(function(data, status, headers, config)
    {
      /* Se econde progress y se muestra mensaje de error*/
      $scope.toggle.error = 'true';
      $scope.toggle.progress = 'true';
      console.log("error");
    });

      /**
      * Dialog para escribir nuevos comentarios
      */
      $scope.showNewComment = function(ev){
        var parentEl = angular.element(document.body);
        $mdDialog.show({
          controller: newCommentController,
          controllerAs: 'ctrl',
          clickOutsideToClose: true,
          locals: {
            currentUser: $scope.currentUser,
            comments: $scope.comments
          },
          template:'<md-dialog flex="40" aria-label="New Comment"> \
                      <form ng-submit="$event.preventDefault()" name="formNewComment" id="formNewComment">\
                        <md-toolbar>\
                          <div class="md-toolbar-tools">\
                            <h2>Nuevo Comentario</h2>\
                          </div>\
                        </md-toolbar>\
                        <md-progress-linear ng-if="toggleProgress" md-mode="indeterminate"></md-progress-linear>\
                        <md-dialog-content style="max-width:800px;max-height:810px; ">\
                          <div class="md-dialog-content">\
                            <md-input-container flex>\
                              <label>Nuevo Comentario</label>\
                              <input ng-readonly="toggleProgress" ng-model="newComment" md-maxlength="200"></input>\
                            </md-input-container>\
                          </div>\
                        </md-dialog-content>\
                        <div class="md-actions" layout="row" ng-if="!toggleProgress">\
                          <span flex></span>\
                          <md-button type="submit" ng-click="sendComment()" class="md-primary"> Enviar </md-button>\
                          <md-button ng-click="cancelDialogNewComment()"> Volver </md-button>\
                        </div>\
                      </form>\
                    </md-dialog>',
          targetEvent: ev,
        });
      }
      /* Controller del Dialog New Comment */
      function newCommentController($scope, $mdDialog, comments, currentUser, $mdToast) {
        $scope.toggleProgress = false;
        $scope.comments = comments;
        $scope.currentUser = currentUser;
        $scope.cancelDialogNewComment = function() {
          $mdDialog.cancel();
        };
        $scope.sendComment = function()
        {
          $scope.toggleProgress = false;
          /* Se comprueba que el mensaje no este vacío*/
          if(!$scope.newComment == "")
          {
            $scope.toggleProgress = true;
            var newComment = {
              content: $scope.newComment,
              post: { id: $stateParams.id },
              user: { id: $scope.currentUser._id }
            };
            console.log('Enviando a server comentario: ', newComment);
            $http.post('http://54.207.86.25/api/comments', newComment)
            // $http.post('/api/comments', newComment)
            .success(function(comment) {
              var newComment = {
                content: comment.content,
                datetime: comment.dateTime,
                author: comment.author
              }
              $scope.comments.push(newComment);
                console.log(comment);
                $mdToast.show(
                   $mdToast.simple()
                     .content('Comentario enviado exitosamente!')
                     .hideDelay(5000)
                 );
                $mdDialog.hide();
              })

              /*ToDo Manejo de errores que se pueden producir con la com con el servidor*/
            .error(function(data, status, headers, config)
            {
              console.log('No hemos podido publicar tu mensaje', data);
              $scope.toggleProgress = false;
              $mdToast.show(
                 $mdToast.simple()
                   .content('No hemos podido publicar tu mensaje, intentalo nuevamente.')
                   .hideDelay(5000));
            });
          }else{
            $mdToast.show(
               $mdToast.simple()
                 .content('No puedes enviar mensajes vacíos!')
                 .hideDelay(3000));
          }
        }
      };
  });