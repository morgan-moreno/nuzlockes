import { getAttempt, Pokemon, saveAttempt } from "./util";
import { capitalize } from "lodash";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Invalid usage: $ yarn add-death <name> <cause>");
  process.exit(1);
}

const nameOfDeath = args[0];
const reasonOfDeath = args.slice(1).join(" ");

const main = (): void => {
  // Import file contents
  const attempt = getAttempt();
  const aliveCopy = Array.from<Pokemon>(attempt.alive);
  const deathsCopy = Array.from<string>(attempt.deaths);
  const level = attempt.levelCap;

  // Try to find pokemon name
  let index = aliveCopy.findIndex(
    (pokemon) => pokemon.name.toLowerCase() === nameOfDeath
  );

  if (index !== -1) {
    // Remove pokemon from the list of alive pokemon
    aliveCopy.splice(index, 1);
    attempt.alive = aliveCopy;

    // Add name, level cap, and reason of death to the list of deaths
    deathsCopy.push(`${capitalize(nameOfDeath)} / ${level} / ${reasonOfDeath}`);
    attempt.deaths = deathsCopy;

    // Write the changes back into the file
    saveAttempt(attempt);
  } else {
    console.error(`Pokemon ${nameOfDeath} not found in alive mons`);
    process.exit(1);
  }
};

main();
