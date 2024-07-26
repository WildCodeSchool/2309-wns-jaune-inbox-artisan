import { DataSource } from 'typeorm';

export default new DataSource({
	type: 'postgres',
	host: process.env.PGHOST,
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'inboxartisan',
	synchronize: true,
	entities: [__dirname + '/../entities/*.{js,ts}'],
	logging: ['error'],
});
