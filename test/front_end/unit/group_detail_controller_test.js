var angular = require('angular');

describe('GroupDetailController Test', () => {
  var $httpBackend;
  var $controller;
  var groupDetailCtrl;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    groupDetailCtrl = $controller('GroupDetailController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', () => {
    expect(typeof groupDetailCtrl).toBe('object');
    expect(typeof groupDetailCtrl.getAll).toBe('function');
    expect(typeof groupDetailCtrl.update).toBe('function');
    expect(typeof groupDetailCtrl.reset).toBe('function');
  });

  it('It should get all of the light', () => {
    $httpBackend.expectGET('/api/group')
    .respond(200, [{ lightId: 'test' }]);
    groupDetailCtrl.getAll();
    $httpBackend.flush();
    expect(groupDetailCtrl.group[0].lightId).toBe('test');
  });

});
