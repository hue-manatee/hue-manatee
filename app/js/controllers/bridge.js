const copy = require('angular').copy;

module.exports = function(app) {
 app.controller('BridgeController', ['$http', '$location', function($http, $location) {
   this.bridge = {};
   this.bridgeExists = false;
   this.editing = false;
   this.cancel = function() {
     this.editing = false;
     for (var key in this.backup) {
       this.bridge[key] = this.backup[key];
     }
   };
   this.edit = function() {
     this.editing = true;
     this.backup = copy(this.bridge);
   };
  //  this.update = function() {
  //    $http.post('/api/bridge/create', bridge)
   //
  //  }
  //  this.save = function() {
  //   $http({
  //     method: 'PUT',
  //     url: 'api/bridge???',
  //     headers: {
  //       token:
  //     }
  //   })
  //  };
   this.check = function() {
     $http({
       method: 'GET',
       url: 'api/bridge/exists',
       headers: {
         token: window.localStorage.token
       }
     })
     .then((res) => {
       if (res.data.bridgeExists) {
         this.bridgeExists = true;
         this.bridge.bridgeKey = res.data.bridge.bridgeKey;
         this.bridge.URL = res.data.bridge.url;
         this.bridge.name = res.data.bridge.name;
       }
     }, (response) => {
       console.log(response);
     });
   };

 }]);
};
