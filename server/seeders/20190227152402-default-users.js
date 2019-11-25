
const { User } = require('lib/models');
const uuid = require('uuid');
const { hashingPasswordForUser } = require('lib/services/crypto');

const getUser = ({ email = `${uuid()}@anyvision.com`,
	firstName, lastName,
	password = uuid() } = {}) => ({
	email,
	password,
	firstName,
	lastName,
});

const emails = [{ email: 'lior@anyvision.com', firstName: 'Lior', lastName: 'zamir' },
	{ email: 'bar@anyvision.com', firstName: 'Bar', lastName: 'bitton' }];

module.exports = {
	up: async () => Promise.all(emails.map(async (item) => {
		const user = getUser({
			email: item.email,
			firstName: item.firstName,
			lastName: item.lastName,
			password: '123456',
		});

		const { salt, hashedPassword } = await hashingPasswordForUser(user.password);
		return User.create({ ...user, salt, hashedPassword });
	})),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', {
		email: {
			[Sequelize.Op.in]: emails,
		},
	}),
};
