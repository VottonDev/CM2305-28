const test = require('supertest');
const app = require('../../express.js');

// Test login with valid credentials
describe('Login with valid credentials', () => {
  it('should return a token', (done) => {
    test(app)
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'fkiYfyTPFFtPjR5',
      })
      .expect(200, done);
  });
});
// Test Login with non-existing credentials
describe('Login with non-existing credentials', () => {
  it('should return 401', (done) => {
    test(app).post('/auth/login')
    .send({
      username: 'test',
      password: 'wrongpassword'
    })
    .expect('Content-Type', /json/)
    .expect(401, done);
  });
});

// Test register route if returns a response
describe('Register route', () => {
  it('should return a response', (done) => {
    test(app)
      .post('/auth/register')
      .expect(500, done);
  }
);
});
