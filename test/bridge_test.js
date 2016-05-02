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

describe('the bridge', () => {
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
