module.exports = function(app) {
  app.factory('hueAuth', ['$http', function($http) {
    return {
    getToken: function() {
      console.log('getToken fired', window.localStorage.token);
      return window.localStorage.token;
    },
    removeToken: function() {
      this.token = null;
      this.username = null;
      $http.defaults.headers.common.token = null;
      window.localStorage.removeItem('token');
    }
  };
  }]);
};
