'use strict';

angular.module('yelling.feedbacks', ['ui.router', 'ngMaterial', 'ngAnimate'])
.controller('feedbacksCtrl', function($scope, $http, $mdDialog) {
  $scope.toggle = {
    progress: 'false',
    feedbacks: 'false',
    error: 'false'
  };
  $scope.feedbacks;
  // $http.get('http://54.207.86.25/api/feedbacks')
  $http.get('/api/feedbacks')
  .success(function(feedbacks) {
    console.log(feedbacks);
    $scope.feedbacks = feedbacks;
    $scope.toggle.progress = 'true';
    $scope.toggle.feedbacks = 'true';
  })
    /*Manejo de errores que se pueden producir con la comunicacion con el servidor */
  .error(function(data, status, headers, config)
  {
    console.log('No hemos podido obtener los feedbacks.', data);
    $scope.toggle.progress = 'true';
    $scope.toggle.error = 'true';
  });

  $scope.showNewFeedback = function(ev) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        locals: {
          feedbacks: $scope.feedbacks,
        },
        controller: function($scope , $mdDialog, $http ,$mdToast, feedbacks)
        {
          $scope.feedbacks = feedbacks;
          $scope.submitMe = function()
          {
            var comment;
            comment = $scope.feedback.comment;
            console.log('Enviando feedback con valor:', comment);
            // $http.post('http://54.207.86.25/api/feedbacks', { content: comment })
            $http.post('/api/feedbacks',{ content: comment })

            .success(function(data){
              $scope.feedbacks.push(data);
              $mdToast.show(
                 $mdToast.simple()
                   .content('Feedback enviado, gracias!')
                   .hideDelay(5000));
              $mdDialog.hide();
            })

            .error(function(data){
              console.log("error al com con el servidor", data);
            });
        };
        $scope.cancelDialog = function()
        {
          $mdDialog.hide();
        }
        },
        clickOutsideToClose: true,
        template:'<md-dialog flex="40" aria-label="New Feedback"> \
                    <form ng-submit="$event.preventDefault()" name="formNewMessage" id="formNewMessage">\
                      <md-toolbar>\
                        <div class="md-toolbar-tools">\
                          <h2>Nuevo Feedback</h2>\
                        </div>\
                      </md-toolbar>\
                      <md-progress-linear ng-if="toggleProgress" md-mode="indeterminate"></md-progress-linear>\
                      <md-dialog-content style="max-width:800px;max-height:810px; ">\
                        <div class="md-dialog-content">\
                        <md-input-container flex>\
                            <label>Nuevo Feedback</label>\
                            <input ng-readonly="toggleProgress" ng-model="feedback.comment" md-maxlength="200"></input>\
                          </md-input-container>\
                        </div>\
                      </md-dialog-content>\
                      <div class="md-actions" layout="row" ng-if="!toggleProgress">\
                        <span flex></span>\
                        <md-button type="submit" ng-click="submitMe()" class="md-primary"> Enviar </md-button>\
                        <md-button ng-click="cancelDialog()"> Volver </md-button>\
                      </div>\
                    </form>\
                  </md-dialog>',
        targetEvent: ev,
      });
    }
});
