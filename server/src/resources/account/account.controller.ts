import HttpError from '@utils/exceptions/http.error'
import { RequestWithBody } from '@utils/types/request.type'
import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'
import accountService from './account.service'
import RegisterInputDto from './dtos/register-input.dto'

class AccountController {
	async register(
		req: RequestWithBody<RegisterInputDto>,
		res: Response,
		next: NextFunction
	) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return next(
					HttpError.BadRequest('Validation error', errors.array())
				)
			}

			const userData = await accountService.register(req.body, req.file)

			res.cookie('refreshToken', userData.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000
			})

			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}
}

export default new AccountController()
