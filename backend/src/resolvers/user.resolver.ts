import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import UserService from '../services/user.service';
import User, {
	CreateUserInput,
	InputLogin,
	Message,
	UpdateUserInput,
} from '../entities/user.entity';
import { MyContext } from '..';
import Cookies from 'cookies';
import { SignJWT } from 'jose';
import * as bcrypt from 'bcrypt';

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

	@Query(() => Message)
	async login(@Arg('infos') infos: InputLogin, @Ctx() ctx: MyContext) {
		const user = await new UserService().getUserBymail(infos.mail);
		if (!user) {
			throw new Error('Vérifiez vos informations');
		}
		const isPasswordValid = await bcrypt.compare(infos.password, user.password);
		const m = new Message();
		if (isPasswordValid) {
			const token = await new SignJWT({ email: user.mail })
				.setProtectedHeader({ alg: 'HS256', typ: 'jwt' })
				.setExpirationTime('2h')
				.sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));
			let cookies = new Cookies(ctx.req, ctx.res);
			cookies.set('token', token, { httpOnly: true });

			m.message = 'Bienvenue!';
			m.success = true;
		} else {
			m.message = 'Vérifiez vos informations 2';
			m.success = false;
		}
		return m;
	}

	@Query(() => Message)
	async logout(@Ctx() ctx: MyContext) {
		if (ctx.user) {
			let cookies = new Cookies(ctx.req, ctx.res);
			cookies.set('token'); //sans valeur, le cookie token sera supprimé
		}
		const m = new Message();
		m.message = 'Vous avez été déconnecté';
		m.success = true;

		return m;
	}

	@Mutation(() => User)
	async updateUser(@Arg('user') user: UpdateUserInput) {
		const foundUser = await new UserService().getUserBymail(user.mail);
		if (foundUser) throw new Error('mail is already in use');

		return await new UserService().updateUser(user);
	}

	@Mutation(() => User)
	async createUser(@Arg('user') user: CreateUserInput) {
		return await new UserService().createUser(user);
	}

	@Mutation(() => User)
	async deleteUser(@Arg('id') id: number) {
		const userDeleted = await new UserService().deleteUser(id);
		return userDeleted;
	}
}
