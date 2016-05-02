const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Bridge = require(__dirname + '/../models/bridge');
const superAgent = require('superagent');
// const handleErr = require(__dirname + '/../lib/handle_err');

var bridgeRouter = module.exports = Router();

bridgeRouter.post('/bridge', bodyParser, (req, res) => {
  var newBridge = new Bridge(req.body);

  newBridge.admin = req.user._id;
  newBridge.save((err, data) => {
    if (err) return console.log(err);
    res.status(200).json(data);
  });
});

bridgeRouter.get('/bridge/:bridgeId', (req, res) => {
  Bridge.findOne({ bridgeUserId: req.params.bridgeId }, (err, bridge) => {
    if (err) return console.log(err);
    superAgent
      .get('http://' + bridge.ip + '/api/' + bridge.bridgeUserId + '/lights')
      .end((err, superRes) => {
        if (err) return console.log(err);
        res.status(200).json(JSON.parse(superRes.text));
      });
  });
});
