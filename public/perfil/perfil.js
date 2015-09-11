'use strict';

angular.module('yelling.perfil', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/perfil', {
    templateUrl: 'perfil/perfil.html',
    controller: 'perfilCtrl'
  });
}])

.controller('perfilCtrl', [function() {

}]);
