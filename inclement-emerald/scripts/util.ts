import fs from "fs";
import path from "path";
import { cwd } from "process";

interface Attempt {
  gameName: string;
  attemptNumber: number;
  levelCap: number;
  alive: Array<Pokemon>;
  deaths: Array<string>;
}

export const getAttempt = (): Attempt => {
  const data = fs.readFileSync(path.join(cwd(), "my-mons.json"), "utf-8");

  return JSON.parse(data);
};

export const saveAttempt = (attempt: Attempt) => {
  fs.writeFile(
    path.join(cwd(), "my-mons.json"),
    JSON.stringify(attempt),
    (err) => {
      if (err) {
        console.log(`Error saving to file: my-mons.json`, err);
        process.exit(1);
      } else {
        console.log("File saved successfully");
      }
    }
  );
};

export class Trainer {
  name: string;
  pokemon: Array<Pokemon>;

  constructor(name: string, pokemon: Array<Pokemon>) {
    this.name = name;
    this.pokemon = pokemon ?? [];
  }

  addPokemon(pokemon: Pokemon) {
    this.pokemon.push(pokemon);
  }
}
export class EVs {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
  constructor(
    hp: number,
    atk: number,
    def: number,
    spa: number,
    spd: number,
    spe: number
  ) {
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.spa = spa;
    this.spd = spd;
    this.spe = spe;
  }
}
export class Pokemon {
  name: string;
  level: number;
  ability: string;
  evs: EVs;
  nature: string;
  item: string;
  moves: Array<string>;

  constructor() {
    this.name = "";
    this.level = 0;
    this.ability = "";
    this.evs = new EVs(0, 0, 0, 0, 0, 0);
    this.nature = "";
    this.item = "";
    this.moves = [];
  }

  addMove(move: string) {
    this.moves.push(move);
  }
}
export class Encounter {
  pokemon: string;
  chance: number;

  constructor(name?: string) {
    this.pokemon = name ?? "";
    this.chance = 0;
  }

  setPokemon(pokemon: string) {
    this.pokemon = pokemon;
  }
  setChance(chance: number) {
    this.chance = chance;
  }
}
