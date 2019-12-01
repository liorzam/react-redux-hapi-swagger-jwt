module.exports = {
	handleDatabaseErrors: () => {
		if ('name' in err) {
			switch (err.name) {
			case 'SequelizeForeignKeyConstraintError':
				return err.message;
			case 'SequelizeUniqueConstraintError':
				throw new BLSequelizeUniqueConstraintError(err);
			case 'SequelizeValidationError':
				throw new BLSequelizeValidationError(err);
			default:
				log.warn({ err }, 'Sequelize error occured');
				throw err;
			}
		}
	},
};

