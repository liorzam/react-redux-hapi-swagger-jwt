const Joi = require('@hapi/joi');
const { Url } = require('lib/models');
const Boom = require('@hapi/boom');

async function addUrlHandler(req) {
	const { url } = req.payload;

	const object = {
		userId: req.user.id,
		url,
	};

	try {
		const createdUrl = await Url.create(object);
		return createdUrl.get();
	} catch (err) {
		if ('name' in err
		&& err.name === 'SequelizeUniqueConstraintError') {
			return Boom.badRequest('url must be unique');
		}

		return Boom.wrap(err, 500);
	}
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


async function getUrlsHandler(req) {
	const urls = await Url.findAll({
		where: {
			userId: req.user.id,
		},
	});

	return urls;
}

const getUrls = {
	method: 'GET',
	path: '/api/urls',
	config: {
		handler: getUrlsHandler,
		description: 'Getting Relevant urls',
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
		},
	},
};
module.exports = [addNewUrl, getUrls];
