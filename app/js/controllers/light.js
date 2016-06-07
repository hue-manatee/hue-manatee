module.exports = function(app) {
  app.controller('LightController', ['$routeParams', '$http', function($routeParams, $http) {
    this.id = $routeParams.id;
    this.update = function(target, alert) {
      $http({
        method: 'GET',
        url: '/api/light/magic',
        params: {
          hex: this.color,
          lightId: target,
          on: this.state,
          bri: this.brightness,
          alert: alert
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
    this.reset = function(target) {
      $http({
        method: 'GET',
        url: '/api/light/reset/' + target,
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
  }]);
};
