import { getEvolutionChanges } from "./getEvolutionChanges";
import { getItemChanges } from "./getItemChanges";
import { getMoveChanges } from "./getMoveChanges";
import { getNpcChanges } from "./getNpcChanges";
import { getPokemonChanges } from "./getPokemonChanges";
import { getTradeChanges } from "./getTradeChanges";
import { getTrainerPokemon } from "./getTrainerPokemon";
import { getTypeChanges } from "./getTypeChanges";
import { getWildPokemon } from "./getWildPokemon";

export const getData = () => {
  const evolutionChanges = getEvolutionChanges();
  const itemChanges = getItemChanges();
  const moveChanges = getMoveChanges();
  const npcChanges = getNpcChanges();
  const pokemonChanges = getPokemonChanges();
  const tradeChanges = getTradeChanges();
  const trainerPokemon = getTrainerPokemon();
  const typeChanges = getTypeChanges();
  const wildPokemon = getWildPokemon();

  return {
    evolutionChanges,
    itemChanges,
    moveChanges,
    npcChanges,
    pokemonChanges,
    tradeChanges,
    trainerPokemon,
    typeChanges,
    wildPokemon,
  };
};
