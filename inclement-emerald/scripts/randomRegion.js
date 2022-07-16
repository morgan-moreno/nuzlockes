const regions = [
  "Kanto",
  "Johto",
  "Hoenn",
  "Sinnoh",
  "Unova",
  "Kalos",
  "Alola",
];

const index = Math.floor(Math.random() * regions.length);

const region = regions[index];

console.log("Region: ", region);
