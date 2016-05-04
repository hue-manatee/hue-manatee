const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [8, 'username must be 8 characters long'],
    maxlength: [24, 'username must be 24 characters long'],
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function(cb) {
  cb(null, jwt.sign({ idd: this._id }, process.env.APP_SECRET));
};

module.exports = exports = mongoose.model('User', userSchema);
