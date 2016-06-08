module.exports = function(app) {
  app.controller('CreateLightController', ['hueAuth', '$http', '$location',
  function(hueAuth, $http, $location) {
    if (!hueAuth.getToken()) $location.path('/');
    this.groups = [];
    this.save = function() {
      if (this.groups.length > 0 ) {
        this.groupString = this.groups.join();
      }
      $http({
        method: 'POST',
        url: '/api/light/create',
        dataType: 'json',
        data: {
          bridgeLightId: this.bridgeLightId,
          name: this.name,
          color: this.color,
          state: this.state,
          bri: this.brightness,
          alert: this.alert,
          effect: this.effect,
          groups: this.groupString
        },
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        console.log(res);
        $location.path('/light/' + this.bridgeLightId);
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
