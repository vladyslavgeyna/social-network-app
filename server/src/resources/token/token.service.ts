import { AppDataSource } from '@/data-source'
import HttpError from '@utils/exceptions/http.error'
import jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import TokenPayloadDto from './dtos/token-payload.dto'
import { Token } from './token.entity'

class TokenService {
	private accessTokenExpiresIn: string = '30m'
	private refreshTokenExpiresIn: string = '30d'
	private tokenRepository: Repository<Token>

	constructor() {
		this.tokenRepository = AppDataSource.getRepository(Token)
	}

	generateTokens(payload: TokenPayloadDto) {
		const accessToken = jwt.sign(
			{ ...payload },
			String(process.env.JWT_ACCESS_SECRET),
			{
				expiresIn: this.accessTokenExpiresIn
			}
		)

		const refreshToken = jwt.sign(
			{ ...payload },
			String(process.env.JWT_REFRESH_SECRET),
			{
				expiresIn: this.refreshTokenExpiresIn
			}
		)

		return {
			accessToken,
			refreshToken
		}
	}

	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await this.tokenRepository.findOneBy({
			user: { id: userId }
		})
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			const updatedToken = await this.tokenRepository.save(tokenData)
			return updatedToken
		}

		const token = this.tokenRepository.create({
			user: { id: userId },
			refreshToken
		})
		const newToken = await this.tokenRepository.save(token)
		return newToken
	}

	async removeToken(refreshToken: string) {
		const token = await this.tokenRepository.findOneBy({ refreshToken })

		if (!token) {
			throw HttpError.NotFound(
				'Token by given refresh token was not found'
			)
		}

		await this.tokenRepository.delete(refreshToken)
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(
				token,
				String(process.env.JWT_REFRESH_SECRET)
			)

			return userData as TokenPayloadDto
		} catch (error) {
			return null
		}
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(
				token,
				String(process.env.JWT_ACCESS_SECRET)
			)

			return userData
		} catch (error) {
			return null
		}
	}
}

export default new TokenService()
