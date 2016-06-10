module.exports = function(app) {
  require('./control_panel')(app);
  require('./light_form')(app);
  require('./navbar')(app);
};
