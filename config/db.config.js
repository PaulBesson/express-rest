import * as mysql from 'mysql2/promise'

const connection = await mysql.createConnection({ // a deplacer
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

connection
	.connect()
	.then(() => {console.log(`Connexion etablie avec MySQL`);})
	.catch(() => {console.log(err);})

export default connection;