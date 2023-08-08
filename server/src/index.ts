import dotenv from 'dotenv'
import 'module-alias/register'
import 'reflect-metadata'
import App from './app'

dotenv.config()

const PORT = Number(process.env.PORT) || 5000

const app = new App(PORT)

app.start()
