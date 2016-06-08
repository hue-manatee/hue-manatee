module.exports = function(app) {
  app.directive('lightForm', () => {
    return {
      restrict: 'EAC',
      require: '^ngController',
      templateUrl: 'templates/directives/light_form.html',
      scope: {},
      link: function(scope, elements, attrs, controller) {
        scope.bridgeLightId = controller.bridgeLightId;
        scope.name = controller.name;
        scope.color = controller.color;
        scope.state = controller.state;
        scope.brightness = controller.brightness;
        scope.alert = controller.alert;
        scope.effect = controller.effect;
        scope.groups = controller.groups;
        scope.save = controller.save;
        scope.addGroup = controller.addGroup;
        scope.newGroup = controller.newGroup;
        scope.removeGroup = controller.removeGroup;
      }
    };
  });
};