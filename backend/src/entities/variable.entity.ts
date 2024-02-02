import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import User from './user.entity';

@ObjectType()
@Entity()
export default class Variable {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	label: string;

	@Field()
	@Column()
	value: string;

	@Field((type) => User)
	@ManyToOne(() => User)
	user: User;
}
