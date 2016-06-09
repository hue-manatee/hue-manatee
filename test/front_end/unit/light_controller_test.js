var angular = require('angular');

describe('LightJs Controller Test', () => {
  var $httpBackend;
  var $controller;
  var lightController;
  window.localStorage.token = 'lightTestToken';

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    lightController = $controller('LightController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', () => {
    expect(typeof lightController).toBe('object');
    expect(typeof lightController.update).toBe('function');
  });

  it('should update a light', () => {
    $httpBackend.expectGET('/api/light/magic').respond(200);
    lightController.update();
    $httpBackend.flush();
    expect(lightController.status).toBe('success');
  });

  it('should reset a light', () => {
    var target = 1;
    $httpBackend.expectGET('/api/light/reset/' + target).respond(200);
    lightController.reset(target);
    $httpBackend.flush();
    expect(lightController.status).toBe('success');
  });
});
