const doc = `Nosepass (Lv. 15) @ Smooth Rock     /   Modest      /   Sturdy          /   Stealth Rock, Sandstorm, Thunder Wave, Shock Wave
Bonsly (Lv. 15) @ Rindo Berry       /   Impish      /   Rock Head       /   Stealth Rock, Brick Break, Rollout, Defense Curl
Geodude (Lv. 15) @ Expert Belt      /   Adamant     /   Rock Head       /   Bulldoze, Rock Tomb, Fire Punch, Thunder Punch
Onix (Lv. 15) @ Muscle Band         /   Jolly       /   Rock Head       /   Stealth Rock, Rock Tomb, Bulldoze, Sandstorm
Larvitar (Lv. 15) @ Flame Orb       /   Jolly       /   Guts            /   Rock Tomb, Bulldoze, Bite, Protect
Cranidos (Lv. 16) @ Sitrus Berry    /   Hasty       /   Rock Head (!)   /   Zen Headbutt, Rock Tomb, Thunder Punch, Scary Face`;

const teamLines = doc.split("\n");

teamLines.forEach((line) => {
  const sections = line.split(/\s+\/\s+/);
  const pokeInfo = sections[0];

  const nature = sections[1];
  const ability = sections[2];
  const moveset = sections[3].split(", ");
  const pokemon = pokeInfo.match(/^\w+/)![0];
  const level = pokeInfo
    .match(/\(Lv. \d{2}\)/)![0]
    .split(". ")[1]
    .replace(")", "");
  const item = pokeInfo.match(/@\s[\w\s]*/)![0].match(/\s[\w\s]*/)![0];

  let moves = "";

  moveset.forEach((move) => (moves += `- ${move}\r`));

  console.log(
    [
      `${pokemon} @ ${item}`,
      `Level: ${level}`,
      `Ability: ${ability}`,
      `${nature} Nature`,
      `${moves}`,
    ].join("\n")
  );
});
