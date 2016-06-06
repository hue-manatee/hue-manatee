module.exports = function(app) {
  app.controller('LightController', ['$routeParams', '$http', function($routeParams, $http) {
    this.id = $routeParams.id;
    this.update = function(target) {
      $http({
        method: 'GET',
        url: '/api/light/magic',
        params: {
          hex: this.color,
          lightId: target,
          on: this.state,
          bri: this.brightness
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
  }]);
};
