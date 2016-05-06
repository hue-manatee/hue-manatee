const Router = require('express').Router;
const Light = require(__dirname + '/../models/light');
const Bridge = require(__dirname + '/../models/bridge');
const superAgent = require('superagent');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const bodyParser = require('body-parser').json();
const rgbToHue = require(__dirname + '/../lib/rgb_to_hue');
const hexToHue = require(__dirname + '/../lib/hex_to_hue');
const lightRouter = module.exports = exports = Router();

lightRouter.post('/light/create', jwtAuth, bodyParser, (req, res) => {
  var newLight = new Light(req.body);

  if (req.body.groups) {
    newLight.groups = [];
    var groups = req.body.groups;
    var groupArr = groups.split(',');
    groupArr.forEach((ele) => {
      newLight.groups.push(ele);
    });
  }

  Bridge.findOne({ admin: req.user._id }, (err, bridge) => {
    if (!bridge) return res.status(401).json({ msg: 'not authorized' });
    if (err) return console.log(err);
    newLight.bridgeId = bridge._id;
  });

  newLight.save((err, data) => {
    if (err) return console.log(err);
    res.status(200).json(data);
  });
});

lightRouter.get('/light/magic', jwtAuth, (req, res) => {
  var lightObj = {};
  lightObj.effect = 'none';

  if (req.query.hue) lightObj.hue = parseInt(req.query.hue, 10);
  if (req.query.sat) lightObj.sat = parseInt(req.query.sat, 10);
  if (req.query.bri) lightObj.bri = parseInt(req.query.bri, 10);
  if (req.query.on) lightObj.on = req.query.on === 'true';
  if (req.query.effect) lightObj.effect = req.query.effect;
  if (req.query.alert) lightObj.alert = req.query.alert;
  if (req.query.lightId) lightObj.lightId = req.query.lightId;
  if (req.query.group) lightObj.group = req.query.group;

  if (req.query.red || req.query.green || req.query.blue) {
    var hueObj = rgbToHue(req.query.red || 0, req.query.green || 0, req.query.blue || 0);
    lightObj.hue = hueObj.hue;
    lightObj.sat = hueObj.sat;
  }
  if (req.query.hex) {
    var hexObj = hexToHue(req.query.hex);
    lightObj.hue = hexObj.hue;
    lightObj.sat = hexObj.sat;
  }

  Bridge.findOne({ admin: req.user._id }, (err, bridge) => {
    if (!bridge) return res.status(401).json({ msg: 'not authorized' });
    if (err) return console.log(err);
    lightObj.url = bridge.url;
    lightObj.bridgeKey = bridge.bridgeKey;

    if (!req.query.group) {
      var address = lightObj.url + '/api/' + lightObj.bridgeKey +
       '/lights/' + lightObj.lightId + '/state';
      superAgent
      .put(address)
      .send({ 'on': lightObj.on, 'sat': lightObj.sat, 'bri': lightObj.bri, 'hue': lightObj.hue,
        'effect': lightObj.effect, 'alert': lightObj.alert })
      .timeout(1000)
      .end((err, superRes) => {
        if (err && err.timeout) return res.status(408).json({ msg: 'ip address not found' });
        if (err) return console.log(err);
        res.status(200).json(JSON.parse(superRes.text));
      });
    } else {
      Light.find({ groups: lightObj.group }, (err, light) => {
        if (err) return console.log('this is the light error', err);
        if (!light.length) return res.status(408).json({ msg: 'no matching lights' });

        var superResponse = {};
        superResponse.count = 0;

        light.forEach((ele) => {
          var groupAddress = lightObj.url + '/api/' + lightObj.bridgeKey +
          '/lights/' + ele.bridgeLightId + '/state';

          superAgent
          .put(groupAddress)
          .send({ 'on': lightObj.on, 'sat': lightObj.sat, 'bri': lightObj.bri, 'hue': lightObj.hue,
            'effect': lightObj.effect, 'alert': lightObj.alert })
          .timeout(1000)
          .end((err, superRes) => {
            superResponse.count += 1;

            if (superResponse.count === light.length) {
              if (err && err.timeout) return res.status(408).json({ msg: 'ip address not found' });
              if (err) return console.log(err);
              res.status(200).json(JSON.parse(superRes.text));
            }
          });
        });
      });
    }
  });
});

lightRouter.put('/light/update/:lightId', jwtAuth, bodyParser, (req, res) => {
  var lightData = req.body;

  if (req.body.groups) {
    var group = req.body.groups;
    lightData.groups = [];
    var groupArr = group.split(',');
    groupArr.forEach((ele) => {
      lightData.groups.push(ele);
    });
  }
  delete lightData._id;

  Bridge.findOne({ admin: req.user._id }, (err, bridge) => {
    if (err) return console.log(err);
    if (!bridge._id) return res.status(401).json({ msg: 'not authorized' });

    Light.update({ bridgeLightId: req.params.lightId }, lightData, (err, data) => {
      if (err) return console.log(err);
      res.status(200).json(data);
    });
  });
});

lightRouter.get('/light/status/:lightId', jwtAuth, (req, res) => {
  Bridge.findOne({ admin: req.user._id }, (err, bridge) => {
    if (!bridge) return res.status(401).json({ msg: 'not authorized' });
    if (err) return console.log(err);

    var address = bridge.url + '/api/' + bridge.bridgeKey +
     '/lights/' + req.params.lightId;

    superAgent
    .get(address)
    .timeout(1000)
    .end((err, superRes) => {
      if (err && err.timeout) return res.status(408).json({ msg: 'ip address not found' });
      if (err) return console.log(err);
      res.status(200).json(JSON.parse(superRes.text).state);
    });
  });
});

lightRouter.get('/light/status', jwtAuth, (req, res) => {
  Bridge.findOne({ admin: req.user._id }, (err, bridge) => {
    if (!bridge) return res.status(401).json({ msg: 'not authorized' });
    if (err) return console.log(err);

    var address = bridge.url + '/api/' + bridge.bridgeKey +
     '/lights';

    superAgent
    .get(address)
    .timeout(1000)
    .end((err, superRes) => {
      if (err && err.timeout) return res.status(408).json({ msg: 'ip address not found' });
      if (err) return console.log('this was an error', err);
      res.status(200).json(JSON.parse(superRes.text));
    });
  });
});

lightRouter.get('/light/reset/:lightId', jwtAuth, (req, res) => {
  Bridge.findOne({ admin: req.user._id }, (err, bridge) => {
    if (!bridge) return res.status(401).json({ msg: 'not authorized' });
    if (err) return console.log(err);

    var address = bridge.url + '/api/' + bridge.bridgeKey +
     '/lights/' + req.params.lightId + '/state';

    Light.findOne({ bridgeLightId: req.params.lightId }, (err, light) => {
      if (err) return console.log(err);
      superAgent
      .put(address)
      .send({ 'on': light.state, 'sat': light.sat, 'bri': light.bri,
      'hue': light.hue, 'effect': light.effect, 'alert': light.alert })
      .timeout(1000)
      .end((err, superRes) => {
        if (err && err.timeout) return res.status(408).json({ msg: 'ip address not found' });
        if (err) return console.log(err);
        res.status(200).json(JSON.parse(superRes.text));
      });
    });
  });
});
