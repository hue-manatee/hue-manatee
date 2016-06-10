module.exports = function(app) {
  app.controller('LogoutController', ['hueAuth', '$location', function(hueAuth, $location) {
    this.logout = function() {
      hueAuth.removeToken();
      $location.path('/');
    };
    this.reveal = function() {
      if (hueAuth.getToken()) return true;
      return false;
    };
  }]);
};
