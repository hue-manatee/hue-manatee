module.exports = function(app) {
  app.controller('CreateLightController', ['$http', '$location', function($http, $location) {
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
          brightness: self.brightness,
          alert: self.alert,
          effects: self.effects,
          groups: self.groups
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
  }]);
};
