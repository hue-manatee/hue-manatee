process.env.MONGODB_URI = 'mongodb://localhost/hue_test_db';
const mongoose = require('mongoose');
const port = process.env.PORT = 5000;
process.env.APP_SECRET = 'notarealsecret';
const server = require(__dirname + '/../server');
module.exports = exports = (callback) => {
  mongoose.connect(process.env.MONGODB_URI, () => {
    server.listen(port, () => {
      console.log('server up on port:' + port);
      callback();
    });
  });
};
