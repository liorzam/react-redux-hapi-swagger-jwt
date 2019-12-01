class ResponseError extends Error {
	constructor(status, code, message, data) {
		super(message);
		this.statusCode = status;
		this.code = code;
		this.data = data;
	}
}

module.exports = {
	ResponseError,
};
