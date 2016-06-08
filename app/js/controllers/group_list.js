module.exports = function(app) {
  app.controller('GroupListController', ['$http', function($http) {
    this.groupNames = [];
    var arrayResult = [];
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
