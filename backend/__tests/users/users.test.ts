import {ApolloServer} from '@apollo/server'
import { buildSchemaSync } from 'type-graphql';
import UserResolver from '../../src/resolvers/user.resolver';
import User from "../../src/entities/user.entity";
import datasource from "../../src/lib/datasource_test"; //on importe la datasource de test
import datasourceInitial from "../../src/lib/datasource"; //on importe la datasource 
import {LIST_USERS} from "./requests"; 
import {ResponseData} from "./types"; 
import assert from 'assert';


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
	await datasource.getRepository(User).clear(); //vidage de la table et non drop de la base de donnée complète
});

afterAll(async () => {
	await datasource.dropDatabase(); //suppression de la base de donnée
});

describe('Test sur les user avec la base de données', () => {
	it('récupération de la liste des user en base', async () => {
		const response = await server.executeOperation<ResponseData>({
			query: LIST_USERS,
		});
		assert(response.body.kind === 'single');
		expect(response.body.singleResult.data?.users).toHaveLength(0);
	});
});