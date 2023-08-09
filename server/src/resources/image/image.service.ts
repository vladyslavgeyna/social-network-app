import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import * as uuid from 'uuid'

class ImageService {
	private IMAGES_FILE_EXTENSION = '.jpeg'
	private MAX_SIZE_TO_RESIZE = 1280
	private COMPRESSION_QUALITY = 80

	private async directoryExists(directoryPath: string) {
		try {
			await fs.access(directoryPath)
			return true
		} catch (error) {
			return false
		}
	}

	/**
	 * Saves and returns url to image
	 * @param file File to save
	 * @returns Created image name
	 */
	async save(file: Express.Multer.File) {
		const { buffer } = file
		const newFileName = uuid.v4() + this.IMAGES_FILE_EXTENSION

		const outputDirectory = path.join(process.cwd(), 'public', 'images')

		if (!this.directoryExists(outputDirectory)) {
			fs.mkdir(outputDirectory, { recursive: true })
		}

		await sharp(buffer)
			.resize({
				width: this.MAX_SIZE_TO_RESIZE,
				height: this.MAX_SIZE_TO_RESIZE,
				fit: 'inside',
				withoutEnlargement: true
			})
			.toFormat('jpeg')
			.jpeg({ quality: this.COMPRESSION_QUALITY })
			.toFile(path.join(outputDirectory, newFileName))

		return newFileName
	}
}

export default new ImageService()
