const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Bridge = require(__dirname + '/../models/bridge');
const superAgent = require('superagent');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var bridgeRouter = module.exports = exports = Router();

bridgeRouter.post('/bridge', jwtAuth, bodyParser, (req, res) => {
  var newBridge = new Bridge(req.body);

  newBridge.admin = req.user._id;
  newBridge.save((err, data) => {
    if (err) return console.log(err);
    res.status(200).json(data);
  });
});

bridgeRouter.get('/bridge/:bridgeId', jwtAuth, (req, res) => {
  Bridge.findOne({ bridgeUserId: req.params.bridgeId, admin: req.user._id }, (err, bridge) => {
    if (!bridge) return res.status(401).json({ msg: 'not authorized' });
    if (err) return console.log(err);
    superAgent
      .get('http://' + bridge.ip + '/api/' + bridge.bridgeUserId + '/lights')
      // TODO: lenghten timeout before production release
      .timeout(1000)
      .end((err, superRes) => {
        if ( err && err.timeout) return res.status(408).json({ msg: 'too slow bro' });
        if (err) return console.log(err);
        res.status(200).json(JSON.parse(superRes.text));
      });
  });
});
