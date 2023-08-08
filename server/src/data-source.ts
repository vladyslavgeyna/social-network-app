import { Token } from '@resources/token/token.entity'
import { User } from '@resources/user/user.entity'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'root',
	database: 'social-network',
	synchronize: true,
	logging: false,
	entities: [User, Token],
	migrations: [],
	subscribers: []
})
