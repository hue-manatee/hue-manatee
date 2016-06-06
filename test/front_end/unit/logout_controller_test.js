var angular = require('angular');

describe('LogoutController Test', () => {
  var $httpBackend;
  var $controller;
  var logoutController;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    logoutController = $controller('LogoutController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', () => {
    expect(typeof logoutController).toBe('object');
  });
  // TODO: Test logging out when the functionality is in the controller.
});
