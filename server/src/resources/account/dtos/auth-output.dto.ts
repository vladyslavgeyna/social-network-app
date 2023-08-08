import UserDto from '@resources/user/dtos/user.dto'

export default interface AuthOutputDto {
	accessToken: string
	refreshToken: string
	user: UserDto
}
