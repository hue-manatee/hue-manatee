const mongoose = require('mongoose');

var lightSchema = new mongoose.Schema({
  bridgeId: String,
  bridgeLightId: { type: String, required: true, unique: true },
  state: { type: Boolean, required: true, default: true },
  sat: { type: Number, required: true, default: 10 },
  bri: { type: Number, required: true, default: 100 },
  hue: { type: Number, required: true, default: 16000 },
  lightName: { type: String, require: true },
  groups: [String]
});

module.exports = mongoose.model('Light', lightSchema);
