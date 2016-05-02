const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Bridge = require(__dirname + '/../models/bridge');
const superAgent = require('superagent');
const handleErr = require(__dirname + '/../lib/handle_err');

var bridgeRouter = module.exports = Router();

bridgeRouter.post('/bridge', bodyParser, (req, res) => {
  var newBridge = new Bridge(req.body);

  newBridge.admin = req.user._id;
  newBridge.save((err, data) => {
    if (err) return handleErr(err);
    res.status(200).json(data);
  });
});
