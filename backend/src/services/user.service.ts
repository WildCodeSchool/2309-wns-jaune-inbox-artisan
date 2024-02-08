import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import User, { CreateUserInput, UpdateUserInput } from '../entities/user.entity';
import assert from "assert"

export default class UserService {
	db: Repository<User>;
	constructor() {
		this.db = datasource.getRepository(User);
	}

	async getAllUsers() {
		return this.db.find();
	}

	async getUserById(id: number) {
		const findUser = await this.db.findOneBy({ id: id });
		assert(findUser,"No user found")
		return findUser
	}

	async getUserByEmail(email: string) {
		return this.db.findOneBy({ email: email });
	}


	async updateUser(user: UpdateUserInput) {
		console.log("user:", user)
		assert(user.id,"you need to provide an id")
		const actualUser = await this.getUserById(user.id)

			return  await this.db.save(this.db.merge(actualUser, user));
	}

	async insertUser(user: CreateUserInput) {
		const newUser = this.db.create(user);
		return await this.db.save(newUser);
	}

	async deleteUser(id: number) {
		const user = await this.getUserById(id) as User;
		await this.db.remove(user)
		return {...user, id};
	}

}
