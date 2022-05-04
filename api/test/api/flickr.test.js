const test = require('supertest');
const app = require('../../express.js')

// Flickr get blogs test
// Test is commented out because it takes too long to run (Flickr API is unreliable)
// describe('Get Flickr blogs', () => {
//     it('should return a list of blogs', (done) => {
//         test(app)
//             .get('/flickr/get_blogs')
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .end((err) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             }
//             );
//     }
//     );
// }
// );