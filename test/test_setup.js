const mongoose = require('mongoose');
const port = process.env.PORT = 5000;
const server = require(__dirname + '/../server');
process.env.MONGODB_URI = 'mongodb://localhost/hue_test_db';

module.exports = exports = (callback) => {
  mongoose.connect(process.env.MONGODB_URI, () => {
    server.listen(port, () => {
      console.log('server up on port:' + port);
      callback();
    });
  });
};
