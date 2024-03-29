import { DataSource } from 'typeorm';

export default new DataSource({
	type: 'postgres',
	host: process.env.PGHOST,
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'inboxartisan',
	synchronize: true,
	entities: ['src/entities/*.ts'],
	logging: ['query', 'error'],
});
