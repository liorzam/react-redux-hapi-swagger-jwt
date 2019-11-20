const uuid = require('uuid');

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: () => uuid(),
		},
		salt: {
			type: Sequelize.BLOB,
			allowNull: false,
		},
		hashedPassword: {
			type: Sequelize.BLOB,
			allowNull: false,
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
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

	down: queryInterface => queryInterface.dropTable('users'),
};
