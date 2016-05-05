const mongoose = require('mongoose');

var bridgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  bridgeKey: { type: String, required: true },
  admin: String,
  users: [String]
});

module.exports = mongoose.model('Bridge', bridgeSchema);
