import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import User from './user.entity';

@ObjectType()
@InputType('VariableInput')
@Entity()
export default class Variable {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field({nullable: true})
	@Column()
	label: string;

	@Field({nullable: true})
	@Column()
	value: string;

	@Field((type) => User, {nullable: true})
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
	label?: string
	@Field({nullable: true})
	value?: string
	@Field(() => User, {nullable: true})
	user?: User
}

@InputType()
export class CreateVariableInput {
	@Field(() => ID, {nullable: true})
	id?: number
	@Field({nullable: true})
	label?: string
	@Field({nullable: true})
	value?: string
	@Field(() => User, {nullable: true})
	user?: User
}
