import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Field, Float, ID, InputType, ObjectType } from 'type-graphql';
import User from './user.entity';
import Folder from './folder.entity';

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
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
	})
	user: User;

	@Field((type) => ID)
	@ManyToOne(() => Folder, (folder) => folder.images, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	folder: Folder;
}

@InputType()
export class UpdateImageInput {
	@Field(() => ID)
	id: number;
	@Field()
	name: string;
	@Field()
	url: string;
}

@InputType()
export class CreateImageInput {
	@Field()
	name: string;
	@Field()
	url: string;
	@Field((type) => Float)
	userId: number;
	@Field(() => ID)
	folderId: number;
}
