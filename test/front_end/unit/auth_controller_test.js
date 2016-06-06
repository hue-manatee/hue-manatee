var angular = require('angular');

describe('Signup Controller test', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(anguar.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var signupController = $controller('SignUpController');
    expect(typeof signupController).toBe('object');
    expect(typeof signupController.authenticate).toBe('function');
  });
});
