module.exports = function(app) {
  app.directive('controlPanel', () => {
    return {
      restrict: 'EAC',
      require: '^ngController',
      templateUrl: 'templates/directives/control_panel.html',
      scope: {
        target: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.update = controller.update;
        scope.color = controller.color;
        scope.state = controller.state;
        scope.brightness = controller.brightness;
        scope.reset = controller.reset;
      }
    };
  });
};
