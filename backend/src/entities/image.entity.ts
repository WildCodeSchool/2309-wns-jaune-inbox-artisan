import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Field, ID, InputType,  ObjectType } from 'type-graphql';
import User from './user.entity';

@ObjectType()
@InputType('ImageInput')
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
	@ManyToOne(() => User ,{
		onDelete: 'CASCADE',
})
	user: User;
}

@InputType()
export class UpdateImageInput {
	@Field(() => ID)
	id: number
	@Field({ nullable: true})
	name: string
	@Field({ nullable: true})
	url: string
	@Field((type) => User, { nullable: true})
	user: User
}

@InputType()
export class CreateImageInput {
	@Field({ nullable: true})
	name: string
	@Field({ nullable: true})
	url: string
	@Field((type) => User, { nullable: true})
	user: User
}
