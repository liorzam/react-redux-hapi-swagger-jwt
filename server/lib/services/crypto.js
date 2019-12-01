const util = require('util');
const crypto = require('crypto');

const scryptAsync = util.promisify(crypto.scrypt);

const hashPassword = async (password, salt) => scryptAsync(password, salt, 64);

const isValidPassword = async (user, password) => {
	// hash the password with the same salt
	const hashedssword = await hashPassword(password, user.salt);

	// verify hashed password equals to user's hashed password
	return hashedssword.equals(user.hashedPassword);
};

const hashingPasswordForUser = async (password) => {
	const salt = Buffer.from(Array(256).fill().map(() => Math.random() * 256));
	const hashedPassword = await hashPassword(password, salt);
	return { salt, hashedPassword };
};

module.exports = {
	hashPassword,
	hashingPasswordForUser,
	isValidPassword,
};
