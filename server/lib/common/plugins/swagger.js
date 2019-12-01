
const HapiSwagger = require('hapi-swagger');
const { swaggerSecurityDef } = require('./auth-jwt');

const swaggerOptions = {
	info: {
		title: 'API Documentation',
		version: process.env.npm_package_version,
	},
	schemes: ['http'],
	...swaggerSecurityDef,
};

module.exports = {
	plugin: HapiSwagger,
	options: swaggerOptions,
};

