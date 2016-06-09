const mongoose = require('mongoose');

var lightSchema = new mongoose.Schema({
  bridgeId: String,
  bridgeLightId: { type: String, required: true },
  state: { type: Boolean, required: true, default: true },
  sat: { type: Number, required: true, default: 254 },
  bri: { type: Number, required: true, default: 100 },
  hue: { type: Number, required: true, default: 0 },
  color: { type: String, default: '#ff0000' },
  name: { type: String, require: true },
  groups: [String],
  effect: { type: String, default: 'none' },
  alert: { type: String, default: 'none' }
});

module.exports = mongoose.model('Light', lightSchema);
