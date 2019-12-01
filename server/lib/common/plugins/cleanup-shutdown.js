const Terminus = require('terminus-hapi');
const db = require('lib/sequlize-client');
const logger = require('lib/logger');

module.exports = {
	plugin: Terminus,
	options: {
		timeout: 1000,
		signal: ['SIGTERM', 'SIGINT', 'SIGKILL'],
		healthChecks: {
			'/healthcheck': () => Promise.resolve(
				db.checkConnection(),
			),
		},
		onSignal: () => {
			logger.info('server is starting cleanup');
			return Promise.all([
				// closing database connections
				db.destroy(),
			]);
		},

		onShutdown: () => {
			logger.info('cleanup finished, server is shutting down');
		},

		healthCheck: () => Promise.resolve(
			db.checkConnection(),
			// optionally include a resolve value to be included as
			// info in the health check response
		),
	},
};
