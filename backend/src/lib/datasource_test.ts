import { DataSource } from 'typeorm';

export default new DataSource({
	type: 'postgres',
	host: process.env.PGHOSTTEST,
	port: 5434,
	username: 'postgres',
	password: 'postgres',
	database: 'inboxartisan_test',
	synchronize: true,
	entities: ['src/entities/*.ts'],
	logging: ['query', 'error'],
});