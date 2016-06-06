var angular = require('angular');

describe('Signup Controller test', () => {
  var $httpBackend;
  var $controller;
  var signupController;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    signupController = $controller('SignUpController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', () => {
    expect(typeof signupController).toBe('object');
    expect(typeof signupController.authenticate).toBe('function');
  });

  it('should create a user', () => {
    $httpBackend.expectPOST('/api/signup', {
      username: 'TestMcgee', password: 'SuperTest1'
    }).respond(200, { token: 'this is a tolkien' });
    signupController.authenticate({ username: 'TestMcgee', password: 'SuperTest1' } );
    $httpBackend.flush();
    expect(window.localStorage.token).toBe('this is a tolkien');
  });

  it('should confirm passwords are the same', () => {
    signupController.user = { password: '' };
    signupController.user.password = 'MostSecurePassword';
    signupController.confirm('MostSecurePassword');
    expect(signupController.invalid).toBe(false);
  });
});
