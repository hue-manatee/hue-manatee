const server = require(__dirname + '/../server');

module.exports = exports = (callback) => {
  server.close(callback);
};
