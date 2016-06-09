module.exports = function(app) {
  app.controller('LogoutController', ['hueAuth', '$location', function(hueAuth, $location) {
    this.logout = function() {
      if (hueAuth.token) {
         this.loggedout = true;
      }
      hueAuth.removeToken();
      // TODO: change this path to the choose signup or login page
      $location.path('/');
    };
  }]);
};
