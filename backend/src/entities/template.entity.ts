import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import User from './user.entity';
import Variable from './variable.entity';
import Image from './image.entity';

@ObjectType()
@Entity()
export default class Template {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column({ type: 'jsonb' })
	config: string;

	@Field((type) => User)
	@ManyToOne(() => User)
	user: User;

	@Field((type) => [Variable])
	@ManyToMany(() => Variable)
	@JoinTable()
	variables: Variable[];

	@Field(() => [Image])
	@ManyToMany(() => Image)
	@JoinTable()
	images: Image[];
}
