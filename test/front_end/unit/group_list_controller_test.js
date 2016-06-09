var angular = require('angular');

describe('GroupListController Test', () => {
  var $httpBackend;
  var $controller;
  var groupListCtrl;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    groupListCtrl = $controller('GroupListController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', () => {
    expect(typeof groupListCtrl).toBe('object');
    expect(typeof groupListCtrl.getGroupNames).toBe('function');
  });

  it('It should get all of the group names', () => {
    $httpBackend.expectGET('/api/group/all')
    .respond(200, [{ msg: 'test light' }]);
    window.localStorage.token = 'testResponse';
    groupListCtrl.getGroupNames();
    $httpBackend.flush();
    expect(groupListCtrl.totalGroupNames[0].msg).toBe('test light');
  });

  it('It should get rid of duplicates in an array', () => {
    var arrayResult;
    var testArray = ['test', 'moose', 'test'];
    var resultArray = ['moose', 'test'];
    groupListCtrl.arrayCompress(testArray);
    console.log('arrayResult', arrayResult);
    expect(arrayResult).toBe(resultArray);
  });

});
