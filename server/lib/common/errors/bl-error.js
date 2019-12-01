class BLError extends Error {
	constructor(code = 'GENERAL_ERROR', message, data, ...params) {
		super(message);

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BLError);
		}

		// Custom debugging information
		this.code = code;
		this.message = message;
		this.data = data;
		this.params = params;
	}
}

module.exports = {
	BLError,
};
