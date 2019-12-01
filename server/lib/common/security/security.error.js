const { ResponseError } = require('lib/common/errors');

class WrongUsernameOrPassword extends ResponseError {
	constructor() {
		super(401, 'WRONG_CREDENTIALS', 'Wrong Crefentials.');
	}
}

module.exports = {
	WrongUsernameOrPassword,
};
