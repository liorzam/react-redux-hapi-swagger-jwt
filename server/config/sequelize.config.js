const { postgres } = require('config');
const logger = require('lib/logger');

logger.info({ postgres }, 'DB Config');
/**
 * Exporting the config from the YAML here to bypass the configuration problem with Sequelize
 */
module.exports = {
	...postgres,
	logging: logger.debug.bind(logger),
};
