var angular = require('angular');

describe('GroupDetailController Test', () => {
  var $httpBackend;
  var $controller;
  var groupDetailCtrl;
  var $routeParams;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$routeParams_) => {
    $routeParams = _$routeParams_;
  }));

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
    groupDetailCtrl.status = ' ';
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

   it('It should return a status of success when updated', () => {
     $httpBackend.expectGET('/api/light/magic')
     .respond(200);
     $routeParams.groupDetailCtrl = 'test';
     groupDetailCtrl.update();
     $httpBackend.flush();
     expect(groupDetailCtrl.status).toBe('success');
   });

   it('It should return a status of success when reset', () => {
     $httpBackend.expectGET('/api/group/reset')
     .respond(200);
     $routeParams.groupDetailCtrl = 'test';
     groupDetailCtrl.reset();
     $httpBackend.flush();
     expect(groupDetailCtrl.status).toBe('success');
   });
  });
