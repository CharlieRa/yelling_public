'use strict';

angular.module('yelling.perfil')
.controller('perfilCtrl', function($scope) {
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
    // console.log("lala");
  };
});
