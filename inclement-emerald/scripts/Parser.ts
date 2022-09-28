import { EVs, Pokemon } from './util';
import MyMons from '../settings.json';

const LEVEL_CAP = MyMons.levelCap;

class TrainerPokemonParser {
	private NAME_REGEX = new RegExp(/^\w+(\s\(Alolan\))*/, 'g');
	private ITEM_REGEX = new RegExp(/\(I\)\s\w+(\s\w+)*/, 'g');
	private ABILITY_REGEX = new RegExp(/\(A\)\s\w+(\s\w+)*/, 'g');
	private NATURE_REGEX = new RegExp(/\(N\)\s\w+/, 'g');
	private LEVEL_REGEX = new RegExp(/lvl\s-*\d/, 'g');

	private getName(str: string): string | null {
		const results = this.NAME_REGEX.exec(str);

		if (results && results.length > 0) {
			let finalName = results[0];

			return finalName.includes('Alolan')
				? `${finalName.split(' ')[0]}-Alola`
				: finalName;
		}

		return null;
	}
	private getItem(str: string): string | null {
		const results = this.ITEM_REGEX.exec(str);

		return results && results.length > 0
			? results[0].replace('(I) ', '')
			: null;
	}
	private getAbility(str: string): string | null {
		const results = this.ABILITY_REGEX.exec(str);

		return results && results.length > 0
			? results[0].replace('(A) ', '')
			: null;
	}
	private getNature(str: string): string | null {
		const results = this.NATURE_REGEX.exec(str);

		return results && results.length > 0
			? results[0].replace('(N) ', '')
			: null;
	}
	private getMoves(str: string): Array<string> {
		return str.split(' // ')[1].split(', ') ?? [];
	}
	private getLevel(str: string): number {
		const results = this.LEVEL_REGEX.exec(str);

		if (results && results.length > 0) {
			let levelOffset = Number(
				results[0].split(' ')[1].replace('-', '')
			);

			return LEVEL_CAP - levelOffset;
		}

		return LEVEL_CAP;
	}

	public parseTrainerPokemonToJson(str: string): Pokemon {
		const pokemon = new Pokemon();

		console.log('==============================');
		console.log('Attempting to parse to JSON: ', str);

		pokemon.name = this.getName(str) ?? '';
		console.log('Name: ', this.getName(str));
		pokemon.level = this.getLevel(str);
		console.log('Level: ', this.getLevel(str));
		pokemon.item = this.getItem(str) ?? '';
		console.log('Item: ', this.getItem(str));
		pokemon.ability = this.getAbility(str) ?? '';
		console.log('Ability: ', this.getAbility(str));
		pokemon.nature = this.getNature(str) ?? '';
		console.log('Nature: ', this.getNature(str));
		this.getMoves(str).forEach(move => pokemon.addMove(move));

		console.log('==============================');
		return pokemon;
	}
	public parseTrainerPokemonToTxt(str: string): string {
		console.log('==============================');
		console.log('Attempting to parse to TXT: ', str);
		let pokemon = '\r\n';

		const name = this.getName(str);
		console.log('Name: ', this.getName(str));
		const item = this.getItem(str);
		console.log('Item: ', this.getItem(str));

		if (name !== null) {
			pokemon += `${name} @ ${item ?? ''}\r\n`;
		}

		const level = this.getLevel(str);
		console.log('Level: ', this.getLevel(str));
		if (level !== null) {
			pokemon += `Level: ${level}\r\n`;
		}

		const ability = this.getAbility(str);
		console.log('Ability: ', this.getAbility(str));
		if (ability !== null) {
			pokemon += `Ability: ${ability}\r\n`;
		}

		const nature = this.getNature(str);
		console.log('Nature: ', this.getNature(str));
		if (nature !== null) {
			pokemon += `Nature: ${nature}\r\n`;
		}

		const moves = this.getMoves(str);
		moves.forEach(move => (pokemon += `- ${move}\r\n`));

		console.log('==============================');
		return pokemon;
	}
}

export const trainerPokemonParser = new TrainerPokemonParser();

