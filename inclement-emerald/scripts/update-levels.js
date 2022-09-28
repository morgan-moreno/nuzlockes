const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

const args = process.argv.slice(2);
const FILE_PATH = path.join(cwd(), 'settings.json');

if (!(args.length > 0)) {
	console.error('Invalid usage: $ yarn update-levels <new-level>');
	process.exit(1);
}

try {
	const newLevel = args[0];
	const mons = fs.readFileSync(FILE_PATH, 'utf-8');
	const data = JSON.parse(mons);

	data.levelCap = Number(newLevel);

	fs.writeFileSync(FILE_PATH, JSON.stringify(data));
} catch (error) {
	console.error('Error reading/writing file: ', error);
	process.exit(1);
}
