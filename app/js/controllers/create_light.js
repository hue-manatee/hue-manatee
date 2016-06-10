module.exports = function(app) {
  app.controller('CreateLightController', ['hueAuth', '$http', '$location',
  function(hueAuth, $http, $location) {
    if (!hueAuth.getToken()) $location.path('/');
    this.groups = [];
    this.settings = {};
    this.save = function() {
      if (this.groups.length > 0 ) {
        this.groupString = this.groups.join();
      }
      $http({
        method: 'POST',
        url: '/api/light/create',
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
      .then(() => {
        this.status = 'success';
        $location.path('/light/' + this.settings.bridgeLightId);
      }, (response) => {
        console.log(response);
        this.status = 'fail';
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
