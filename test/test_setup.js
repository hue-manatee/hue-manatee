const server = require(__dirname + '/../server');
const port = process.env.PORT = 5000;

module.exports = exports = (callback) => {
  server.listen(port, () => {
    console.log('server up on port:' + port);
    callback();
});
};
