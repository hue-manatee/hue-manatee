const mongoose = require('mongoose');

var bridgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ip: { type: String, required: true },
  bridgeUserId: { type: String, required: true },
  admin: String,
  users: [String]
});

module.exports = mongoose.model('Bridge', bridgeSchema);
