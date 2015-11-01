'use strict';

angular
.module('yelling',['ngRoute','yelling.home','yelling.messages','yelling.perfil','apiMock'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
  {
    $routeProvider
    .otherwise({redirectTo: '/home'});
    // $locationProvider.html5Mode({
    //   enabled: false,
    //   requireBase: false
    // });
  }])
.controller('mainCtrl', function($scope,  $mdSidenav, $mdDialog, $mdUtil, $timeout, $log)
{
  var originatorEv;
   this.openMenu = function($mdOpenMenu, ev)
   {
     originatorEv = ev;
     $mdOpenMenu(ev);
   };

  this.togglePerfil = function()
  {
    $mdSidenav('left')
      .toggle()
      .then(function ()
      {
        $log.debug("toggle " + 'left' + " is done");
      });
  };

  this.closeSidenav = function ()
  {
    $mdSidenav('left')
      .toggle()
      .then(function ()
      {
        $log.debug("close LEFT is done");
      });
  };
})
/*factory('mySocket', function (socketFactory) {
  var mySocket = socketFactory();
  mySocket.forward('error');
  return mySocket;
});*/
