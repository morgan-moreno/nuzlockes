import {
  DocumentationSection,
  PokemonChange,
  SpecificPokemonChange,
} from "./types";
import { getFileSections } from "../files";

const FILE_NAME = "PokemonChanges";

interface CreatePokemonChangesDocumentation {
  generalChanges: DocumentationSection<PokemonChange>;
  heldItemExceptions: DocumentationSection<PokemonChange>;
  otherChanges: DocumentationSection<PokemonChange>;
  customChanges: DocumentationSection<PokemonChange>;
  specificChanges: DocumentationSection<SpecificPokemonChange>;
}

export class PokemonChangesDocumentation {
  generalChanges: DocumentationSection<PokemonChange>;
  heldItemExceptions: DocumentationSection<PokemonChange>;
  otherChanges: DocumentationSection<PokemonChange>;
  customChanges: DocumentationSection<PokemonChange>;
  specificChanges: DocumentationSection<SpecificPokemonChange>;
  constructor({
    generalChanges,
    heldItemExceptions,
    otherChanges,
    customChanges,
    specificChanges,
  }: CreatePokemonChangesDocumentation) {
    this.generalChanges = generalChanges;
    this.heldItemExceptions = heldItemExceptions;
    this.otherChanges = otherChanges;
    this.customChanges = customChanges;
    this.specificChanges = specificChanges;
  }
}

