module.exports = function(app) {
  app.directive('controlPanel', function() {
    return {
      restrict: 'EAC',
      require: 'ngController',
      templateUrl: 'templates/directives/control_panel.html',
      scope: {
        target: '='
      }
    };
  });
};
