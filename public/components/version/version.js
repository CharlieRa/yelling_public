'use strict';

angular.module('yell.version', [
  'yell.version.interpolate-filter',
  'yell.version.version-directive'
])

.value('version', '0.1');
