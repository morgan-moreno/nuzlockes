const STARTERS: { [key: string]: Array<string> } = {
	Kanto: ['Charmander', 'Bulbasaur', 'Squirtle'],
	Johto: ['Cyndaquil', 'Chikorita', 'Totodile'],
	Hoenn: ['Torchic', 'Treeko', 'Mudkip'],
	Sinnoh: ['Chimchar', 'Turtwig', 'Piplup'],
	Unova: ['Tepig', 'Snivy', 'Oshawott'],
	Kalos: ['Fennekin', 'Chespin', 'Froakie'],
	Alola: ['Litten', 'Rowlett', 'Popplio'],
};

const REGIONS: Array<string> = [
	'Kanto',
	'Johto',
	'Hoenn',
	'Sinnoh',
	'Unova',
	'Kalos',
	'Alola',
];

const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];

const starter =
	STARTERS[region][
		Math.floor(Math.random() * STARTERS[region].length)
	];

console.log('Region: ', region);
console.log('Starter: ', starter);
