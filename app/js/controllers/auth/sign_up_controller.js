module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location', 'hueHandleError',
  function($http, $location, hueHandleError) {
    this.signup = true;
    this.invalid = true; //this would be better done by grabbing a reference to the form and checking for $valid
    this.errors = [];
    this.buttonText = 'Create Account';
    this.confirm = function(password) {
      //you can make this function a single line of code, you already have the logic in here
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
        },
          hueHandleError(this.errors, 'Cannot Create Account')
        );
    };
  }]);
};
