import { body } from 'express-validator'
import passwordValidator from 'password-validator'

const passwordSchema = new passwordValidator()
passwordSchema
	.is()
	.min(6)
	.is()
	.max(50)
	.has()
	.uppercase()
	.has()
	.lowercase()
	.has()
	.digits()
	.has()
	.not()
	.spaces()

export const accountRegisterValidation = [
	body('username')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 5, max: 20 })
		.withMessage(`Username length should be 5-20 characters`),
	body('email')
		.trim()
		.notEmpty()
		.escape()
		.isEmail()
		.withMessage('Not a valid e-mail address'),
	body('name')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 2, max: 100 })
		.withMessage(`Name length should be 5-100 characters`),
	body('surname')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 2, max: 100 })
		.withMessage(`Surname length should be 5-100 characters`),
	body('password')
		.trim()
		.notEmpty()
		.custom(value => {
			const passwordValidationResult = passwordSchema.validate(value, {
				details: true
			})
			if (
				Array.isArray(passwordValidationResult) &&
				passwordValidationResult.length > 0
			) {
				const validationErrors = passwordValidationResult.map(error =>
					error.message.replace('string', 'password')
				)
				throw new Error(
					'Invalid password: ' + validationErrors.join(', ')
				)
			}
			return true
		}),
	body('passwordConfirm').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Passwords do not match')
		}
		return true
	})
]
