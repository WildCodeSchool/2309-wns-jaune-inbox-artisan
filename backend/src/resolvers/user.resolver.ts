import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import UserService from '../services/user.service';
import User, { CreateUserInput, UpdateUserInput } from '../entities/user.entity';

@Resolver()
export default class UserResolver {
	@Query(() => [User])
	async users() {
		return await new UserService().getAllUsers();
	}

	@Query(() => [User])
	async userById(@Arg('id') id: number) {
		return await new UserService().getUserById(id);
	}

	@Mutation(() => User)
	async updateUser(@Arg('user') user: UpdateUserInput) {
		
		const foundUser = await new UserService().getUserByEmail(user.email);
		if (foundUser) throw new Error('Email is already in use');

		return await new UserService().updateUser(user);
	}

	@Mutation(() => User)
	async insertUser(@Arg('user') user: CreateUserInput) {
		return await new UserService().insertUser(user);
	} 

	@Mutation(() => User)
	async deleteUser(@Arg('id') id: number) {
		const userDeleted = await new UserService().deleteUser(id);
		return userDeleted;
	}
}