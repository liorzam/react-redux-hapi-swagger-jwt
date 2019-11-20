
const { User } = require('lib/models');
const uuid = require('uuid');
const { hashingPasswordForUser } = require('lib/services/crypto');

const getUser = ({ email = `${uuid()}@anyvision.com`,
	password = uuid() } = {}) => ({
	email,
	password,
	firstName: 'string',
	lastName: 'string',
});

const emails = ['lior@anyvision.com', 'bar@anyvision.com'];

module.exports = {
	up: async () => Promise.all(emails.map(async (email) => {
		const user = getUser({ email, password: '123456' });
		const { salt, hashedPassword } = await hashingPasswordForUser(user.password);
		return User.create({ ...user, salt, hashedPassword });
	})),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', {
		email: {
			[Sequelize.Op.in]: emails,
		},
	}),
};
