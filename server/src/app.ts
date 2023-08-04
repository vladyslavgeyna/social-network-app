import cors from 'cors'
import express, { Application } from 'express'
import { AppDataSource } from './data-source'

class App {
	private port: number
	private app: Application
	private URI_PREFIX = 'api'

	constructor(port: number) {
		this.app = express()
		this.port = port
		this.initializeMiddlewares()
		this.initializeRoutes()
		this.initializeErrorHandling()
	}

	private initializeRoutes() {}

	private initializeMiddlewares() {
		this.app.use(cors())
		this.app.use(express.json())
	}

	private initializeErrorHandling() {}

	public async start() {
		try {
			await AppDataSource.initialize()

			this.app.listen(this.port, () =>
				console.log(`SERVER STARTED ON PORT ${this.port}`)
			)
		} catch (error) {
			console.log(error)
		}
	}
}

export default App
