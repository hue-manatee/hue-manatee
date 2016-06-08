const copy = require('angular').copy;

module.exports = function(app) {
 app.controller('BridgeController', ['hueAuth', '$location', '$http',
 function(hueAuth, $location, $http) {
   if (!hueAuth.getToken()) $location.path('/');
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
   this.save = function() {
     $http({
       method: 'POST',
       url: '/api/bridge/create',
       dataType: 'json',
       data: this.bridge,
       headers: {
         token: window.localStorage.token
       }
     })
      .then((res) => {
        this.editing = false;
        this.bridgeExists = true;
        this.bridge.bridgeKey = res.data.bridgeKey;
        this.bridge.url = res.data.url;
        this.bridge.name = res.data.name;
      }, (response) => {
        console.log(response);
      });
   };
   this.update = function() {
     console.log(this.bridge);
     $http({
       method: 'PUT',
       url: 'api/bridge/update/' + this.bridge.bridgeKey,
       dataType: 'json',
       data: this.bridge,
       headers: {
         token: window.localStorage.token
       }
     })
      .then(() => {
        this.editing = false;
        this.bridgeExists = true;
      }, (response) => {
        console.log(response);
      });
   };
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
         this.bridge.url = res.data.bridge.url;
         this.bridge.name = res.data.bridge.name;
       }
     }, (response) => {
       console.log(response);
     });
   };

 }]);
};
