/**
 * Represents a validation error with a custom message.
 * @param {string} message - The error message to be displayed.
 * @constructor
 */
export class ValidationError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'ValidationError'
	}
}