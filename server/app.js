const Hapi = require('@hapi/hapi');

const db = require('lib/sequlize-client');
const { port } = require('config');
const logger = require('lib/logger');
const plugins = require('lib/common/plugins');
const routes = require('./api');

(async () => {
	const server = await new Hapi.Server({
		host: 'localhost',
		port,
	});

	await plugins(server);

	try {
		await server.start();

		logger.info(server.info, 'Server is running');
	} catch (err) {
		logger.error(err);
	}
	server.route({
		method: 'GET',
		path: '/healthcheck',
		config: {
			description: 'health check',
			notes: 'healthcheck endpoint',
			tags: ['api'],
			handler: () => {},
		},
	});

	server.route(routes);
})();
