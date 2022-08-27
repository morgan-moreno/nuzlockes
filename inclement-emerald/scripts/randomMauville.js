const options = {
  grass: [
    "Bulbasaur",
    "Chikorita",
    "Treecko",
    "Turtwig",
    "Snivy",
    "Chespin",
    "Rowlet",
  ],
  fire: [
    "Charmander",
    "Cyndaquil",
    "Torchic",
    "Chimchar",
    "Tepig",
    "Fennekin",
    "Litten",
  ],
  water: [
    "Squirtle",
    "Totodile",
    "Mudkip",
    "Piplup",
    "Oshawott",
    "Froakie",
    "Popplio",
  ],
  other: [
    "Porygon",
    "Munchlax",
    "Vulpix",
    "Sandshrew",
    "Grimer",
    "Diglett",
    "Geodude",
    "Raichu",
    "Marowak",
    "Exeggutor",
  ],
};

const grass = options.grass;
const fire = options.fire;
const water = options.water;
const other = options.other;

let randomIndex;

// Get Grass Option
randomIndex = Math.floor(Math.random() * grass.length);
console.log(`Grass: ${grass[randomIndex]}`);

// Get Fire Option
randomIndex = Math.floor(Math.random() * fire.length);
console.log(`Fire: ${fire[randomIndex]}`);

// Get Water Option
randomIndex = Math.floor(Math.random() * water.length);
console.log(`Water: ${water[randomIndex]}`);

// Get Other Option
randomIndex = Math.floor(Math.random() * other.length);
console.log(`Other: ${other[randomIndex]}`);
