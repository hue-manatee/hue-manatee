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

describe('the bridge post', () => {
  before((done) => {
    setup(done);
  });

  after((done) => {
    teardown(done);
  });

  before((done) => {
    var newUser = new User({
      username: 'awesome',
      password: 'test'
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
      .post('/api/light')
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
});
