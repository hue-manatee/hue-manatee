var angular = require('angular');

describe('CreateLightController Test', () => {
  var $httpBackend;
  var $controller;
  var createLightCtrl;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    createLightCtrl = $controller('CreateLightController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    createLightCtrl.status = ' ';
  });

  it('should be a controller', () => {
    expect(typeof createLightCtrl).toBe('object');
    expect(typeof createLightCtrl.save).toBe('function');
    expect(typeof createLightCtrl.addGroup).toBe('function');
    expect(typeof createLightCtrl.removeGroup).toBe('function');
  });

  it('It should return a status of success when saved', () => {
    $httpBackend.expectPOST('/api/light/create')
    .respond(200);
    createLightCtrl.groups = ['moose', 'test'];
    createLightCtrl.save();
    $httpBackend.flush();
    expect(createLightCtrl.status).toBe('success');
  });

  it('It should add content to the group', () => {
    createLightCtrl.groups = [];
    createLightCtrl.addGroup();
    expect(createLightCtrl.groups.length).toBe(1);
  });

  it('It should remove content to the group', () => {
    createLightCtrl.groups = ['moose', 'test'];
    createLightCtrl.removeGroup();
    expect(createLightCtrl.groups.length).toBe(1);
  });

});
