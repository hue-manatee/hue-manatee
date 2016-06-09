const angular = require('angular');
const hueApp = angular.module('hueApp');
hueApp.controller('TestController', () => {
});
require('angular-mocks');
const lightFormTemplate = require('../../../app/templates/directives/light_form.html');
describe('test control panel directive', () => {
  var $compile;
  var $rootScope;
  var $scope;
  var $httpBackend;

  beforeEach(angular.mock.module('hueApp'));
  beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _$httpBackend_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
  }));

  it('should render html for the control panel', () => {
    $httpBackend
    .when('GET', 'templates/directives/light_form.html').respond(200, lightFormTemplate);

    var form = $compile('<section ng-controller="TestController as test">'
    + '<light-form></light-form></section>');
    var directive = form($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.find('input').length).toBe(9);
    expect(directive.find('button').length).toBe(2);
  });
});
