var angular = require('angular');

describe('Bridge Controller', () => {
  var $httpBackend;
  var $controller;
  var bridgeController;
  var bridge;
  window.localStorage.token = 'token';

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    bridgeController = $controller('BridgeController');
    bridge = {
      name: 'testname',
      url: 'testurl',
      bridgeKey: 'bridgeKeyTest'
    };
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a contoller', () => {
    expect(typeof bridgeController).toBe('object');
    expect(typeof bridgeController.update).toBe('function');
  });

  it('should check to see if a brige exists', () => {
    $httpBackend.expectGET('api/bridge/exists').respond(200, {
      bridgeExists: true,
      bridge: bridge
    });
    bridgeController.bridge = { name: '', url: '', bridgeKey: '' };
    bridgeController.bridge.name = 'test bridge';
    bridgeController.bridge.url = 'anothertesturl';
    bridgeController.bridge.bridgeKey = 'testkey';
    bridgeController.check();
    $httpBackend.flush();
    expect(bridgeController.bridgeExists).toBe(true);
    expect(bridgeController.bridge.name).toBe('testname');
    expect(bridgeController.bridge.url).toBe('testurl');
    expect(bridgeController.bridge.bridgeKey).toBe('bridgeKeyTest');
  });

  it('should update a bridge', () => {
    $httpBackend.expectPUT('api/bridge/update/originalkey').respond(200, {
      name: 'test bridge'
    });

    bridgeController.bridge = {
      name: 'original name', url: 'original url', bridgeKey: 'originalkey'
    };
    bridgeController.editing = true;
    bridgeController.update();
    $httpBackend.flush();
    expect(bridgeController.bridgeExists).toBe(true);
    expect(bridgeController.editing).toBe(false);
  });
  it('should save a bridge', () => {
    $httpBackend.expectPOST('/api/bridge/create').respond(200, {
      name: 'created bridge',
      url: 'test url',
      bridgeKey: 'testbridgekey'
    });

    bridgeController.save();
    $httpBackend.flush();

    expect(bridgeController.editing).toBe(false);
    expect(bridgeController.bridgeExists).toBe(true);
    expect(bridgeController.bridge.bridgeKey).toBe('testbridgekey');
    expect(bridgeController.bridge.name).toBe('created bridge');
    expect(bridgeController.bridge.url).toBe('test url');
  });

  it('should edit a bridge', () => {
    bridgeController.editing = false;
    bridgeController.bridge = { name: 'test bridge', url: 'edit url', bridgeKey: 'edit key' };
    bridgeController.edit();
    expect(bridgeController.editing).toBe(true);
    expect(bridgeController.backup.name).toBe(bridgeController.bridge.name);
  });
});
