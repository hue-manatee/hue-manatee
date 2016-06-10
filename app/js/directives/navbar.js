module.exports = function(app) {
  app.directive('navBar', () => {
    return {
      restrict: 'EAC',
      templateUrl: 'templates/directives/navbar.html'
    };
  });
};
