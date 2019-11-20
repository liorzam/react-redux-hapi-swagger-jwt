const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const logger = require('lib/logger');
const userService = require('lib/services/users');

async function registerHandler(req) {
	const { email, password, firstName, lastName } = req.payload;

	try {
		const user = await userService.createNewUser(email, password, { firstName, lastName });

		return user;
	} catch (err) {
		logger.error({ err, payload: req.payload }, 'Couldnt register new user');
		if ('name' in err) {
			switch (err.name) {
			case 'SequelizeForeignKeyConstraintError':
			case 'SequelizeUniqueConstraintError':
			case 'SequelizeValidationError':
				return Boom.badRequest(err.errors[0].message);
			default:
				return Boom.wrap(err, 500);
			}
		}
	}
}

const register = {
	method: 'POST',
	path: '/users',
	config: {
		handler: registerHandler,
		description: 'Register new user',
		notes: 'Create a user to be able to use all the features',
		tags: ['api'], // ADD THIS TAG
		validate: {
			options: {
				abortEarly: true,
			},
			failAction: (request, h, err) => {
				throw err;
			},
			payload: Joi.object({
				email: Joi.string().email({ minDomainSegments: 2 }).required(),
				password: Joi.string().min(6).max(255).required(),
				firstName: Joi.string().optional(),
				lastName: Joi.string().optional(),
			}),
		},
	},
};

module.exports = [register];
