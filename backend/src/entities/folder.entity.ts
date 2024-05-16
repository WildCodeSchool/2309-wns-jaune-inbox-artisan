import {
	Column,
	Entity,
	JoinTable,
	PrimaryGeneratedColumn,
	ManyToOne,
	ManyToMany,
	OneToMany,
} from 'typeorm';
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql';
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
	@ManyToOne(() => User, (User) => User.folders, {
		onDelete: 'CASCADE',
	})
	user: User;

	@Field((type) => [Image])
	@OneToMany(() => Image, (image) => image.folder)
	images: Image[];
}

@InputType()
export class UpdateFolderInput {
	@Field(() => ID)
	id: number;
	@Field({ nullable: true })
	name: string;
	@Field(() => User, { nullable: true })
	user: User;
	@Field(() => [Image], { nullable: true })
	images: Image[];
}

@InputType()
export class CreateFolderInput {
	@Field({ nullable: true })
	name: string;
	@Field(() => User, { nullable: true })
	user: User;
	@Field((type) => Float)
	userId: number;
}
