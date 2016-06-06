var angular = require('angular');

describe('LoginController Test', () => {
  var $httpBackend;
  var $controller;
  var loginController;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    loginController = $controller('LoginController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', () => {
    expect(typeof loginController).toBe('object');
    expect(typeof loginController.authenticate).toBe('function');
  });

  it('It should login a user', () => {
    $httpBackend.expectGET('api/login')
    .respond(200, { token: 'testResponse' });
    loginController.user = { username: '', password: '' };
    loginController.user.password = 'TestPassword123';
    loginController.user.username = 'TestUser';
    loginController.authenticate(loginController.user);
    $httpBackend.flush();
    expect(window.localStorage.token).toBe('testResponse');
  });
});
