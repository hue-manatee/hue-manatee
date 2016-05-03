const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;
const Bridge = require(__dirname + '/../models/bridge');
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');
const port = process.env.PORT = 5000;
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
  it('should create a new bridge on post', (done) => {
    request('localhost:' + port)
    .post('/api/bridge')
    .set('token', this.token)
    .send({
      name: 'test testerson',
      ip: '192.168.2.2',
      bridgeUserId: 'afdfafdfafdfadf'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.admin).to.eql(this.user._id.toString());
      expect(res.body.name).to.eql('test testerson');
      expect(res.body.ip).to.eql('192.168.2.2');
      expect(res.body.bridgeUserId).to.eql('afdfafdfafdfadf');
      done();
    });
  });
});

describe('the bridge get requests', () => {
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
  beforeEach((done) => {
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
  afterEach((done) => {
    this.bridge.remove((err) => {
      if (err) console.log(err);
      done();
    });
  });
  it('should show appropriate errors for an unconnected bridge', (done) => {
    request('localhost:' + port)
    .get('/api/bridge/' + this.bridge.bridgeUserId)
    .set('token', this.token)
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Request Timeout');
      expect(res).to.have.status(408);
      expect(res.body.msg).to.eql('too slow bro');
      done();
    });
  });
  it('should update the bridge on a put command', (done) => {
    request('localhost:' + port)
    .put('/api/bridge/' + this.bridge._id)
    .set('token', this.token)
    .send({
      name: 'updated bridge',
      ip: 'updated ip',
      bridgeUserId: 'diff user id'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.nModified).to.eql(1);
      done();
    });
  });
});
