module.exports = function(app) {
  app.directive('lightForm', () => {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: 'templates/directives/light_form.html',
      scope: {
        target: '='
      },
      link: function(scope, elements, attrs, controller) {
        scope.bridgeLightId = controller.bridgeLightId;
        scope.name = controller.name;
        scope.color = controller.color;
        scope.state = controller.state;
        scope.brightness = controller.brightness;
        scope.alert = controller.alert;
        scope.colorloop = controller.colorloop;
        scope.groups = controller.groups;
        scope.save = controller.save;
        scope.addGroup = controller.addGroup;
        scope.newGroup = controller.newGroup;
        scope.removeGroup = controller.removeGroup;
        scope.editing = controller.editing;
      }
    };
  });
};
