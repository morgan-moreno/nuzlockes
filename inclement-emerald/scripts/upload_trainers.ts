import axios from 'axios';
import { trainers } from '../trainers.json';

const api = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		'x-nuzlocke-source': 'SCRIPTS',
	},
});

const main = async () => {
	try {
	} catch (error) {
		console.error('Error: ', error);
		process.exit(1);
	}
};

main();
