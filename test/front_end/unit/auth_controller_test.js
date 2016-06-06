var angular = require('angular');

describe('Signup Controller test', function() {
  var $httpBackend;
  var $controller;
  var signupController;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    signupController = $controller('SignUpController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', function() {
    expect(typeof signupController).toBe('object');
    expect(typeof signupController.authenticate).toBe('function');
  });

  it('should create a user', function() {
    $httpBackend.expectPOST('/api/signup', {
      username: 'TestMcgee', password: 'SuperTest1'
    }).respond(200, { token: 'this is a tolkien' });
    signupController.authenticate({ username: 'TestMcgee', password: 'SuperTest1' } );
    $httpBackend.flush();
    expect(window.localStorage.token).toBe('this is a tolkien');
  });
});
