const { loginAsync, sign } = require('lib/common/security');
const Joi = require('@hapi/joi');

async function loginHandler(req) {
	const { email, password } = req.payload;

	const { user } = await loginAsync(email, password);

	return sign(user);
}

const login = {
	method: 'POST',
	path: '/login',
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
