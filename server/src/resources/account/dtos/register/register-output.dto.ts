import UserDto from '@resources/user/dtos/user.dto'

export default interface RegisterOutputDto {
	accessToken: string
	refreshToken: string
	user: UserDto
}
