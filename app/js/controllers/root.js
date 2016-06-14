module.exports = function(app) {
  //you seem to be doing this action for a few controllers it might be woth make it
  //a named function and require(ing) it into the controllers that you need it for
  app.controller('RootController', ['hueAuth', '$location', function(hueAuth, $location) {
    if (hueAuth.getToken()) $location.path('/dashboard');
  }]);
};
