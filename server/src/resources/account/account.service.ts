import { AppDataSource } from '@/data-source'
import emailService from '@resources/email/email.service'
import imageService from '@resources/image/image.service'
import tokenService from '@resources/token/token.service'
import UserDto from '@resources/user/dtos/user.dto'
import { User } from '@resources/user/user.entity'
import HttpError from '@utils/exceptions/http.error'
import bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import RegisterInputDto from './dtos/register/register-input.dto'
import RegisterOutputDto from './dtos/register/register-output.dto'

class AccountService {
	private userRepository: Repository<User>

	constructor() {
		this.userRepository = AppDataSource.getRepository(User)
	}

	async register(
		registerInputDto: RegisterInputDto
	): Promise<RegisterOutputDto> {
		const candidate = await this.userRepository.findOne({
			where: [
				{ email: registerInputDto.email },
				{ username: registerInputDto.username }
			]
		})

		if (candidate) {
			throw HttpError.BadRequest(
				`User with email ${registerInputDto.email} and/or username ${registerInputDto.username} already exists`
			)
		}

		let imageName: string | null = null

		if (registerInputDto.avatar) {
			imageName = await imageService.save(registerInputDto.avatar)
		}

		const hashedPassword = await bcrypt.hash(registerInputDto.password, 5)

		const newUser = this.userRepository.create({
			email: registerInputDto.email,
			name: registerInputDto.name,
			surname: registerInputDto.surname,
			password: hashedPassword,
			avatar: imageName
		})

		const createdUser = await this.userRepository.save(newUser)

		const verificationLink = `${process.env.API_URL}/api/account/verify/${createdUser.id}`

		await emailService.sendVerifyingEmail(
			createdUser.email,
			verificationLink
		)

		const userDto = new UserDto(createdUser)

		const tokens = tokenService.generateTokens({
			id: userDto.id,
			email: userDto.email,
			username: userDto.username,
			isVerified: userDto.isVerified,
			role: userDto.role
		})

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}
}

export default new AccountService()
