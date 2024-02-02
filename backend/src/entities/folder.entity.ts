import {
	Column,
	Entity,
	JoinTable,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import User from './user.entity';
import Image from './image.entity';

@ObjectType()
@Entity()
export default class Folder {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field((type) => User)
	@ManyToOne(() => User)
	user: User;

	@Field((type) => [Image])
	@ManyToMany(() => Image)
	@JoinTable()
	images: Image[];
}
