module.exports = function(app) {
  app.controller('LogoutController', ['hueAuth', '$location', function(hueAuth, $location) {
    this.logout = function() {
      // this.reveal = hueAuth.getToken;
      hueAuth.removeToken();
      // TODO: change this path to the choose signup or login page
      $location.path('/');
    };
    this.reveal = function() {
      console.log(hueAuth.getToken(), 'reveal fired');
      if (hueAuth.getToken()) return true;
      return false;
    };
  }]);
};
