import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import User from './user.entity';

@ObjectType()
@Entity()
export default class Image {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	url: string;

	@Field((type) => User)
	@ManyToOne(() => User)
	user: User;
}
