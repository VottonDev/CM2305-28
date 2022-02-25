const test = require('supertest');
const app = require('../../express.js');

// Test Twitter API with bearer token
describe('GET /twitter/get_recent_tweets', () => {
  // Test Twitter API with bearer token
  it('should return 200', (done) => {
    test(app).get('/twitter/get_recent_tweets').send({ token: process.env.TWITTER_TOKEN, query: 'test' }).expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /twitter/get_tweet_geolocation', () => {
  it('should return 200', (done) => {
    test(app).get('/twitter/get_tweet_geolocation').send({ token: process.env.TWITTER_TOKEN, query: 'test' }).expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /twitter/search_recent_tweets', () => {
  it('should return 200', (done) => {
    test(app).get('/twitter/search_recent_tweets').send({ token: process.env.TWITTER_TOKEN, query: 'test' }).expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /twitter/get_public_tweets', () => {
  it('should return 200', (done) => {
    test(app).get('/twitter/get_public_tweets').send({ token: process.env.TWITTER_TOKEN, query: 'test' }).expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /twitter/get_followers', () => {
  it('should return 200', (done) => {
    test(app).get('/twitter/get_followers').send({ token: process.env.TWITTER_TOKEN, query: 'test' }).expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /twitter/get_user_tweets', () => {
  it('should return 200', (done) => {
    test(app).get('/twitter/get_user_tweets').send({ token: process.env.TWITTER_TOKEN, query: 'test' }).expect('Content-Type', /json/).expect(200, done);
  });
});
