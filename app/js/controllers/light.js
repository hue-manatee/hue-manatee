module.exports = function(app) {

  app.controller('LightController', ['hueAuth', '$location', '$http', '$routeParams',
  function(hueAuth, $location, $http, $routeParams) {
    if (!hueAuth.getToken()) $location.path('/');
    this.groups = [];
    this.settings = {};
    var self = this;
    this.id = $routeParams.id;
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
          effect: colorLoop
        },
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        console.log('success light change: ', res);
        this.status = 'success';
      }, (response) => {
        console.log('fail no light change :( ', response);
        this.status = 'fail';
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
        this.status = 'success';
      }, (response) => {
        console.log('reset failed: ', response);
        this.status = 'fail';
      });
    };
    this.getGroups = function(target) {
      $http({
        method: 'GET',
        url: '/api/light/groups',
        headers: {
          token: window.localStorage.token
        },
        params: {
          lightId: target
        }
      })
      .then((res) => {
        this.groups = res.data.groups;
      }, (response) => {
        console.log('there are no groups here:', response);
      });
    };
    this.getLight = function() {
      $http({
        method: 'GET',
        url: '/api/light/detail/' + this.id,
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        var light = res.data.light;
        this.settings.name = light.name;
        this.settings.bridgeLightId = light.bridgeLightId;
        this.settings.brightness = light.bri;
        this.settings.alert = light.alert;
        this.settings.color = light.color;
        if (light.state) this.settings.state = 'true';
        if (!light.state) this.settings.state = 'false';
        this.settings.effect = light.effect;
      }, (response) => {
        console.log('there are no light here:', response);
        $location.path('/light/create');
      });
    };
    this.save = function(target) {
      if (this.groups.length > 0 ) {
        this.groupString = this.groups.join();
      }
      $http({
        method: 'PUT',
        url: '/api/light/update/' + target,
        dataType: 'json',
        data: {
          bridgeLightId: this.settings.bridgeLightId,
          name: this.settings.name,
          color: this.settings.color,
          state: this.settings.state,
          bri: this.settings.brightness,
          alert: this.settings.alert,
          effect: this.settings.effect,
          groups: this.groupString
        },
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        console.log(res);
        self.editing = false;
      }, (response) => {
        console.log(response);
      });
    };
    this.addGroup = function() {
      this.groups.push(this.newGroup);
      this.newGroup = null;
    };
    this.removeGroup = function(group) {
      this.groups.splice(this.groups.indexOf(group), 1);
    };
  }]);
};
