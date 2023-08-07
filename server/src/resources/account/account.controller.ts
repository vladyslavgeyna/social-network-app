import { RequestWithBody } from '@utils/types/request.type'
import { NextFunction, Response } from 'express'

class AccountController {
	async register(
		req: RequestWithBody<null>,
		res: Response,
		next: NextFunction
	) {}
}

export default new AccountController()
