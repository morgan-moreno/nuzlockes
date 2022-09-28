import { Client } from 'pg';

const main = async () => {
	let client: Client = new Client({
		host: 'localhost',
		database: 'nuzlockes',
		user: 'postgres',
		password: 'yankees12',
	});

	try {
		client.connect();
		console.log('Connected to database');
	} catch (error) {
		console.error('Error connecting to database', error);
	}

	const query = `
        SELECT COUNT(*)
        FROM death d
        JOIN attempt a ON d.attempt_id = a.id
        WHERE a.active = true
        AND a.game_name = 'INCLEMENT_EMERALD'
        AND d.deleted = false
    `;

	try {
		const response = await client.query(query);

		console.log(`Deaths: ${response.rows[0]['count']}`);
		client.end();
		process.exit(0);
	} catch (error) {
		console.error('Error fetching from db', error);
		process.exit(1);
	}
};

main();
