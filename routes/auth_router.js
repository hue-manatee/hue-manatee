const Router = require('express').Router;
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const authRouter = module.exports = exports = new Router();
const basicHttp = require(__dirname + '/../lib/basic_http');
const validate = require(__dirname + '/../lib/validation');

authRouter.post('/signup', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;
  if (!password) return res.status(500).json({ msg: 'missing password' });
  var newUser = new User(req.body);
  var validation = validate(password);
  if (validation) return res.status(500).json({ msg: validation });
  newUser.generateHash(password);
  password = null;
  newUser.save((err, user) => {
    if (err && err.errors && err.errors.username && err.errors.username.message) {
      return res.status(500).json({ msg: err.errors.username.message });
    }
    if (err) return res.status(500).json({ msg: 'could not create user' });
    user.generateToken((err, token) => {
    if (err) return res.status(500).json({ msg: 'could not generate token, try again foo' });
    res.json({ token });
    });
  });
});

authRouter.get('/login', basicHttp, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'authentication error' });
    if (!user) return res.status(500).json({ msg: 'user not found' });
    if (!user.compareHash(req.auth.password)) {
      return res.status(500).json({ msg: 'wrong password' });
    }
    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'could not generate token, try again later' });
      res.json({ token });
    });
  });
});
