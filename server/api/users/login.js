const { loginAsync, sign } = require('lib/common/security');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const { ResponseError } = require('lib/common/errors');

async function loginHandler(req) {
	const { email, password } = req.payload;

	try {
		const { user } = await loginAsync(email, password);

		return {
			user,
			authToken: sign(user),
		};
	} catch (err) {
		if (err instanceof ResponseError) {
			return Boom.boomify(err, { statusCode: err.statusCode });
		}

		return Boom.wrap(err, 500);
	}
}

const login = {
	method: 'POST',
	path: '/api/login',
	config: {
		handler: loginHandler,
		description: 'login',
		notes: 'Login endpoint',
		tags: ['api'],
		validate: {
			options: {
				abortEarly: false,
			},
			failAction: (request, h, err) => {
				throw err;
			},
			payload: Joi.object({
				email: Joi.string().email({ minDomainSegments: 2 }).required(),
				password: Joi.string().min(6).max(255).required(),
			}),
		},
	},
};

module.exports = [login];
