import HttpStatusCode from '@utils/enums/http-status-code'

class HttpError extends Error {
	public readonly status: number
	public readonly errors: any[]

	constructor(status: number, message: string, errors: any[] = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedError() {
		return new HttpError(
			HttpStatusCode.UNAUTHORIZED_401,
			'User is not authorized'
		)
	}

	static BadRequest(message: string, errors: any[] = []) {
		return new HttpError(HttpStatusCode.BAD_REQUEST_400, message, errors)
	}

	static NotFound(message: string, errors: any[] = []) {
		return new HttpError(HttpStatusCode.NOT_FOUND_404, message, errors)
	}
}

export default HttpError
