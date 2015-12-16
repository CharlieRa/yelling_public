'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var notificationCtrlStub = {
  index: 'notificationCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var notificationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './notification.controller': notificationCtrlStub
});

describe('Notification API Router:', function() {

  it('should return an express router instance', function() {
    notificationIndex.should.equal(routerStub);
  });

  describe('GET /api/notifications', function() {

    it('should route to notification.controller.index', function() {
      routerStub.get
        .withArgs('/', 'notificationCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
