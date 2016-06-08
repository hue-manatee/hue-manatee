module.exports = function(app) {
  app.controller('CreateLightController', ['$http', '$location', function($http, $location) {
    this.groups = [];
    this.save = function() {
      var self = this;
      $http({
        method: 'POST',
        url: '/api/light/create',
        dataType: 'json',
        data: {
          bridgeLightId: self.bridgeLightId,
          name: self.name,
          color: self.color,
          state: self.state,
          bri: self.brightness,
          alert: self.alert,
          effect: self.effect,
          groups: 'moose,i am girl'
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
      console.log(this.groups);
    };
  }]);
};
