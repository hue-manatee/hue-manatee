module.exports = function(app) {
  require('./auth/sign_up_controller')(app);
  require('./auth/login_controller')(app);
  require('./auth/logout')(app);
  require('./dashboard')(app);
  require('./light')(app);
  require('./bridge')(app);
};
