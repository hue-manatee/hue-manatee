/* 
   you might want to evaluate what constitutes a 'server error' most of the
   errors that you have in here are not really server errors but errors with
   the data that user is sending you. Also, instead of having a separete 
   'user not found' from the incorrect password error you should make them a
   single error message. If you need the extra debugging information of what
   exactly went wrong you should console log that information not send it back
   to the user, which can create not so much a security vulnerability but more
   of a security concern. Also, there is a lot of repitition in these errors,
   you might consider moving them into a seperate function. Overall, it looks
   pretty good.
*/
const Router = require('express').Router;
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();

//since this is what you're module.exporting you might want to make this
//line stand out more, not a major change but will make this easier to maintain.
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
