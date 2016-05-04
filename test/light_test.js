const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');
const port = process.env.PORT = 5000;

const Bridge = require(__dirname + '/../models/bridge');
const User = require(__dirname + '/../models/user');
const Light = require(__dirname + '/../models/light');

describe('the bridge post', () => {
  before((done) => {
    setup(done);
  });

  after((done) => {
    teardown(done);
  });

  before((done) => {
    var newUser = new User({
      username: 'awesomeUser',
      password: 'testMas33'
    });
    newUser.save((err, user) => {
      if (err) console.log(err);
      user.generateToken((err, token) => {
        if (err) console.log(err);
        this.token = token;
        this.user = user;
        done();
      });
    });
  });

  before((done) => {
    var newBridge = new Bridge({
      name: 'bridge test name',
      ip: '192.0.0.0',
      bridgeUserId: 'afdfafdfafdfadf',
      admin: this.user._id
    });
    newBridge.save((err, bridge) => {
      if (err) console.log(err);
      this.bridge = bridge;
      done();
    });
  });

  it('should create a light', (done) => {
    request('localhost:' + port)
      .post('/api/light/create')
      .set('token', this.token)
      .send({
        lightName: 'slothlight',
        bridgeLightId: '3'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.lightName).to.eql('slothlight');
        expect(res.body.bridgeId).to.eql(this.bridge._id.toString());
        done();
      });
  });

  describe('routes that need a light', () => {
    beforeEach((done) => {
      var newLight = new Light({
        lightName: 'test',
        bridgeId: this.bridge._id,
        bridgeLightId: '1'
      });
      newLight.save((err, light) => {
        if (err) console.log(err);
        this.light = light;
        done();
      });
    });

    it('should PUT an update into the light', (done) => {
      request('localhost:' + port)
        .put('/api/light/update/' + this.light.bridgeLightId)
        .set('token', this.token)
        .send({
          lightName: 'not test'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.n).to.eql(1);
          done();
        });
    });

    it('should attempt to send a GET to the bridge', (done) => {
      request('localhost:' + port)
        .get('/api/light/magic')
        .set('token', this.token)
        .end((err) => {
          expect(err.response.body.msg).to.eql('ip address not found');
          done();
        });
    });

    it('should attempt to GET status of a single light', (done) => {
      request('localhost:' + port)
        .get('/api/light/status/' + this.light._id)
        .set('token', this.token)
        .end((err) => {
          expect(err.response.body.msg).to.eql('ip address not found');
          done();
        });
    });
  });
});
