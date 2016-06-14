module.exports = function(app) {
  app.controller('LoginController', ['$http', '$location', 'hueHandleError',
  function($http, $location, hueHandleError) {
    this.buttonText = 'Login';
    this.invalid = false; //this will already evaluate to false, no need to set it
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: 'api/login',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        }
      })
      .then((res) => {
        $http.defaults.headers.common.token = res.data.token;
        window.localStorage.token = res.data.token;
        $location.path('/dashboard');
      },
        hueHandleError(this.errors, 'Cannot Login')
      );
    };
  }]);
};
