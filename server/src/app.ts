import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import { AppDataSource } from './data-source'
import errorMiddleware from './middlewares/error.middleware'
import accountRouter from './resources/account/account.router'

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

	private initializeRoutes() {
		this.app.use(`/${this.URI_PREFIX}/account`, accountRouter)
	}

	private initializeMiddlewares() {
		this.app.use(express.static('./public/images'))
		this.app.use(cookieParser())
		this.app.use(express.json())
		this.app.use(cors())
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware)
	}

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
