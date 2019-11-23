const Joi = require('@hapi/joi');
const { Url } = require('lib/models');

async function addUrlHandler(req) {
	const { url } = req.payload;

	const object = {
		userId: req.user.id,
		url,
	};

	const createdUrl = await Url.create(object);

	return createdUrl.get();
}

const addNewUrl = {
	method: 'POST',
	path: '/api/urls',
	config: {
		handler: addUrlHandler,
		description: 'Adding new RTSP url',
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
