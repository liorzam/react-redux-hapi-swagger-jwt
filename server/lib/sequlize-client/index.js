const config = require('config');
const Sequelize = require('sequelize');
const logger = require('lib/logger');

const defaultsConfig = {
	postgres: {
		logging: true,
		port: 5432,
		host: '127.0.0.1',
		dialect: 'postgres',
		operatorsAliases: false,
		database: 'database_development',
		username: 'postgres',
		password: 0,
	},
};

config.util.extendDeep(defaultsConfig, config.postgres);
config.util.setModuleDefaults('postgres', defaultsConfig);
const { postgres: dbConfig = defaultsConfig } = config;

if (dbConfig.logging === true) {
	dbConfig.logging = logger.info.bind(logger);
}

const { host, pool, dialect = 'postgres' } = dbConfig;
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, { host, dialect, pool });

const dbClient = {};
dbClient.sequelize = sequelize;
dbClient.Sequelize = sequelize;

dbClient.checkConnection = () => new Promise((resolve, reject) => {
	sequelize
		.authenticate()
		.then(() => {
			logger.info('Connection to database has been established successfully.');
			resolve();
		})
		.catch((err) => {
			logger.error(err, 'Unable to connect to the database');
			reject(err);
		});
});

dbClient.destroy = () => sequelize.connectionManager.close();

dbClient.healthCheck = async () => dbClient.checkConnection()
	.then(() => ({
		status: 'ok',
	}))
	.catch(error => ({
		status: 'failed',
		error,
	}));

module.exports = dbClient;
