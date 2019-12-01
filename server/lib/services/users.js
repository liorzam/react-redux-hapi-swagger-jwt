const { User } = require('lib/models');
const { hashingPasswordForUser } = require('lib/services/crypto');
const logger = require('lib/logger');

const createNewUser = async (email, password, { firstName, lastName }) => {
	const hashingPasswordAttributes = await hashingPasswordForUser(password);

	const { dataValues } = await User.create({
		email, firstName, lastName, ...hashingPasswordAttributes,
	}, { returning: true });

	// extract sensitive attributes
	const { salt, hashedPassword, ...exposedUserProperties } = dataValues;

	logger.info(exposedUserProperties, 'User has been created');

	return { user: exposedUserProperties };
};

module.exports = {
	createNewUser,
};
