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
import { jwtVerify } from 'jose';
import UserService from './services/user.service';
import Cookies from 'cookies';
import Stripe from 'stripe';
export interface MyContext {
	req: express.Request;
	res: express.Response;
	user: User | null;
}

export interface Payload {
	email: string;
}

const stripe = new Stripe(
	'sk_test_51PGzIWE3g1sPCd3VquhlSIdb3FmaxcH3jwpdGomn23DdmXPOg1qPh7R2yyiBUFZahp5O4Nhwfdh8tFz5P62oBbBs00vo8NMqAH'
);

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
	app.use(
		'/api',
		cors<cors.CorsRequest>({ origin: '*' }),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => {
				if (req.method === 'POST') {
					try {
						// Create Checkout Sessions from body params.
						const session = await stripe.checkout.sessions.create({
							line_items: [
								{
									// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
									price: 'price_1PH5xLE3g1sPCd3VhLy8qWaq',
									quantity: 1,
								},
							],
							mode: 'payment',
							success_url: `${req.headers.origin}/?success=true`,
							cancel_url: `${req.headers.origin}/?canceled=true`,
						});
						res.redirect(303, session.url as string);
					} catch (err: any) {
						res.status(err.statusCode || 500).json(err.message);
					}
				} else {
					res.setHeader('Allow', 'POST');
					res.status(405).end('Method Not Allowed');
				}
				return { req, res, user: null };
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
