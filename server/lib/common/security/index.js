const { security: securityConfig } = require('config');
const { User } = require('lib/models');
const jsonwebtoken = require('jsonwebtoken');
const logger = require('lib/logger');
const { isValidPassword } = require('lib/services/crypto');
const { WrongUsernameOrPassword } = require('./security.error');

function sign({ id }) {
	return jsonwebtoken.sign({ id }, securityConfig.jwtSecret, { algorithm: 'HS256' });
}

const validate = async (decoded, request, callback) => {
	if (!decoded && !decoded.id) {
		return { isValid: false };
	}

	const { id } = decoded;

	const user = await User.findOne({
		where: {
			id,
		},
	});

	if (!user) {
		logger.error(decoded, 'Non existing account tried to make a request');
		return { isValid: false };
	}

	request.user = user;
	return { isValid: true };
};

async function loginAsync(email, password) {
	const user = await User.findOne({ where: { email }, hooks: false });
	if (!user) {
		logger.error({ email }, 'Non existing account tried to make a request');
		throw new WrongUsernameOrPassword();
	}
	const isValid = await isValidPassword(user, password);
	if (!isValid) {
		logger.error({ email, password }, 'User tired to login with wrong password');
		throw new WrongUsernameOrPassword();
	}

	const { salt, hashedPassword, deletedAt, ...publicUser } = user.dataValues;
	return { user: { ...publicUser } };
}
module.exports = {
	loginAsync,
	validate,
	sign,
};