export const getPokemonChanges = () => {
  const sections = getFileSections(FILE_NAME);

  let noteLines: string[] = [];
  let changeLines: string[] = [];

  const ABILITY = /(Ability:|Ability\s\(Complete\):)\n[\w\s\/]+\n/;
  const TYPE = /Type\s\(Complete\):\n[\w\s\/]+\n/;
  const BASE_STATS = /Base\sStats\s\(Complete\):\n[\w\s\d\/]*\n/;
  const MOVES = /Moves:\n[\w\(\)\!\.\s\,]*\n/;
  const EVOLUTION = /Evolution:\n[\s\w\d\'\.]*\n/;
  const LEVEL_UP = /Level\sUp:\n[\d\w\s\-\(\!\)]*\n/;
  const MULTIPLE_SPACES = /\s{2,}/;

  const generalChanges = new DocumentationSection<PokemonChange>(sections[0]);
  noteLines = sections[1].split("\n");
  noteLines.forEach((line) => {
    if (line.trim() !== "") {
      generalChanges.addChange(new PokemonChange(line.slice(2)));
    }
  });

  const heldItemExceptions = new DocumentationSection<PokemonChange>(
    sections[2]
  );
  noteLines = sections[3].split("\n");
  noteLines.forEach((line) => {
    if (line.trim() !== "") {
      heldItemExceptions.addChange(new PokemonChange(line.slice(2)));
    }
  });

  const otherChanges = new DocumentationSection<PokemonChange>(sections[4]);
  noteLines = sections[5].split("\n");
  noteLines.forEach((line) => {
    if (line.trim() !== "") {
      otherChanges.addChange(new PokemonChange(line.slice(2)));
    }
  });

  const customChanges = new DocumentationSection<PokemonChange>(sections[6]);
  noteLines = sections[7].split("\n");
  noteLines.forEach((line) => {
    if (line.trim() !== "") {
      customChanges.addChange(new PokemonChange(line));
    }
  });

  const specificChanges = new DocumentationSection<SpecificPokemonChange>(
    sections[8]
  );
  const specificChangeSections = sections[9].split("===================");
  specificChangeSections.splice(0, 1);

  let nameCounter = 0;
  let changeLinesCounter = nameCounter + 1;
  for (
    nameCounter = nameCounter;
    nameCounter < specificChangeSections.length;
    nameCounter += 2
  ) {
    const nameLine = specificChangeSections[nameCounter];
    changeLines = specificChangeSections[changeLinesCounter]
      .split("\n")
      .map((line) => line.trim());

    const id = nameLine.split(" - ")[0].trim();
    const name = nameLine.split(" - ")[1].trim();
    const levelUpMoves: SpecificPokemonChange["levelUpMoves"] = [];
    let oldAbility: SpecificPokemonChange["oldAbility"] = "";
    let newAbility: SpecificPokemonChange["newAbility"] = "";
    let oldType: SpecificPokemonChange["oldType"] = "";
    let newType: SpecificPokemonChange["newType"] = "";
    let moves: SpecificPokemonChange["moves"] = [];
    let oldBaseStats: SpecificPokemonChange["oldBaseStats"];
    let newBaseStats: SpecificPokemonChange["newBaseStats"];
    let evolution: SpecificPokemonChange["evolution"] = [];

    const lines = changeLines.join("\n");

    const ability = lines.match(ABILITY);
    const type = lines.match(TYPE);
    const moveExists = lines.match(MOVES);
    const baseStats = lines.match(BASE_STATS);
    const evolutionExists = lines.match(EVOLUTION);
    const levelUp = lines.match(LEVEL_UP);

    if (ability && ability.length > 0) {
      const abilityChanges = ability[0].split("\n");

      oldAbility = abilityChanges[1].split(MULTIPLE_SPACES)[1];
      newAbility = abilityChanges[2].split(MULTIPLE_SPACES)[1];
    }
    if (type && type.length > 0) {
      const typeChanges = type[0].split("\n");

      oldType = typeChanges[1].split(MULTIPLE_SPACES)[1];
      newType = typeChanges[2].split(MULTIPLE_SPACES)[1];
    }
    if (moveExists && moveExists.length > 0) {
      const moveChanges = moveExists[0].split("\n").slice(1);

      for (let i = 0; i < moveChanges.length; i++) {
        moveChanges[i] !== "" ? moves.push(moveChanges[i]) : null;
      }
    }
    if (baseStats && baseStats.length > 0) {
      const baseStatChanges = baseStats[0].split("\n");

      const rawOldBaseStats = baseStatChanges[1]
        .split(MULTIPLE_SPACES)[1]
        .split(" / ");
      const rawNewBaseStats = baseStatChanges[2]
        .split(MULTIPLE_SPACES)[1]
        .split(" / ");

      oldBaseStats = {
        hp: Number(rawOldBaseStats[0].split(" ")[0]),
        atk: Number(rawOldBaseStats[1].split(" ")[0]),
        def: Number(rawOldBaseStats[2].split(" ")[0]),
        spa: Number(rawOldBaseStats[3].split(" ")[0]),
        spd: Number(rawOldBaseStats[4].split(" ")[0]),
        spe: Number(rawOldBaseStats[5].split(" ")[0]),
      };

      newBaseStats = {
        hp: Number(rawNewBaseStats[0].split(" ")[0]),
        atk: Number(rawNewBaseStats[1].split(" ")[0]),
        def: Number(rawNewBaseStats[2].split(" ")[0]),
        spa: Number(rawNewBaseStats[3].split(" ")[0]),
        spd: Number(rawNewBaseStats[4].split(" ")[0]),
        spe: Number(rawNewBaseStats[5].split(" ")[0]),
      };
    }
    if (evolutionExists && evolutionExists.length > 0) {
      const evolutionChanges = evolutionExists[0].split("\n").slice(1);

      for (let i = 0; i < evolutionChanges.length; i++) {
        evolution.push(evolutionChanges[i]);
      }
    }

    if (levelUp && levelUp.length > 0) {
      const levelUpChanges = levelUp[0].split("\n").slice(1);

      for (let i = 0; i < levelUpChanges.length; i++) {
        const change = levelUpChanges[i];

        if (change.trim() !== "") {
          const level = Number(change.split(" - ")[0]);
          const move = change
            .split(" - ")[1]
            .replace("(!!)", "")
            .replace("(!)", "");

          levelUpMoves.push({ level, move });
        }
      }
    }

    const pokemon = new SpecificPokemonChange({
      id,
      pokemon: name,
      levelUpMoves,
      oldAbility,
      newAbility,
      oldBaseStats,
      newBaseStats,
      newType,
      oldType,
      moves,
      evolution,
    });

    specificChanges.addChange(pokemon);
    changeLinesCounter += 2;
  }

  return new PokemonChangesDocumentation({
    generalChanges,
    heldItemExceptions,
    otherChanges,
    customChanges,
    specificChanges,
  });
};
