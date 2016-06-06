module.exports = function(app) {
  app.controller('LoginController', ['$http', '$location', function($http, $location) {
    this.buttonText = 'Login';
    this.invalid = false;
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
      }, function(reason) {
        console.log(reason);
      });
    };
  }]);
};
