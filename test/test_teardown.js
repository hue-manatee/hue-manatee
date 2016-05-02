const mongoose = require('mongoose');
const server = require(__dirname + '/../server');
module.exports = exports = (callback) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.disconnect(() => {
      server.close(callback);
    });
  });
};
