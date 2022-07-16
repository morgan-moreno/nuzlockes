import {
  DocumentationSection,
  Trainer,
  PokemonSet,
  BossPokemonSet,
  TrainerPokemonAreaChange,
  RegularTrainer,
  Boss,
  Rematch,
} from "./types";
import { getFileSections } from "../files";
import { REGEX_MULTIPLE_SPACES } from "../constants";

const FILE_NAME = "TrainerPokemon";
const BLACK_LIST = ["Rematches", ""];
const BOSS_NAMES = {
  "PKMN Trainer Barry": /PKMN\sTrainer\sBarry\n[\w\(\)\.@\s\/\,]+/,
  "PKMN Trainer Steven": /PKMN\sTrainer\sSteven\n[\w\(\)\.@\s\/\,]+/,
  "PKMN Trainer Cheryl": /PKMN\sTrainer\sCheryl\n[\w\(\)\.@\s\/\,]+/,
  "PKMN Trainer Dawn": /PKMN\sTrainer\sDawn\n[\w\(\)\.@\s\/\,]+/,
  "PKMN Trainer Lucas": /PKMN\sTrainer\sLucas\n[\w\(\)\.@\s\/\,]+/,
  "PKMN Trainer Mira": /PKMN\sTrainer\sMira\n[\w\(\)\.@\s\/\,]+/,
  "PKMN Trainer Riley": /PKMN\sTrainer\sRiley\n[\w\(\)\.@\s\/\,]+/,
  "PKMN Trainer Marley": /PKMN\sTrainer\sMarley\n[\w\(\)\.@\s\/\,]+/,
  "PKMN Trainer Buck": /PKMN\sTrainer\sBuck\n[\w\(\)\.@\s\/\,]+/,

  "Leader Roark": /Leader\sRoark\n[\w\(\)\.@\s\/\,]+/,
  "Leader Gardenia": /Leader\sGardenia\n[\w\(\)\.@\s\/\,]+/,
  "Leader Fantina": /Leader\sFantina\n[\w\(\)\.@\s\/\,]+/,
  "Leader Maylene": /Leader\sMaylene\n[\w\(\)\.@\s\/\,]+/,
  "Leader Wake": /Leader\sWake\n[\w\(\)\.@\s\/\,]+/,
  "Leader Byron": /Leader\sByron\n[\w\(\)\.@\s\/\,]+/,
  "Leader Candice": /Leader\sCandice\n[\w\(\)\.@\s\/\,]+/,
  "Leader Volkner": /Leader\sVolkner\n[\w\(\)\.@\s\/\,]+/,

  "Commander Mars": /Commander\sMars\n[\w\(\)\.@\s\/\,]+/,
  "Commander Jupiter": /Commander\sJupiter\n[\w\(\)\.@\s\/\,]+/,
  "Commander Saturn": /Commander\sSaturn\n[\w\(\)\.@\s\/\,]+/,
  "Galactic Boss Cyrus": /Galactic\sBoss\sCyrus\n[\w\(\)\.@\s\/\,]+/,

  "Gentleman Backlot": /Gentleman\sBacklot\n[\w\(\)\.@\s\/\,]+/,
  "Castle Valet Darach": /Castle\sValet\sDarach\n[\w\(\)\.@\s\/\,]+/,
  "Arcade Star Dahlia": /Arcade\sStar\Dahlia\n[\w\(\)\.@\s\/\,]+/,
  "Ace Trainer Heather": /Ace\sTrainer\sHeather\n[\w\(\)\.@\s\/\,]+/,
  "Ace Trainer Wyver": /Ace\sTrainer\sWyver\n[\w\(\)\.@\s\/\,]+/,
  "Ace Trainer Slythe": /Ace\sTrainer\sSlythe\n[\w\(\)\.@\s\/\,]+/,
  "Ace Trainer Shade": /Ace\sTrainer\sShade\n[\w\(\)\.@\s\/\,]+/,
  "Ace Trainer Gene": /Ace\sTrainer\sGene\n[\w\(\)\.@\s\/\,]+/,
  "Ace Trainer Luna": /Ace\sTrainer\Luna\n[\w\(\)\.@\s\/\,]+/,

  "Elite Four Aaron": /Elite\sFour\sAaron\n[\w\(\)\.@\s\/\,]+/,
  "Elite Four Bertha": /Elite\sFour\sBertha\n[\w\(\)\.@\s\/\,]+/,
  "Elite Four Flint": /Elite\sFour\sFlint\n[\w\(\)\.@\s\/\,]+/,
  "Elite Four Lucian": /Elite\sFour\sLucian\n[\w\(\)\.@\s\/\,]+/,
  "Champion Cynthia": /Champion\sCynthia\n[\w\(\)\.@\s\/\,]+/,
};
const bossNames = Object.keys(BOSS_NAMES);

interface CreateTrainerPokemonDocumentation {
  generalChanges: DocumentationSection<any>;
  areaChanges: DocumentationSection<TrainerPokemonAreaChange>;
}

