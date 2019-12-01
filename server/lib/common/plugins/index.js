const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiErrors = require('hapi-error');

const CleanupPlugin = require('./cleanup-shutdown');
const AuthProvider = require('./auth-jwt');
const SwaggerPlugin = require('./swagger');
const HealthCheck = require('./health-check');

const viewEngine = require('./view-engine');

module.exports = async (server) => {
	await server.register([
		Inert,
		Vision,
		HapiErrors,
		CleanupPlugin,
		HealthCheck,
		AuthProvider.plugin,
		SwaggerPlugin,
	]);

	AuthProvider.apply(server);
	viewEngine.apply(server);
};
