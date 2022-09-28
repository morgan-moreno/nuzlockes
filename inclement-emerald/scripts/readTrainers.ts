import fs from 'fs';
import path, { parse } from 'path';
import { cwd } from 'process';
import { parsePokemonStringToJson, Pokemon } from './ParserV2';

const FILE_PATH = path.join(cwd(), 'docs', 'trainers.txt');
const SECTION_DELIMITER = '====================';
const TRAINER_DELIMITER = '-----';
const POKEMON_DELIMITER = '\n';
const SKIP_LINES = [
	'',
	'-After Cut-',
	'-After Surf-',
	'-Verdanturf Side-',
	'PKMN Trainer Brendan/May',
	'Aqua Admin Matt',
	'Leader Roxanne',
	'Leader Brawly',
	'Leader Wattson',
	'Leader Flannery',
	'Leader Norman',
	'Leader Winona',
	'Leaders Tate & Liza',
	'Leader Juan',
	'Aqua Admin Shelly',
	'Magma Admin Courtney',
	'Magma Admin Tabitha',
	'Magma Leader Maxie',
	'Aqua Leader Archie',
	'-After Maxie-',
	'-After Weather Institute-',
	'-After Fortree Gym-',
	'-After Dive-',
	'-After Waterfall-',
];

const TRIM = (x: string) => x.trim();
const FILTER_POKEMON_LINES = (x: string) => x.startsWith('-');

const main = async () => {
	let buffer: Buffer;
	let file_contents: string = '';
	let sections: Array<string> = [];
	let location: string = '';
	let trainers: Array<string> = [];
	let location_index: number = 0;
	let trainers_index: number = 1;
	let trainer_lines: Array<string>;
	let trainer_name: string = '';
	let trainer_note: string = '';
	let trainer_pokemon: Array<string> | Array<Pokemon> = [];
	let results: Array<any> = [];

	try {
		buffer = fs.readFileSync(FILE_PATH);
		file_contents = buffer.toString();

		sections = file_contents.split(SECTION_DELIMITER).slice(1);

		for (
			location_index;
			location_index < sections.length - 1;
			location_index += 2
		) {
			location = sections[location_index];

			if (sections[trainers_index] !== undefined) {
				trainers = sections[trainers_index]
					.split(TRAINER_DELIMITER)
					.map(TRIM);
			}

			console.log('=================================');
			console.log(location_index);
			console.log(location);
			trainers.forEach(trainer => {
				trainer_lines = trainer.split(POKEMON_DELIMITER);

				trainer_name = trainer_lines[0].trim();

				if (
					!SKIP_LINES.includes(trainer_name) &&
					trainer_name !== '' &&
					trainer_lines.slice(1).length > 0
				) {
					trainer_pokemon = trainer_lines.slice(1);

					if (trainer_name.includes('(')) {
						trainer_note = trainer_name
							.split('(')[1]
							.replace(')', '');

						trainer_name = trainer_name.split('(')[0];
					}

					console.log('---');
					console.log('Name: ', trainer_name);
					console.log('Note: ', trainer_note);

					if (trainer_pokemon.length > 0) {
						trainer_pokemon = trainer_pokemon.filter(
							FILTER_POKEMON_LINES
						);

						trainer_pokemon = trainer_pokemon.map(
							(poke_string, index) => {
								// console.log(
								// 	trainerPokemonParser.parseTrainerPokemonToJson(
								// 		poke_string.trim().slice(1)
								// 	)
								// );

								console.log(
									`${trainers_index}:${index} - ${poke_string
										.trim()
										.slice(1)}`
								);

								return parsePokemonStringToJson(
									poke_string.trim().slice(1)
								);
							}
						);

						console.log('Pokemon: ', trainer_pokemon);
					}
				}

				results.push({
					location: location.trim(),
					name: trainer_name.trim(),
					notes: trainer_note.trim(),
					pokemon: trainer_pokemon,
				});
			});

			trainer_name = '';
			trainer_note = '';
			trainer_pokemon = [];
			trainer_lines = [];
			trainers_index += 2;
		}

		fs.writeFileSync(
			path.join(cwd(), 'trainers.json'),
			JSON.stringify({ trainers: results })
		);
	} catch (error) {
		console.error('Error: ', error);
		process.exit(1);
	}
};

main();
