var angular = require('angular');

describe('AllLightsController Test', () => {
  var $httpBackend;
  var $controller;
  var allLightsCtrl;

  beforeEach(angular.mock.module('hueApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    allLightsCtrl = $controller('AllLightsController');
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be a controller', () => {
    expect(typeof allLightsCtrl).toBe('object');
    expect(typeof allLightsCtrl.getAll).toBe('function');
    expect(typeof allLightsCtrl.update).toBe('function');
    expect(typeof allLightsCtrl.reset).toBe('function');
  });

  it('It should get all of the light', () => {
    $httpBackend.expectGET('api/light/all')
    .respond(200, [{ lightId: 'test light' }]);
    window.localStorage.token = 'testResponse';
    allLightsCtrl.getAll();
    $httpBackend.flush();
    expect(allLightsCtrl.all[0].lightId).toBe('test light');
  });

 //  it('It should a res of 200 when updated', () => {
 //    $httpBackend.expectGET('/api/light/magic?group=all')
 //    .respond(200);
 //    var succeeded;
 //    window.localStorage.token = 'testResponse';
 //    allLightsCtrl.update().then(function() {
 //     succeeded = true;
 //    });
 //    $httpBackend.flush();
 //    expect(succeeded).toBe(true);
 // });

});
