const HapiJwtAuth = require('hapi-auth-jwt2');
const { validate } = require('lib/common/security');
const { security } = require('config');

module.exports = {
	plugin: HapiJwtAuth,
	swaggerSecurityDef: {
		securityDefinitions: {
			jwt: {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header',
			},
		},
		security: [{ jwt: [] }],
	},
	apply: (server) => {
		server.auth.strategy('jwt', 'jwt',
			{
				key: security.jwtSecret,
				validate,
				verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] },
			});
	},
};
