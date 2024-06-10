import UserResolver from './resolvers/user.resolver';
import FolderResolver from './resolvers/folder.resolver';
import TemplateResolver from './resolvers/template.resolver';
import ImageResolver from './resolvers/image.resolver';
import VariableResolver from './resolvers/variable.resolver';
import datasource from './lib/datasource';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';
import User from './entities/user.entity';
import * as jose from 'jose';
import UserService from './services/user.service';
import Cookies from 'cookies';
export interface MyContext {
	req: express.Request;
	res: express.Response;
	user: User | null;
}

export interface Payload {
	email: string;
}

const app = express();
const httpServer = http.createServer(app);

async function main() {
	const schema = await buildSchema({
		resolvers: [
			UserResolver,
			TemplateResolver,
			FolderResolver,
			ImageResolver,
			VariableResolver,
		],
		validate: false,
	});
	const server = new ApolloServer<MyContext>({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();
	app.set('trust proxy', true);
	app.use(
		'/',
		cors<cors.CorsRequest>({
			origin: 'http://localhost:3000',
			credentials: true,
		}),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => {
				let user: User | null = null;

				const cookies = new Cookies(req, res);
				const token = cookies.get('token');
				if (token) {
					try {
						const verify = await jose.jwtVerify<Payload>(
							token,
							new TextEncoder().encode(process.env.SECRET_KEY)
						);
						user = await new UserService().getUserBymail(verify.payload.email);
					} catch (err) {
						console.error(err);
						//potentiellement gérer l'erreur, est ce que l'erreur est liée au fait que le token soit expiré? est ce qu'on le renouvelle? ou est ce autre chose? etc...
					}
				}
				return { req, res, user };
			},
		})
	);
	await datasource.initialize();
	await new Promise<void>((resolve) =>
		httpServer.listen({ port: 4000 }, resolve)
	);
	console.info(`🚀 Server lancé sur http://localhost:4000/`);
}

main();
