import data from "../app/src/data.json";

const areaChanges = data.wildPokemon.areaChanges.changes;

const args = process.argv.slice(2);

if (args.length > 0) {
  const area = args.slice(0).join(" ");

  const index = areaChanges.findIndex(({ location }) => location === area);

  if (index < 0) {
    console.log("Area does not exist");
  }

  const encounters = areaChanges[index].encounters;

  for (let i = 0; i < encounters.length; i++) {
    const { type, odds } = encounters[i];

    let oddsString = "";

    for (let x = 0; x < odds.length; x++) {
      const odd = odds[x];

      oddsString += `${odd.pokemon} (${odd.change})`;

      if (odds.length - x > 1) {
        oddsString += ", ";
      }
    }

    console.log(`${type} - ${oddsString}`);
  }
}
