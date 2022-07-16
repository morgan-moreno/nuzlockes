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
    "Rattata",
    "Meowth",
    "Grimer",
    "Diglett",
    "Geodude",
    "Raichu",
    "Marowak",
    "Exeggutor",
  ],
};

var args = process.argv.slice(2);

if (args) {
  const type = args[0];

  if (!Object.keys(options).includes(type)) {
    console.log("Invalid Type: water, fire, grass, other");
    process.exit(1);
  }

  const starterIndex = Math.floor(Math.random() * options[type].length);

  const starter = options[type][starterIndex];

  console.log("Starter: ", starter);
  process.exit(0);
} else {
  const types = Object.keys(options);

  const type = types[Math.floor(Math.random() * types.length)];

  const starterIndex = Math.floor(Math.random() * options[type].length);

  const starter = options[type][starterIndex];

  console.log("Starter: ", starter);
  process.exit(0);
}
