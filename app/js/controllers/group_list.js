module.exports = function(app) {
  app.controller('GroupListController', ['hueAuth', '$location', '$http',
  function(hueAuth, $location, $http) {
    if (!hueAuth.getToken()) $location.path('/');
    this.groupNames = [];
    var arrayResult = [];
    this.reset = function(target) {
      $http({
        method: 'GET',
        url: '/api/group/reset',
        headers: {
          token: window.localStorage.token
        },
        params: {
          groupName: target
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
          this.status = 'success';
        }, (response) => {
          console.log('fail no light change :( ', response);
          this.status = 'fail';
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
