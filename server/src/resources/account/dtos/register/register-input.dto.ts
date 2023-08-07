export default interface RegisterInputDto {
	username: string
	email: string
	name: string
	surname: string
	password: string
	avatar?: Express.Multer.File
}