class TrainerPokemonDocumentation {
  generalChanges: DocumentationSection<any>;
  areaChanges: DocumentationSection<TrainerPokemonAreaChange>;

  constructor({
    generalChanges,
    areaChanges,
  }: CreateTrainerPokemonDocumentation) {
    this.generalChanges = generalChanges;
    this.areaChanges = areaChanges;
  }
}

export const getTrainerPokemon = () => {
  const sections = getFileSections(FILE_NAME, "$$$");

  const generalChanges = new DocumentationSection<any>(sections[0]);
  const generalChangeLines = sections[1].split("\n");

  generalChangeLines.forEach((line) => {
    if (line.trim() !== "") {
      generalChanges.addNote(line);
    }
  });

  const areaChanges = new DocumentationSection<TrainerPokemonAreaChange>(
    sections[2]
  );
  const areaChangeSections = sections[3].split(
    "================================================================================================================================================="
  );

  let location = areaChangeSections[0].trim();

  for (let i = 1; i < areaChangeSections.length; i++) {
    const section = areaChangeSections[i];
    console.log(section);
    const sectionLinesForLocation = section.trim().split("\n");
    const sectionLines = sectionLinesForLocation.slice(0, -1);

    const areaChange = new TrainerPokemonAreaChange(location);

    let x = 0;

    while (x < sectionLines.length) {
      const line = sectionLines[x].trim();
      let name: string;
      let trainer: RegularTrainer;
      let boss: Boss;
      let nextLine: string;
      let y = 1;

      if (line === "") {
        x++;
        continue;
      } else if (line === "With Rock Climb") {
        // With Rock Climb (optional per section) - addBlockedTrainer
        while (true) {
          nextLine = sectionLines[x + y].trim();

          if (nextLine === "") {
            x = x + y;
            y = 1;
            break;
          } else {
            name = nextLine.split(REGEX_MULTIPLE_SPACES)[0];
            trainer = new Trainer<PokemonSet>({ name });

            nextLine
              .split(REGEX_MULTIPLE_SPACES)[1]
              .split(", ")
              .forEach((set) => {
                trainer.addPokemon(
                  new PokemonSet({
                    name: set.split(" Lv. ")[0],
                    level: Number(set.split(" Lv. ")[1]),
                  })
                );
              });

            areaChange.addBlockedTrainer(trainer);
          }

          y++;
        }
      } else if (line === "Rematches") {
        // Rematches (optional per section) - addRematch'
        while (true) {
          nextLine = sectionLines[x + y].trim();

          if (nextLine === "") {
            x = x + y;
            y = 1;
            break;
          } else {
            name = nextLine.split(REGEX_MULTIPLE_SPACES)[0];
            trainer = new Rematch(name);

            nextLine
              .split(REGEX_MULTIPLE_SPACES)[1]
              .split(", ")
              .forEach((set) => {
                trainer.addPokemon(
                  new PokemonSet({
                    name: set.split(" Lv. ")[0],
                    level: Number(set.split(" Lv. ")[1]),
                  })
                );
              });

            areaChange.addRematch(trainer);
          }

          y++;
        }
      } else if (bossNames.includes(line)) {
        // Bosses (optional per section) - addBoss
        boss = new Trainer<BossPokemonSet>({ name: line });
        let pokeLines = [];

        while (true) {
          nextLine = sectionLines[x + y].trim();

          if (nextLine === "") {
            x = x + y;
            y = 1;
            break;
          } else {
            pokeLines.push(nextLine);
          }

          y++;
        }

        pokeLines.forEach((line) => {
          const sections = line.split(/\s+\/\s+/);

          const name = sections[0].split(" ")[0];
          const level = Number(sections[0].split("Lv. ")[1].slice(0, 2));
          const item = sections[0].split("@ ")[1];
          const nature = sections[1];
          const ability = sections[2];
          const moveset = sections[3].split(", ");

          boss.addPokemon(
            new BossPokemonSet({
              name,
              level,
              item,
              nature,
              ability,
              moveset,
            })
          );
        });

        areaChange.addBoss(boss);
      } else {
        // Regular Trainers - addTrainer
        name = line.split(REGEX_MULTIPLE_SPACES)[0];

        // If we hit a blank line, break out of the loop
        if (line === "") {
          x++;
          break;
        }

        // If the trainer name is not a boss name, create a RegularTrainer for the line
        trainer = new Trainer<PokemonSet>({ name });

        line
          .split(REGEX_MULTIPLE_SPACES)[1]
          .split(", ")
          .forEach((set) => {
            trainer.addPokemon(
              new PokemonSet({
                name: set.split(" Lv. ")[0],
                level: Number(set.split(" Lv. ")[1]),
              })
            );
          });

        areaChange.addTrainer(trainer);

        x++;
      }
    }

    console.log(areaChange);
    areaChanges.addChange(areaChange);
    location = sectionLinesForLocation[sectionLinesForLocation.length - 1];
  }

  return new TrainerPokemonDocumentation({
    generalChanges,
    areaChanges,
  });
};
