const test = require('supertest');
const app = require('../../express.js')

// Flickr get blogs test
describe('Get Flickr blogs', () => {
    it('should return a response', (done) => {
        test(app).get('/flickr/get_blogs').expect(200, done);
    });
});