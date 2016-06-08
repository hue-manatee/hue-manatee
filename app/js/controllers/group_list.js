module.exports = function(app) {
  app.controller('GroupListController', ['$http', function($http) {
    this.groupNames = [];
    var arrayResult = [];
    
    this.update = function(target, alert, colorLoop) {
        $http({
          method: 'GET',
          url: '/api/light/magic',
          params: {
            hex: this.color,
            on: this.state,
            bri: this.brightness,
            alert: alert,
            effect: colorLoop,
            group: target
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
    this.getGroupNames = function() {
      $http({
        method: 'GET',
        url: '/api/group/all',
        headers: {
          token: window.localStorage.token
        }
      })
      .then((res) => {
        this.totalGroupNames = res.data;
        this.arrayCompress(this.totalGroupNames);
        console.log(arrayResult);
        this.groupNames = arrayResult;
      }, (response) => {
        console.log(response);
      });
    };
    this.arrayCompress = function(array) {
      var fakeArray = array.sort();
      fakeArray.filter( function(ele, index, arr) {
        if (index >= 0 && ele !== arr[index - 1]) {
         arrayResult.push(ele);
        }
      });
      return arrayResult;
    };
  }]);
};
