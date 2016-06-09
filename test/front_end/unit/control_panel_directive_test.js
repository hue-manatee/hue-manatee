const angular = require('angular');
const hueApp = angular.module('hueApp');
hueApp.controller('TestController', () => {
});
require('angular-mocks');
const controlPanelTemplate = require('../../../app/templates/directives/control_panel.html');
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
    .when('GET', 'templates/directives/control_panel.html').respond(200, controlPanelTemplate);

    var form = $compile('<section ng-controller="TestController as test">'
    + '<control-panel></control-panel></section>');
    var directive = form($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(directive.find('input').length).toBe(6);
    expect(directive.find('button').length).toBe(4);
  });
});
