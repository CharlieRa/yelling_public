'use strict';

angular.module('yelling.perfil', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/perfil', {
    templateUrl: 'perfil/perfil.html',
    controller: 'perfilCtrl'
  });
}])

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
