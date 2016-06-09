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
        scope.settings = controller.settings;
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
