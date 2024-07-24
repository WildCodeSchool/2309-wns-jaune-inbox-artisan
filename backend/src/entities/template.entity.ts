import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import User from './user.entity';
import Variable from './variable.entity';
import Image from './image.entity';

@ObjectType()
@InputType('TemplateInput')
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
	@ManyToOne(() => User , (user) => user.templates)
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

@InputType()
export class UpdateTemplateInput {
	@Field(() => ID)
	id: number;
	@Field({ nullable: true})
	name: string
	@Field({nullable: true})
	config: string
	@Field( (type) => User, {nullable: true})
	user: User
	@Field(type => [Variable], {nullable: true})
	variables: Variable[]
	@Field(type => [Image], {nullable: true})
	Images: Image[]


}

@InputType()
export class CreateTemplateInput {
	@Field({ nullable: true})
	name: string
	@Field({nullable: true})
	config: string
	@Field( (type) => User, {nullable: true})
	user: User
	@Field(type => [Variable], {nullable: true})
	variables: Variable[]
	@Field(type => [Image], {nullable: true})
	Images: Image[]
}

@InputType()
export class CreateTemplateInputRequest {
	@Field({ nullable: true})
	name: string
	@Field({nullable: true})
	userId: number
}


@ObjectType()
export class PrintTemplate {
	@Field({ nullable: true})
	html: string
}