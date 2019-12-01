
const Handlebars = require('handlebars');

module.exports = {
	apply: (server) => {
		server.views({
			engines: {
				html: Handlebars,
			},
			isCached: true,
			path: require('path').resolve(process.cwd(), './api/view-templates'),
		});
	},
};
