module.exports = function(app) {
  app.controller('RootController', ['hueAuth', '$location', function(hueAuth, $location) {
    if (hueAuth.getToken()) $location.path('/dashboard');
  }]);
};
