import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import User from './user.entity';

@ObjectType()
@InputType('VariableInput')
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
	@ManyToOne(() => User ,{
		onDelete: 'CASCADE',
})
	user: User;
}

@InputType()
export class UpdateVariableInput {
	@Field(() => ID)
	id: number
	@Field({nullable: true})
	label: string
	@Field({nullable: true})
	value: string
	@Field(() => User, {nullable: true})
	user: User
}

@InputType()
export class CreateVariableInput {
	@Field({nullable: true})
	label: string
	@Field({nullable: true})
	value: string
	@Field(() => User, {nullable: true})
	user: User
}
