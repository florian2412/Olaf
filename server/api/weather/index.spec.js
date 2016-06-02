'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var weatherCtrlStub = {
  index: 'weatherCtrl.index',
  show: 'weatherCtrl.show',
  create: 'weatherCtrl.create',
  update: 'weatherCtrl.update',
  destroy: 'weatherCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var weatherIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './weather.controller': weatherCtrlStub
});

describe('Weather API Router:', function() {

  it('should return an express router instance', function() {
    expect(weatherIndex).to.equal(routerStub);
  });

  describe('GET /y', function() {

    it('should route to weather.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'weatherCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /y/:id', function() {

    it('should route to weather.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'weatherCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /y', function() {

    it('should route to weather.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'weatherCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /y/:id', function() {

    it('should route to weather.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'weatherCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /y/:id', function() {

    it('should route to weather.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'weatherCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /y/:id', function() {

    it('should route to weather.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'weatherCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