class BossPokemonParser {
	public parseBossPokemonToJson(rows: Array<string>): Array<Pokemon> {
		const pokemon: Pokemon[] = [];

		if (rows.length < 1) {
			return [];
		}

		const pokemonCount = rows[0].split(/\t/).length;

		for (let i = 0; i < pokemonCount; i++) {
			pokemon.push(new Pokemon());
		}

		console.log('==============================');
		console.log('Attempting to parse lines to JSON: ', rows);

		// ROWS LOOP
		for (let i = 0; i < rows.length; i++) {
			const columns = rows[i].split(/\t/);

			// COLUMNS LOOP
			for (let x = 0; x < columns.length; x++) {
				const pokemonToUpdate = pokemon[x];
				const value = columns[x].trim();

				switch (i) {
					// NAME ROW
					case 0:
						pokemonToUpdate.name = value;
						break;
					// LEVEL ROW
					case 1:
						if (value.includes('+1')) {
							pokemonToUpdate.level = LEVEL_CAP + 1;
						} else if (value.includes('+2')) {
							pokemonToUpdate.level = LEVEL_CAP + 2;
						} else if (value.includes('+3')) {
							pokemonToUpdate.level = LEVEL_CAP + 3;
						} else {
							pokemonToUpdate.level = LEVEL_CAP;
						}
						break;
					// IV ROW (SKIP)
					case 2:
						break;
					// EV ROW
					case 3:
						const rawEvs = value.split('/').map(x => Number(x));
						pokemonToUpdate.evs = new EVs(
							rawEvs[0],
							rawEvs[1],
							rawEvs[2],
							rawEvs[3],
							rawEvs[4],
							rawEvs[5]
						);
						break;
					// NATURE ROW
					case 4:
						pokemonToUpdate.nature = value;
						break;
					// ITEM ROW
					case 5:
						if (value === 'None') {
							break;
						}
						pokemonToUpdate.item = value;
						break;
					// ABILITY ROW
					case 6:
						pokemonToUpdate.ability = value;
						break;
					// MOVE ROWS
					default:
						pokemonToUpdate.addMove(value);
						break;
				}
			}
		}

		console.log('==============================');
		return pokemon;
	}
	public parseBossPokemonToTxt(rows: Array<string>): string {
		let pokemon = '\r\n';
		let pokemonList: Array<string> = [];
		console.log('==============================');
		console.log('Attempting to parse lines to TXT: ', rows);

		if (rows.length < 1) {
			return pokemon;
		}

		const pokemonCount = rows[0].split(/\t/).length;

		for (let i = 0; i < pokemonCount; i++) {
			pokemonList.push('');
		}

		// ROWS LOOP
		for (let i = 0; i < rows.length; i++) {
			const columns = rows[i].split(/\t/);

			// COLUMNS LOOP
			for (let x = 0; x < columns.length; x++) {
				let value = columns[x].trim();

				let correspondingItemValue: string;

				switch (i) {
					// NAME ROW
					case 0:
						correspondingItemValue = rows[5].split(/\t/)[x];
						pokemonList[
							x
						] += `${value} @ ${correspondingItemValue}\r\n`;
						break;
					// LEVEL ROW
					case 1:
						if (value.includes('+1')) {
							pokemonList[x] += `Level: ${LEVEL_CAP + 1}\r\n`;
						} else if (value.includes('+2')) {
							pokemonList[x] += `Level: ${LEVEL_CAP + 2}\r\n`;
						} else if (value.includes('+3')) {
							pokemonList[x] += `Level: ${LEVEL_CAP + 3}\r\n`;
						} else if (value.includes('-1')) {
							pokemonList[x] += `Level: ${LEVEL_CAP - 1}\r\n`;
						} else if (value.includes('-2')) {
							pokemonList[x] += `Level: ${LEVEL_CAP - 2}\r\n`;
						} else if (value.includes('-3')) {
							pokemonList[x] += `Level: ${LEVEL_CAP - 3}\r\n`;
						} else {
							pokemonList[x] += `Level: ${LEVEL_CAP}\r\n`;
						}
						break;
					// IV ROW (SKIP: ALWAYS ASSUME 31 ACROSS THE BOARD)
					case 2:
						break;
					// EV ROW
					case 3:
						const rawEvs = value.split('/');
						pokemonList[
							x
						] += `EVs: ${rawEvs[0]} Hp / ${rawEvs[1]} Atk / ${rawEvs[2]} Def / ${rawEvs[3]} SpA / ${rawEvs[4]} SpD / ${rawEvs[5]} Spe\r\n`;
						break;
					// NATURE ROW
					case 4:
						pokemonList[x] += `${value} Nature\r\n`;
						break;
					// ITEM ROW (SKIP: HANDLED IN NAME ROW)
					case 5:
						break;
					// ABILITY ROW
					case 6:
						pokemonList[x] += `Ability: ${value}\r\n`;
						break;
					// MOVE ROWS
					default:
						if (value.toLowerCase() === 'u-turn') {
							value = 'U-turn';
						}

						pokemonList[x] += `- ${value}\r\n`;
						break;
				}
			}
		}

		console.log('==============================');

		return (pokemon += pokemonList.join('\r\n'));
	}
}

export const bossPokemonParser = new BossPokemonParser();
