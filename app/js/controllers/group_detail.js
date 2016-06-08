module.exports = function(app) {
  app.controller('GroupDetailController', ['hueAuth', '$location', '$http', '$routeParams',
  function(hueAuth, $location, $http, $routeParams) {
    if (!hueAuth.getToken()) $location.path('/');
    this.groupName = $routeParams.groupName;
    this.group = [];
    this.reset = function() {
      $http({
        method: 'GET',
        url: '/api/group/reset',
        headers: {
          token: window.localStorage.token
        },
        params: {
          groupName: $routeParams.groupName
        }
      })
      .then((res) => {
        console.log('successful reset: ', res);
      }, (response) => {
        console.log('reset failed: ', response);
      });
    };
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
          group: $routeParams.groupName
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
    this.getAll = function() {
      $http({
        method: 'GET',
        url: '/api/group',
        params: {
          groupName: $routeParams.groupName
        },
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        this.group = res.data;
      }, (response) => {
        console.log(response);
      });
    };
  }]);
};
