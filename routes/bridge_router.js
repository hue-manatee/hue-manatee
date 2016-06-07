const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Bridge = require(__dirname + '/../models/bridge');
const superAgent = require('superagent');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var bridgeRouter = module.exports = exports = Router();

bridgeRouter.post('/bridge/create', jwtAuth, bodyParser, (req, res) => {
  var newBridge = new Bridge(req.body);

  newBridge.admin = req.user._id;
  newBridge.save((err, data) => {
    if (err) return console.log(err);
    res.status(200).json(data);
  });
});

bridgeRouter.get('/bridge/exists', jwtAuth, (req, res) => {
  Bridge.findOne({ admin: req.user._id }, (err, bridge) => {
    if (!bridge) {
      return res.status(401).json({
      msg: 'no bridge found, please create a new bridge',
      bridgeExists: false
    });
  }
  if (err) return console.log(err);
  return res.status(200).json(bridge);
  });
});

bridgeRouter.get('/bridge/status/:bridgeKey', jwtAuth, (req, res) => {
  Bridge.findOne({ bridgeKey: req.params.bridgeKey, admin: req.user._id }, (err, bridge) => {
    if (!bridge) return res.status(401).json({ msg: 'not authorized' });
    if (err) return console.log(err);

    superAgent
    .get(bridge.url + '/api/' + bridge.bridgeKey + '/lights')
    .timeout(1800)
    .end((err, superRes) => {
      if (err && err.timeout) return res.status(408).json({ msg: 'too slow bro' });
      if (err) return console.log(err);
      res.status(200).json(JSON.parse(superRes.text));
    });
  });
});

bridgeRouter.put('/bridge/update/:bridgeKey', jwtAuth, bodyParser, (req, res) => {
  var bridgeData = req.body;
  delete bridgeData._id;

  Bridge.update({ bridgeKey: req.params.bridgeKey, admin: req.user._id },
    bridgeData, (err, data) => {
      if (!data) return res.status(401).json({ msg: 'not authorized' });
      if (err) console.log(err);
      res.status(200).json(data);
    });
});
