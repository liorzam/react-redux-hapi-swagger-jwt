const uuid = require('uuid');
const { hashingPasswordForUser } = require('lib/services/crypto');

const passwordHook = (user) => {
	// if we save user and his password has changed
	// we have to update the hashedPassword field
	if (user.changed('password')) {
		return {
			...user,
			...hashingPasswordForUser(user.password),
		};
	}
	return user;
};

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: () => uuid(),
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		salt: {
			type: DataTypes.BLOB,
			allowNull: false,
		},
		hashedPassword: {
			type: DataTypes.BLOB,
			allowNull: false,
		},
	}, {
		tableName: 'users',
		modelName: 'users',
		freezeTableName: true,
		paranoid: true,
		hooks: {
			beforeCreate: passwordHook,
			beforeUpdate: passwordHook,
			// eslint-disable-next-line no-param-reassign
			beforeFind: options => ({
				...options,
				attributes: {
					exclude: ['salt', 'hashedPassword',
						'deletedAt', 'createdAt', 'updatedAt'],
				},
			}),
		},
	});

	User.associate = ({ Url }) => {
		User.hasMany(Url, {
			as: 'urls',
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
		});
	};

	return User;
};
