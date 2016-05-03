const mongoose = require('mongoose');

var lightSchema = new mongoose.Schema({
  bridgeId: { type: String, required: true },
  bridgeLightId: { type: String, required: true },
  defaultState: { type: String, required: true,
    default: { 'on': true, 'sat': 10, 'bri': 100, 'hue': 16000 } },
  lightName: { type: String, require: true },
  groups: [String]
});

module.exports = mongoose.model('Light', lightSchema);
