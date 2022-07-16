import { MainClient } from "pokenode-ts";
import { subMilliseconds } from "date-fns";

const API = new MainClient();

function main() {
  /**
   * $ yarn random
   *
   *    - between x y
   *    - egg
   *
   */
  const start = new Date();

  function getRandom(cb?: VoidFunction) {
    const min = Number(args[1]);
    const max = Number(args[2]);

    console.log(Math.ceil(Math.random() * (max - min) + min));
    cb?.();
  }
  async function getRandomPokemon(cb?: VoidFunction) {
    const min = 1;
    const max = 494;
    const id = Math.floor(Math.random() * (max - min) + min);

    const data = await API.pokemon.getPokemonById(id);

    console.log("Pokemon: ", data.name);
    cb?.();
  }
  function getShiny(cb?: VoidFunction) {
    const PRAYCE = 4;

    const shiny = Math.floor(Math.random() * (1000 - 1) + 1) === PRAYCE;

    console.log("Shiny: ", shiny);
    cb?.();
  }
  function exitSuccess() {
    const end = new Date();

    console.log(
      `Process: ${subMilliseconds(
        end,
        start.getMilliseconds()
      ).getMilliseconds()}ms`
    );
    process.exit(0);
  }

  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error("No args: <flag> <...variables>");
    process.exit(1);
  }

  const flag = args[0];

  switch (flag) {
    case "between":
      getRandom(exitSuccess);
    case "egg":
      getRandomPokemon(function () {
        return getShiny(exitSuccess);
      });
  }
}

main();
