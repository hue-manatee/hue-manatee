const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request;
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');
const port = process.env.PORT = 5000;
process.env.MONGODB_URI = 'mongo://localhost/hue_test_db';
var User = require(__dirname + '/../models/user');

describe('the login route tests', () => {
  before((done) => {
    setup(done);
  });

  before((done) => {
    var newUser = new User({
      username: 'testUser',
      password: 'muchPassword'
    });

    newUser.generateHash(newUser.password);
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

  after((done) => {
    teardown(done);
  });

  it('should login and GET a new token', (done) => {
    request('testUser:muchPassword@localhost:' + port)
      .get('/api/login')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.token.length).to.not.eql(0);
        expect(res.body.token).to.eql(this.token);
        done();
      });
  });

  it('should sign up a new user', (done) => {
    request('localhost:' + port)
      .post('/api/signup')
      .send({ username: 'test', password: 'test' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.token.length).to.not.eql(0);
        expect(res.body.token).to.not.eql(this.token);
        done();
      });
  });
});
