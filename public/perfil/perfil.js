'use strict';

angular.module('yelling.perfil', ['ui.router'])
.config(function($stateProvider)
{
  $stateProvider
    .state('perfil', {
      url: '/perfil',
      templateUrl: 'perfil/perfil.html',
      controller: 'perfilCtrl',
      authenticate: true
    })
})
.controller('perfilCtrl', ['$scope',function($scope) {
  $scope.toggle = {
    username: 'true',
    email: 'true',
    range: 'true',
    gender: 'true',
    age: 'true',
  }
  $scope.user = {
    username: 'Carlos Ramart',
    email: 'carlos.ramart@gmail.com',
    range: 400,
    gender: 'Masculino',
    age: 24
  };
  $scope.changeAvatar = function(){
    console.log("lala");
  };
}]);
