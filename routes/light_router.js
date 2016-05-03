const Router = require('express').Router;
const User = require(__dirname + '/../models/user');
const Light = require(__dirname + '/../models/light');
const Bridge = require(__dirname + '/../models/bridge');
const superAgent = require('superagent');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const bodyParser = require('body-parser').json();

const lightRouter = module.exports = exports = Router();

lightRouter.post('/light', jwtAuth, bodyParser, (req, res) => {
  var newLight = new Light(req.body);
  Bridge.findOne({ admin: req.user._id }, (err, bridge) => {
    if (!bridge) return res.status(401).json({ msg: 'not authorized' });
    if (err) return console.log(err);
    newLight.bridgeId = bridge._id.toString();
  });
  newLight.save((err, data) => {
    if (err) return console.log(err);
    res.status(200).json(data);
  });
});
