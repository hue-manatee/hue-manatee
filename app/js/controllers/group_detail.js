module.exports = function(app) {
  app.controller('GroupController', ['$http', function($http) {
    this.group = {};
    this.getAll = function() {
      $http({
        method: 'GET',
        url: 'api/light/groups',
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        this.group = res.data;
        console.log('have recieved the group lights');
        console.log(res.data);
      }, (response) => {
        console.log(response);
      });
    };
  }]);
};
