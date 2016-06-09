var angular = require('angular');

describe('GroupListController Test', () => {
  var $httpBackend;
  var $controller;
  var groupListCtrl;
  var $routeParams;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$routeParams_) => {
    $routeParams = _$routeParams_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    groupListCtrl = $controller('GroupListController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    groupListCtrl.status = ' ';
  });

  it('should be a controller', () => {
    expect(typeof groupListCtrl).toBe('object');
    expect(typeof groupListCtrl.getGroupNames).toBe('function');
    expect(typeof groupListCtrl.update).toBe('function');
    expect(typeof groupListCtrl.reset).toBe('function');
  });

  it('It should get all of the group names without duplicates', () => {
    $httpBackend.expectGET('/api/group/all')
    .respond(200, ['test', 'test', 'moose']);
    groupListCtrl.getGroupNames();
    $httpBackend.flush();
    expect(groupListCtrl.groupNames[0]).toBe('moose');
    expect(groupListCtrl.groupNames[1]).toBe('test');
    expect(groupListCtrl.groupNames[2]).toBe(undefined);
  });

  it('It should return a status of success when updated', () => {
    $httpBackend.expectGET('/api/light/magic')
    .respond(200);
    $routeParams.groupListCtrl = 'test';
    groupListCtrl.update();
    $httpBackend.flush();
    expect(groupListCtrl.status).toBe('success');
  });

  it('It should return a status of success when reset', () => {
    $httpBackend.expectGET('/api/group/reset')
    .respond(200);
    $routeParams.groupListCtrl = 'test';
    groupListCtrl.reset();
    $httpBackend.flush();
    expect(groupListCtrl.status).toBe('success');
  });

});
