import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import UserService from '../services/user.service';
import User, { UpdateUserInput } from '../entities/user.entity';

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
		return await new UserService().updateUser(user);
	}

	// @Mutation(() => User)
	// async insertUser(@Arg('user') user: User) {
	// 	return await new UserService().insertUser(user);
	// }
}
