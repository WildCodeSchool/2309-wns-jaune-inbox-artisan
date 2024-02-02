import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import Folder from './folder.entity';
import Template from './template.entity';
import Image from './image.entity';
import Variable from './variable.entity';

export type role = 'Freemium' | 'Premium';

@ObjectType()
@Entity()
export default class User {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ unique: true })
	email: string;

	@Field()
	@Column()
	password: string;

	@Field()
	@Column()
	role: role;

	@Field()
	@Column()
	billing_date: Date;

	@Field()
	@Column()
	pseudo: string;

	@Field((type) => [Template])
	@OneToMany(() => Folder, (folder) => folder.user)
	folders: Folder[];

	@Field((type) => [Template])
	@OneToMany(() => Template, (template) => template.user)
	templates: Template[];

	@Field((type) => [Image])
	@OneToMany(() => Image, (image) => image.user)
	images: Image[];

	@Field((type) => [Variable])
	@OneToMany(() => Variable, (variable) => variable.user)
	variables: Variable[];
}

@InputType()
export class UpdateUserInput {
	@Field(() => ID)
	id: number;
	@Field({ nullable: true })
	email: string;
	@Field({ nullable: true })
	password: string;
	@Field({ nullable: true })
	pseudo: string;
	@Field({ nullable: true })
	role: role;
	@Field({ nullable: true })
	billing_date: Date;
}
