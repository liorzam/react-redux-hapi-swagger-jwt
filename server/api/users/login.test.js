const should = require('should');
const request = require('supertest');
const { User: userModel } = require('lib/models');
const { populateUser } = require('lib/test-helpers/user-helper');
const server = require('../../app');

describe('Login', function () {
	this.timeout(5000);

	before(async function () {
		this.server = await server;
	});

	describe('POST /login', function () {
		before(async function () {
			const { user } = await populateUser();
			this.user = user;
		});

		it('should login successfully', async function () {
			const loginResponse = await request(this.server)
				.post('/login')
				.send({ email: this.user.email, password: this.user.password })
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.expect(200)
				.then(res => res.body);

			should(loginResponse).be.an.Object();
			loginResponse.should.have.property('isFinish').which.is.Boolean();
			loginResponse.should.have.property('apiKey').which.is.String();

			const user = await userModel.findOne({ where: { email: this.user.email } });
			should(user).be.an.Object();
		});

		it('should not login with wrong account email', async function () {
			const payload = {
				email: 'user@stam.com',
				password: this.user.password,
			};
			const response = await request(this.server)
				.post('/login')
				.send(payload)
				.expect(401)
				.then(res => res.body);
			should(response).be.an.Object();
			response.should.have.property('message').which.is.String();
			response.should.have.property('status').which.is.equal(401);
			response.should.have.property('code').which.is.equal('WRONG_CREDENTIALS');
		});

		it('should not login with wrong password', async function () {
			const payload = {
				email: this.user.email,
				password: '121212',
			};
			const response = await request(this.server)
				.post('/login')
				.send(payload)
				.expect(401)
				.then(res => res.body);
			should(response).be.an.Object();
			response.should.have.property('message').which.is.String();
			response.should.have.property('status').which.is.equal(401);
			response.should.have.property('code').which.is.equal('WRONG_CREDENTIALS');
		});
	});
});
