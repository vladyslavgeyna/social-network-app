import path from 'path'
import sharp from 'sharp'
import uuid from 'uuid'

class ImageService {
	private IMAGES_FILE_EXTENSION = 'jpeg'
	private MAX_SIZE_TO_RESIZE = 1280
	private COMPRESSION_QUALITY = 80
	// private storage = multer.memoryStorage()
	// private upload: Multer

	// constructor() {
	// 	this.upload = multer({ storage: this.storage })
	// }

	/**
	 * Saves and returns url to image
	 * @param file File to save
	 * @returns Created image name
	 */
	async save(file: Express.Multer.File) {
		const { buffer } = file
		const newFileName = uuid.v4() + this.IMAGES_FILE_EXTENSION

		await sharp(buffer)
			.resize({
				width: this.MAX_SIZE_TO_RESIZE,
				height: this.MAX_SIZE_TO_RESIZE,
				fit: 'inside',
				withoutEnlargement: true
			})
			.toFormat('jpeg')
			.jpeg({ quality: this.COMPRESSION_QUALITY })
			.toFile(path.join(__dirname, 'public', 'images', newFileName))

		return newFileName
	}
}

export default new ImageService()
