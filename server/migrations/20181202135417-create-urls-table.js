const uuid = require('uuid');

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('users-urls', {

		userId: {
			primaryKey: true,
			type: Sequelize.UUID,
			references: {
				model: 'users', // name of Target model
				key: 'id', // key in Target model that we're referencing
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
		url: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		deletedAt: {
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	}),

	down: queryInterface => queryInterface.dropTable('users-urls'),
};
