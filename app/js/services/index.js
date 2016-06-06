module.exports = function(app) {
  require('./hue_handle_error')(app);
  require('./hue_auth')(app);
};
