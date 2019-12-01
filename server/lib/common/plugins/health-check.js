const plugin = {
	register(server, options, next) {
		next();
	},
};

const healthcheckPlugin = {
	name: 'Health Check Plugin',
	version: '1.0.0',
	async register(server, options) {
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
	},
};
module.exports = healthcheckPlugin;
