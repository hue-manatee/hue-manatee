module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location', function($http, $location) {
    this.signup = true;
    this.invalid = true;
    this.buttonText = 'Create Account';
    this.confirm = function(password) {
      if (this.user.password === password && password) {
        return this.invalid = false;
      }
      return this.invalid = true;
    };
    this.authenticate = function(user) {
      $http.post('/api/signup', user)
        .then((res) => {
          $http.defaults.headers.common.token = res.data.token;
          window.localStorage.token = res.data.token;
          $location.path('/dashboard');
        }, (reason) => {
          console.log(reason.data.msg);
        });
    };
  }]);
};
