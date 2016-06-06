module.exports = function(app) {
  app.controller('DashboardController', ['hueAuth', '$location', function(hueAuth, $location) {
    if (!hueAuth.getToken()) $location.path('/signup');
  }]);
};
