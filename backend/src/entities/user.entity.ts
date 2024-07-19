import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
	Unique,
} from 'typeorm';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import Folder from './folder.entity';
import Template from './template.entity';
import Image from './image.entity';
import Variable from './variable.entity';
import * as bcrypt from 'bcrypt';

export type role = 'Freemium' | 'Premium';

@ObjectType()
@InputType('UserInput')
@Entity()
export default class User {
	@Field()
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Field()
	@Column({ unique: true })
	mail: string;

	@Field()
	@Column()
	password: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	role?: role;

	@Field({ nullable: true })
	@Column({ nullable: true, type: 'date' })
	billing_date?: string;

	@Field()
	@Column()
	username: string;

	@Field((type) => [Template])
	@OneToMany(() => Folder, (folder) => folder.user, {
		cascade: true,
	})
	folders: Folder[];

	@Field((type) => [Template])
	@OneToMany(() => Template, (template) => template.user, {
		cascade: true,
	})
	templates: Template[];

	@Field((type) => [Image])
	@OneToMany(() => Image, (image) => image.user, {
		cascade: true,
	})
	images: Image[];

	@Field((type) => [Variable])
	@OneToMany(() => Variable, (variable) => variable.user, {
		cascade: true,
	})
	variables: Variable[];

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(): Promise<void> {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
	}
}

@InputType()
export class UpdateUserInput {
	@Field(() => ID)
	id: number;
	@Field({ nullable: true })
	mail: string;
	@Field({ nullable: true })
	password: string;
	@Field({ nullable: true })
	username: string;
	@Field({ nullable: true })
	role: role;
	@Field({ nullable: true })
	billing_date: string;
}

@ObjectType()
export class LoginResponse {
	@Field(() => ID)
	id: number;
	@Field({ nullable: true })
	username: string;
	@Field()
	expirationDate: string;
}

@ObjectType()
export class Message {
	@Field()
	success: boolean;

	@Field({ nullable: true })
	user: LoginResponse;

	@Field()
	message: string;
}

@InputType()
export class CreateUserInput {
	@Field()
	mail: string;
	@Field()
	password: string;
	@Field()
	username: string;
	@Field({ nullable: true })
	role: role;
	@Field({ nullable: true })
	billing_date: string;
}

@InputType()
export class InputLogin {
	@Field()
	mail: string;

	@Field()
	password: string;
}
