import { EVs } from './util';

const NAME_REGEX = new RegExp(/^\w+(\s\(Alolan\))*/, 'g');
const ITEM_REGEX = new RegExp(/\(I\)\s\w+(\s\w+)*/, 'g');
const ABILITY_REGEX = new RegExp(/\(A\)\s\w+(\s\w+)*/, 'g');
const NATURE_REGEX = new RegExp(/\(N\)\s\w+/, 'g');
const LEVEL_REGEX = new RegExp(/lvl\s-*\d/, 'g');

export class Pokemon {
	name: string;
	level: string;
	ability: string;
	evs: EVs;
	nature: string;
	item: string;
	moves: Array<string>;

	constructor() {
		this.name = '';
		this.level = '';
		this.ability = '';
		this.evs = new EVs(0, 0, 0, 0, 0, 0);
		this.nature = '';
		this.item = '';
		this.moves = [];
	}
}

export function getName(str: string): string {
	const results = str.match(NAME_REGEX);

	if (results && results.length > 0) {
		let finalName = results[0];

		return finalName.includes('Alolan')
			? `${finalName.split(' ')[0]}-Alola`
			: finalName;
	}

	return '';
}
export function getItem(str: string): string {
	const results = ITEM_REGEX.exec(str);

	return results && results.length > 0
		? results[0].replace('(I) ', '')
		: '';
}
export function getAbility(str: string): string {
	const results = ABILITY_REGEX.exec(str);

	return results && results.length > 0
		? results[0].replace('(A) ', '')
		: '';
}
export function getNature(str: string): string {
	const results = NATURE_REGEX.exec(str);

	return results && results.length > 0
		? results[0].replace('(N) ', '')
		: '';
}
export function getMoves(str: string): Array<string> {
	return str.split(' // ')[1].split(', ') ?? [];
}
export function getLevel(str: string): string {
	const results = str.match(LEVEL_REGEX);

	return results && results.length > 0
		? results[0].split(' ')[1]
		: '0';
}

export function parsePokemonStringToJson(str: string): Pokemon {
	const pokemon = new Pokemon();

	pokemon.name = getName(str);
	pokemon.item = getItem(str);
	pokemon.ability = getAbility(str);
	pokemon.nature = getNature(str);
	pokemon.moves = getMoves(str);
	pokemon.level = getLevel(str);

	return pokemon;
}
