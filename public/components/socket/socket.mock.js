'use strict';

angular.module('yelling', [])
  .factory('socket', function() {
    return {
      socket: {
        connect: function() {},
        on: function() {},
        emit: function() {},
        receive: function() {}
      },

      syncUpdates: function() {},
      unsyncUpdates: function() {}
    };
  });
