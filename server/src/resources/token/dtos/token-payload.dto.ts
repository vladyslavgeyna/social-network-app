import UserRole from '@utils/enums/user-role'

export default interface TokenPayloadDto {
	/**
	 * User's id
	 */
	id: string

	/**
	 * Is user verified
	 */
	isVerified: boolean

	/**
	 * User's email address
	 */
	email: string

	/**
	 * User's username
	 */
	username: string

	/**
	 * User's role
	 */
	role: UserRole
}
