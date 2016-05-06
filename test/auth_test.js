const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request;
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');
const port = process.env.PORT = 5000;
var User = require(__dirname + '/../models/user');

describe('the login route tests', () => {
  before((done) => {
    setup(done);
  });
  before((done) => {
    var newUser = new User({
      username: 'testUser',
      password: 'muchPassword1'
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
    request('testUser:muchPassword1@localhost:' + port)
    .get('/api/login')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.token.length).to.not.eql(0);
      done();
    });
  });
  it('should sign up a new user', (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'secondUser', password: 'Test23456' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.token.length).to.not.eql(0);
      expect(res.body.token).to.not.eql(this.token);
      done();
    });
  });
  it('should fail to create a user when name is less than 8 characters', (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'fail8', password: 'Test23456' })
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Internal Server Error');
      expect(res.status).to.eql(500);
      expect(res.body.msg).to.eql('username must be 8 characters long');
      done();
    });
  });
  it('should fail to create a user when name is less than 8 characters', (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'failevenmorecuzitslongerthan24', password: 'Test23456' })
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Internal Server Error');
      expect(res.status).to.eql(500);
      expect(res.body.msg).to.eql('username must be 24 characters long');
      done();
    });
  });
  it('should fail to create a user when password is less than 8 characters', (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'imagooduser', password: 'badpass' })
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Internal Server Error');
      expect(res.status).to.eql(500);
      expect(res.body.msg).to.eql('password must be 8 characters long');
      done();
    });
  });
  it('should fail to create a user when password does not contain number',
  (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'imagooduser', password: 'mostlygGood' })
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Internal Server Error');
      expect(res.status).to.eql(500);
      expect(res.body.msg)
      .to.eql('password needs uppercase and lowercase letters and at least one number');
      done();
    });
  });
  it('should fail to create a user when password does not contain an uppercase letter',
  (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'imagooduser', password: 'mostlyggood1' })
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Internal Server Error');
      expect(res.status).to.eql(500);
      expect(res.body.msg)
      .to.eql('password needs uppercase and lowercase letters and at least one number');
      done();
    });
  });
  it('should fail to create a user when password does not contain an lowercase letter',
  (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'imagooduser', password: 'MOSTLYGOOD1' })
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Internal Server Error');
      expect(res.status).to.eql(500);
      expect(res.body.msg)
      .to.eql('password needs uppercase and lowercase letters and at least one number');
      done();
    });
  });
});
