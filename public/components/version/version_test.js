'use strict';

describe('yell.version module', function() {
  beforeEach(module('yell.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
