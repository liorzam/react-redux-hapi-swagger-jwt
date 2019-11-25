const should = require('should');
const request = require('supertest');
const { User: userModel } = require('lib/models');

const server = require('../../app');

describe('Login', function () {
	this.timeout(5000);

	before(async function () {
		this.server = await server;
	});

	describe('POST /login', function () {
		before(async function () {
			this.user = {
				email: 'lior@anyvision.com',
				password: '123456',
			};
		});

		it('should login successfully', async function () {
			const loginResponse = await request(this.server)
				.post('/api/login')
				.send({ email: this.user.email, password: this.user.password })
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.expect(200)
				.then(res => res.body);

			should(loginResponse).be.an.Object();

			loginResponse.should.have.property('cd').which.is.String();

			const user = await userModel.findOne({ where: { email: this.user.email } });
			should(user).be.an.Object();
		});

		it('should not login with wrong account email', async function () {
			const payload = {
				email: 'user@stam.com',
				password: this.user.password,
			};
			const response = await request(this.server)
				.post('/api/login')
				.send(payload)
				.expect(401)
				.then(res => res.body);
			should(response).be.an.Object();
		});

		it('should not login with wrong password', async function () {
			const payload = {
				email: this.user.email,
				password: '121212',
			};
			const response = await request(this.server)
				.post('/api/login')
				.send(payload)
				.expect(401)
				.then(res => res.body);
			should(response).be.an.Object();
		});
	});
});
