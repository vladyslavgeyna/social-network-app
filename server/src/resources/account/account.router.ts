import { imageExtensionValidation } from '@resources/image/validation/image-extension.validation'
import { imageSizeValidation } from '@resources/image/validation/image-size.validation'
import { Router } from 'express'
import multer from 'multer'
import accountController from './account.controller'
import { accountRegisterValidation } from './validation/account-register.validation'

const router = Router()

const upload = multer({ storage: multer.memoryStorage() })

router.post(
	'/register',
	upload.single('avatar'),
	accountRegisterValidation,
	imageSizeValidation(5),
	imageExtensionValidation,
	accountController.register
)

export default router
