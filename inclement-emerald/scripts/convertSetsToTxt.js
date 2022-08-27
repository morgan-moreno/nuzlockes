const fs = require("fs");
const args = process.argv.slice(2);

if (!args.length > 0) {
  console.log(
    "Missing Parameter - route_name: $ yarn convert-sets <route_name>"
  );
}

let text = "";
const route_name = args[0];

if (route_name === "my-mons") {
  const mons = require("../my-mons.json");

  const pokemons = mons.alive;

  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];

    text += `${pokemon.name} @ ${pokemon.item}\r\n`;
    text += `Level: ${pokemon.level}\r\n`;
    text += `IVs: ${pokemon.ivs.hp} HP / ${pokemon.ivs.atk} Atk / ${pokemon.ivs.def} Def / ${pokemon.ivs.spa} SpA / ${pokemon.ivs.spd} SpD / ${pokemon.ivs.spe} Spe\r\n`;
    text += `EVs: ${pokemon.evs.hp} HP / ${pokemon.evs.atk} Atk / ${pokemon.evs.def} Def / ${pokemon.evs.spa} SpA / ${pokemon.evs.spd} SpD / ${pokemon.evs.spe} Spe\r\n`;
    text += `Ability: ${pokemon.ability}\r\n`;
    text += `${pokemon.nature} Nature\r\n`;

    for (let x = 0; x < pokemon.moves.length; x++) {
      const move = pokemon.moves[x];

      text += `- ${move}\r\n`;
    }

    text += "\r\n";
  }
} else {
  const route = require(`../routes/${route_name}.json`);

  const trainers = route.trainers;
  const bosses = route.bosses;

  text += `${route_name.toUpperCase()}\r\n\r\n`;
  if (trainers && trainers.length > 0) {
    for (let i = 0; i < trainers.length; i++) {
      const trainer = trainers[i];

      let trainerText = "";

      trainerText += "===\r\n";
      trainerText += `${trainer.name}\r\n`;
      trainerText += "===\r\n\r\n";

      for (let x = 0; x < trainer.pokemon.length; x++) {
        const pokemon = trainer.pokemon[x];

        let pokemonText = "";

        pokemonText += `${pokemon.name} @ ${pokemon.item}\r\n`;
        pokemonText += `Level: ${pokemon.level}\r\n`;
        if (pokemon.evs && pokemon.evs.length > 0) {
          pokemonText += pokemon.evs;
        }
        if (pokemon.ability.length > 0) {
          pokemonText += `Ability: ${pokemon.ability}\r\n`;
        }
        if (pokemon.nature.length > 0) {
          pokemonText += `${pokemon.nature} Nature`;
        }

        for (let z = 0; z < pokemon.moves.length; z++) {
          const move = pokemon.moves[z];

          pokemonText += `- ${move}\r\n`;
        }

        pokemonText += "\r\n";
        trainerText += pokemonText;
      }

      trainerText += "\r\n";

      text += trainerText;
    }
  }

  if (bosses && bosses.length > 0) {
    for (let i = 0; i < bosses.length; i++) {
      const boss = bosses[i];

      let bossText = "";

      bossText += `===\r\n${boss.name}\r\n`;
      for (let x = 0; x < boss.pokemon.length; x++) {
        const pokemon = boss.pokemon[x];

        bossText += `${pokemon.name} @ ${pokemon.item}\r\n`;
        bossText += `Level: ${pokemon.level}\r\n`;
        if (pokemon.evs.length > 0) {
          bossText += `EVs: ${pokemon.evs}\r\n`;
        }
        if (pokemon.ability.length > 0) {
          bossText += `Ability: ${pokemon.ability}\r\n`;
        }
        if (pokemon.nature.length > 0) {
          bossText += `${pokemon.nature} Nature\r\n`;
        }

        for (let z = 0; z < pokemon.moves.length; z++) {
          const move = pokemon.moves[z];

          bossText += `- ${move}\r\n`;
        }
        bossText += "\r\n";
      }

      bossText += "\r\n";
      text += bossText;
    }
  }
}

fs.writeFile(`sets/${route_name}.txt`, text, (error) => {
  if (error) {
    console.error("Error writing to file: ", error);
    process.exit(1);
  } else {
    console.log("Successfully wrote to file");
    process.exit(0);
  }
});
