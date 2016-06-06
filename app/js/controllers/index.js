module.exports = function(app) {
  require('./auth/sign_up_controller')(app);
  require('./auth/login_controller')(app);
};
