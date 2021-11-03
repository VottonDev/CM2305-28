const test = require('supertest');
const app = require('../../api/express.js');

// Test login
describe('POST /api/login', () => {
	it('should return 200', (done) => {
		test(app)
			.post('/api/auth/login')
			.expect(200, done);
	});
});
    
