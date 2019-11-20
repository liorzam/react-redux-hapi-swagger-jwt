const Joi = require('@hapi/joi');
const { User, Url } = require('lib/models');

async function addUrlHandler(req) {
	const { url } = req.payload;

	return Url.findAll({
		where: { userId: req.user.id },
	});
}

const addNewUrl = {
	method: 'POST',
	path: '/urls',
	config: {
		handler: addUrlHandler,
		description: 'Adding new url for RTSP Stream',
		notes: 'URL',
		tags: ['api'],
		auth: 'jwt',
		validate: {
			options: {
				abortEarly: false,
			},
			failAction: (request, h, err) => {
				throw err;
			},
			payload: Joi.object({
				url: Joi.string().uri().required(),
			}),
		},
	},
};

module.exports = [addNewUrl];
