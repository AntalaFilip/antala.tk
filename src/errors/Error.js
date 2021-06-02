class AError extends Error {
	/**
	 *
	 * @param {string} message
	 * @param {string | number} code
	 */
	constructor(message, code) {
		super(message);
		this.message = message;
		this.code = code;
	}
}
export default AError;