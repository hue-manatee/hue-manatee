module.exports = function(app) {
  app.factory('hueHandleError', () => {
    return function(errorsArr, message) {
      return function(err) {
        console.log(err.data.msg);
        if (Array.isArray(errorsArr)) {
          errorsArr.push(new Error(message || 'server error'));
        }
      };
    };
  });
};
