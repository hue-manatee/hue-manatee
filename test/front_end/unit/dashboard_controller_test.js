var angular = require('angular');

describe('DashboardController Test', () => {
  var $httpBackend;
  var $controller;
  var dashboardController;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    dashboardController = $controller('DashboardController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', () => {
    expect(typeof dashboardController).toBe('object');
  });
});
