class HttpError extends Error {
	public readonly status: number
	public readonly errors: string[]

	constructor(status: number, message: string, errors: string[] = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedError() {
		return new HttpError(401, 'User is not authorized')
	}

	static BadRequest(message: string, errors: string[] = []) {
		return new HttpError(400, message, errors)
	}
}

export default HttpError