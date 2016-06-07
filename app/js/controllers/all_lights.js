module.exports = function(app) {
  app.controller('AllLightsController', ['$http', '$location', function($http, $location) {
    this.all = {};
    this.getAll = function() {
      $http({
        method: 'GET',
        url: 'api/light/all',
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        this.all = res.data
        console.log("have recieved the lights");
        console.log(res.data);
      }, (response) => {
        console.log(response);
      });
    };
  }]);
};
