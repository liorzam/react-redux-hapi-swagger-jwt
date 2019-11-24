const Hapi = require('@hapi/hapi');
const db = require('lib/sequlize-client');
const { port } = require('config');
const logger = require('lib/logger');
const plugins = require('lib/common/plugins');
const routes = require('./api');

(async () => {
	// Checks the database connectivity before running the server
	await db.checkConnection();

	const server = await new Hapi.Server({
		host: 'localhost',
		port,
	});

	await plugins(server);

	try {
		await server.start();

		logger.info(server.info, 'Server is running');
		logger.info(`documentation api can be found here: \n ${server.info.host}:${server.info.port}/documentation `);
	} catch (err) {
		logger.error(err);
	}

	server.route(routes);
})();
