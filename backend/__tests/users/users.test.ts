import { ApolloServer } from '@apollo/server';
import { buildSchemaSync } from 'type-graphql';
import UserResolver from '../../src/resolvers/user.resolver';
import User from '../../src/entities/user.entity';
import datasource from '../../src/lib/datasource_test'; //on importe la datasource de test
import datasourceInitial from '../../src/lib/datasource'; //on importe la datasource
import { LIST_USERS, CREATE_USER, DELETE_USER, UPDATE_USER } from './requests';
import assert from 'assert';
import {
	ResponseData,
	ResponseDataCreate,
	ResponseDataDelete,
	ResponseDataUpdate,
} from './types';

let server: ApolloServer;

const baseSchema = buildSchemaSync({
	resolvers: [UserResolver],
	authChecker: () => true,
});

beforeAll(async () => {
	server = new ApolloServer({
		schema: baseSchema,
	});

	jest
		.spyOn(datasourceInitial, 'getRepository')
		.mockReturnValue(datasource.getRepository(User));

	await datasource.initialize(); //initialisation de la datasource
	// await datasource.getRepository(User).clear(); //vidage de la table et non drop de la base de donnée complète
});

afterAll(async () => {
	await datasource.dropDatabase(); //suppression de la base de donnée
});

describe('Test sur les user avec la base de données', () => {
	it('récupération de la liste des user en base', async () => {
		const response = await server.executeOperation<ResponseData>({
			query: LIST_USERS,
		});
		console.log('response :', response);
		assert(response.body.kind === 'single');
		expect(response.body.singleResult.data?.users).toHaveLength(0);
	});

	it('creation user', async () => {
		const response = await server.executeOperation<ResponseDataCreate>({
			query: CREATE_USER,
			variables: {
				user: {
					mail: 'test@test.com',
					password: 'password',
					role: 'Freemium',
					billing_date: '1990-01-01',
					username: 'TestUser',
				},
			},
		});
		assert(response.body.kind === 'single');
		expect(response.body.singleResult.data?.createUser).not.toBeNull();
		expect(response.body.singleResult.data?.createUser.password).not.toBe(
			'password'
		);

		console.log('insert : ', response.body.singleResult.data?.createUser);
		expect(response.body.singleResult.data?.createUser).toMatchObject({
			mail: 'test@test.com',
			role: 'Freemium',
			billing_date: '1990-01-01',
			username: 'TestUser',
		});
	});

	it('update user', async () => {
		const response = await server.executeOperation<ResponseDataUpdate>({
			query: UPDATE_USER,
			variables: {
				user: {
					id: 1,
					mail: 'toto@test.com',
					username: 'tataUser',
				},
			},
		});

		assert(response.body.kind === 'single');
		console.log(
			'this is a response of update',
			response.body.singleResult.errors
		);
		console.log('toto :', response.body.singleResult.errors);
		console.log('tata :', response.body.singleResult.data);
		expect(response.body.singleResult.data?.updateUser).not.toBeNull();

		expect(response.body.singleResult.data?.updateUser).toEqual({
			mail: 'toto@test.com',
			username: 'tataUser',
		});
	});

	it('delete user', async () => {
		const response = await server.executeOperation<ResponseDataDelete>({
			query: DELETE_USER,
			variables: {
				deleteUserId: 1,
			},
		});
		assert(response.body.kind === 'single');
		expect(response.body.singleResult.data?.deleteUser).not.toBeNull();

		expect(response.body.singleResult.data?.deleteUser).toEqual({
			id: 1,
		});
	});
});
