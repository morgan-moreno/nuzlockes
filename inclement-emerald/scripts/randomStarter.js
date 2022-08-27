const regions = [
  "Kanto",
  "Johto",
  "Hoenn",
  "Sinnoh",
  "Unova",
  "Kalos",
  "Alola",
];

const starters = {
  Alola: ["Rowlet", "Litten", "Popplio"],
  Kalos: ["Chespin", "Fennekin", "Froakie"],
  Unova: ["Snivy", "Tepig", "Oshawott"],
  Sinnoh: ["Turtwig", "Chimchar", "Piplup"],
  Hoenn: ["Treecko", "Torchic", "Mudkip"],
  Johto: ["Chikorita", "Cyndiquil", "Totodile"],
  Kanto: ["Bulbasaur", "Charmander", "Squirtle"],
};

const regionIndex = Math.floor(Math.random() * regions.length);

// Get the region name
const region = regions[regionIndex];

// Get the starters available in the region
const starterOptions = starters[region];

// Get a random starter from the options
const starterIndex = Math.floor(Math.random() * starterOptions.length);
const starter = starterOptions[starterIndex];

console.log("Region: ", region);
console.log("Starter: ", starter);
