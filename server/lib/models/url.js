

module.exports = (sequelize, DataTypes) => {
	const Url = sequelize.define('Url', {
		url: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		userId: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
	}, {
		tableName: 'users-urls',
		modelName: 'Url',
		freezeTableName: true,
		paranoid: true,
		hooks: {
			// eslint-disable-next-line no-param-reassign
			beforeFind: options => ({
				...options,
				attributes: {
					exclude: ['userId', 'deletedAt', 'createdAt', 'updatedAt'],
				},
			})
			,
		},
	});


	Url.associate = ({ User }) => {
		Url.belongsTo(User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
		});
	};

	return Url;
};
