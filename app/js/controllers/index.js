module.exports = function(app) {
  require('./auth/sign_up_controller')(app);
  require('./auth/login_controller')(app);
  require('./auth/logout')(app);
  require('./dashboard')(app);
  require('./light')(app);
  require('./bridge')(app);
  require('./all_lights')(app);
  require('./group_detail')(app);
};
