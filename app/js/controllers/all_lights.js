module.exports = function(app) {
  app.controller('AllLightsController', ['$http', '$location', function($http) {
    // this.all = [];
    this.update = function(target, alert, colorLoop) {
      $http({
        method: 'GET',
        url: '/api/light/magic',
        params: {
          hex: this.color,
          lightId: target,
          on: this.state,
          bri: this.brightness,
          alert: alert,
          effect: colorLoop,
          group: 'all'
        },
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        console.log('success light change: ', res);
      }, (response) => {
        console.log('fail no light change :( ', response);
      });
    };
    this.reset = function() {
      $http({
        method: 'GET',
        url: '/api/light/all/reset',
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        console.log('successful reset: ', res);
      }, (response) => {
        console.log('reset failed: ', response);
      });
    };
    this.getAll = function() {
      $http({
        method: 'GET',
        url: 'api/light/all',
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        this.all = res.data;
        console.log('have recieved the lights');
        console.log(res.data);
      }, (response) => {
        console.log(response);
      });
    };
  }]);
};
