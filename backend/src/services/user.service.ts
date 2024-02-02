import { Repository } from 'typeorm';
import datasource from '../lib/datasource';
import User, { UpdateUserInput } from '../entities/user.entity';

export default class UserService {
	db: Repository<User>;
	constructor() {
		this.db = datasource.getRepository(User);
	}

	async getAllUsers() {
		return this.db.find();
	}

	async getUserById(id: number) {
		return this.db.findOneBy({ id: id });
	}

	async updateUser(user: UpdateUserInput) {
		if (user.id) {
			return this.db.update(user.id, user);
		}
	}

	async insertUser(user: User) {
		return this.db.save(user);
	}

	async deleteUser(id: number) {
		return this.db.delete({ id: id });
	}

	// login dans resolveur ou dans entité ?
	// async checkPasswordHash(credentials: Credentials) {
	// 	return this.db.remove(user);
	// }
}
