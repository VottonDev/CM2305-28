const test = require('supertest');
const app = require('../../express.js');

// Test login
describe('POST /auth/login', () => {
  it('should return 200', (done) => {
    test(app).post('/auth/login').expect(200, done);
  });
});

// Test register
describe('POST /auth/login', () => {
  it('should return 200', (done) => {
    test(app).post('/auth/register')
    .expect(200, done);
  });
});
