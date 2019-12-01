const { BLError } = require('./bl-error');
const log = require('lib/logger');
const extractDetailRegex = '\\((.*)\\)';

class BLSequelizeForeignKeyConstraintError extends BLError {
	constructor(err, { code = 'CONSTRAINT_ERROR', message, data } = {}, ...params) {
		super(code, message, data, ...params);
		this.original = err;
		this.name = BLSequelizeForeignKeyConstraintError.name;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BLSequelizeForeignKeyConstraintError);
		}

		// Custom debugging information
		if (err.parent && err.parent.detail) {
			const matches = err.parent.detail.match(extractDetailRegex);
			if (Array.isArray(matches) && matches.length > 0) {
				[this.message] = matches;
			}
		}

		if (!this.message) {
			this.message = message;
		}
	}
}

class BLSequelizeUniqueConstraintError extends BLError {
	constructor(err, { code = 'UNIQUE_ERROR', message, data } = {}, ...params) {
		super(code, message, data, ...params);

		this.original = err;
		this.name = BLSequelizeUniqueConstraintError.name;

		if (typeof message !== 'string' && !message) {
			this.setErrorMessage(err);
		}

		if (!this.message) {
			this.message = err.message;
		}

		this.data = {
			fields: err.fields,
			...data,
		};

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BLSequelizeUniqueConstraintError);
		}
	}

	setErrorMessage(err) {
		if (typeof err.original === 'object') {
			if (typeof err.original.detail === 'string') {
				this.message = err.original.detail;
			}
		} else if (Array.isArray(err.errors) && err.errors.length > 0) {
			const [validationError] = err.errors;
			this.message = validationError.message;
		}
	}
}

class BLSequelizeValidationError extends BLError {
	constructor(err, { code = 'VALIDATION_ERROR', message, data } = {}, ...params) {
		super(code, message, data, ...params);
		this.original = err;
		this.name = BLSequelizeValidationError.name;

		if (Array.isArray(err.errors) && err.errors.length > 0) {
			if (!message) { this.setErrorMessage(err); }
			if (!data) { this.setErrorData(err); }
		}

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BLSequelizeValidationError);
		}
	}

	setErrorMessage(err) {
		const [validationError] = err.errors;
		this.message = `(${validationError.path})=(${validationError.value}) - ${validationError.message}`;
	}

	setErrorData(err) {
		const [validationError] = err.errors;

		this.data = {
			value:	validationError.value,
		};
	}
}

const defaultErrorHandler = (err) => {
	if ('name' in err) {
		switch (err.name) {
		case 'SequelizeForeignKeyConstraintError':
			throw new BLSequelizeForeignKeyConstraintError(err);
		case 'SequelizeUniqueConstraintError':
			throw new BLSequelizeUniqueConstraintError(err);
		case 'SequelizeValidationError':
			throw new BLSequelizeValidationError(err);
		default:
			log.warn({ err }, 'Sequelize error occured');
			throw err;
		}
	}
};

function isUniqueConstraintError(e) {
	return e.name === 'BLSequelizeUniqueConstraintError' || e instanceof BLSequelizeUniqueConstraintError;
}

function isValidationError(e) {
	return e.name === 'BLSequelizeValidationError' || e instanceof BLSequelizeValidationError;
}

function isForeignKeyConstraintError(e) {
	return e.name === 'BLSequelizeForeignKeyConstraintError' || e instanceof BLSequelizeForeignKeyConstraintError;
}

module.exports = {
	BLSequelizeForeignKeyConstraintError,
	BLSequelizeUniqueConstraintError,
	BLSequelizeValidationError,
	defaultErrorHandler,
	isUniqueConstraintError,
	isValidationError,
	isForeignKeyConstraintError,
};
