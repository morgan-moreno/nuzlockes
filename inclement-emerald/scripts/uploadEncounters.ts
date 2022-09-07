import { Axios, AxiosResponse } from 'axios';
import myMons from '../my-mons.json';

const api = new Axios({
	baseURL: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json',
	},
});

const encounters = myMons.alive;
let response: AxiosResponse<any>;

const main = async () => {
	response = await api.post('/attempts');

	if (response.data.success === false) {
		console.log('Failed to create a new attempt');
		process.exit(1);
	}

	for (let i = 0; i < encounters.length; i++) {
		const encounter = encounters[i];

		const body = {
			name: encounter.name,
			ability: encounter.ability,
			nature: encounter.nature,
			ivs: encounter.ivs,
			moves: encounter.moves,
		};

		response = await api.post('/encounters', JSON.stringify(body));

		if (response.data.success) {
			console.log(`Successfully added: ${encounter.name}`);
		} else {
			console.log(`Failed to add: ${encounter.name}`);
		}
	}
};

main();
