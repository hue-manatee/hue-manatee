const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'invalid token' });

    User.findOne({ _id: decoded.idd }, (err, data) => {
      if (err) return res.status(403).json({ msg: 'database error' });
      if (!data) return res.status(403).json({ msg: 'could not find user. Log in again' });
      req.user = data;
      next();
    });
  });
};
