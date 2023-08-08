import { Router } from 'express'
import multer from 'multer'
import accountController from './account.controller'
import { accountRegisterValidation } from './validation/account-register.validation'

const router = Router()

const upload = multer({ storage: multer.memoryStorage() })

router.post(
	'/register',
	...accountRegisterValidation,
	upload.single('avatar'),
	accountController.register
)

export default router
