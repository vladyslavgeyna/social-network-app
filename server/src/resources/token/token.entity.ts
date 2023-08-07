import { User } from '@resources/user/user.entity'
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Token {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	refreshToken: string

	@OneToOne(() => User, user => user.token)
	@JoinColumn()
	user: User
}
