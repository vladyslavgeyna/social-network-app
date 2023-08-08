import HttpError from '@utils/exceptions/http.error'
import { NextFunction, Request, Response } from 'express'

const errorMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err)
	if (err instanceof HttpError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors })
	}

	return res.status(500).json({ message: err.message })
}

export default errorMiddleware
