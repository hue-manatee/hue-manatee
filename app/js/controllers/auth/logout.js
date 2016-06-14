module.exports = function(app) {
  app.controller('LogoutController', ['hueAuth', '$location', function(hueAuth, $location) {
    this.logout = function() {
      hueAuth.removeToken();
      $location.path('/');
    };
    this.reveal = function() {
      //once again, you can make this a single line
      if (hueAuth.getToken()) return true;
      return false;
    };
  }]);
};
