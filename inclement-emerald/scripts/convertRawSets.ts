import fs from "fs";
import path from "path";
import { cwd } from "process";
import { trainerPokemonParser, bossPokemonParser } from "./Parser";
import { Trainer } from "./util";

// CONSTANTS
const args = process.argv.slice(2);
const json: { [key: string]: Array<Trainer> } = {
  trainers: [],
  bosses: [],
};
const RAW_FILE_DIR = path.join(cwd(), "routes_raw");
const JSON_FILE_DIR = path.join(cwd(), "routes");
const TXT_FILE_DIR = path.join(cwd(), "sets");
const SECTION_SPLIT = /===\r\n\w+:\r\n===\r\n/;

// VARIABLES
let textSets: string = "";
let trainerText: string;
let bossText: string;
let filename: string;
let rawFileContents: string;
let filePath: string;
let sections: Array<string>;
let rawTrainers: string | Array<string>;
let rawBosses: string | Array<string>;
let trainerLines: string[];
let trainerName: string;
let pokemonLines: string[];
let trainer: Trainer;
let boss: Trainer;
let pokemonLine: string;
let bossName: string;
let bossLines: string[];
let bossPokemonLines: string[];

// HELPER METHODS
function addTrainer(trainer: Trainer) {
  json.trainers.push(trainer);
}
function addBoss(boss: Trainer) {
  json.bosses.push(boss);
}

/**
 * @usage $ yarn convert-raw <filename>
 * @description Will find the provided filename in the routes_raw folder and output two new files
 *  1. routes/{filename}.json
 *  2. sets/{filename}.txt
 */
const main = async () => {
  if (args.length < 1) {
    console.error(`Invalid usage: $ yarn convert-raw <filename>`);
    process.exit(1);
  } else {
    filename = args[0];
    filePath = path.join(RAW_FILE_DIR, `${filename}.txt`);
  }

  try {
    // Import the raw sets from the text file with the provided filename
    rawFileContents = fs.readFileSync(filePath, "utf-8").toString();

    sections = rawFileContents
      .split(SECTION_SPLIT)
      .slice(1)
      .map((x) => x.trim());

    console.log(sections);

    rawTrainers = sections[0];
    rawBosses = sections[1];

    // Parse the raw trainer sets to JSON / TXT
    rawTrainers = rawTrainers.split("\r\n\r\n");

    // TRAINERS LOOP
    for (let tIndex = 0; tIndex < rawTrainers.length; tIndex++) {
      trainerLines = rawTrainers[tIndex].split("\r\n");
      trainerName = trainerLines[0];
      // Slice each line at index 1 to remove the hyphen that is at the beginning of each pokemon line
      pokemonLines = trainerLines.slice(1).map((line) => line.slice(1));

      trainer = new Trainer(trainerName, []);
      trainerText = `\r\n===\r\n${trainerName}\r\n===\r\n`;

      console.log(`Trainer #: ${tIndex}`);
      console.log(`Trainer Name: ${trainer.name}`);
      console.log(`Pokemon Lines: `, pokemonLines);

      // POKEMON LOOP
      for (let pIndex = 0; pIndex < pokemonLines.length; pIndex++) {
        pokemonLine = pokemonLines[pIndex];

        // Parse pokemon info to JSON and add to the trainer
        trainer.addPokemon(
          trainerPokemonParser.parseTrainerPokemonToJson(pokemonLine)
        );

        // Parse pokemon info to TXT and add the the txt results
        trainerText +=
          trainerPokemonParser.parseTrainerPokemonToTxt(pokemonLine);
      }

      addTrainer(trainer);
      textSets += trainerText;
    }

    if (rawBosses) {
      // Parse the raw boss sets to JSON / TXT
      rawBosses = rawBosses.split("\r\n\r\n");

      // BOSSES LOOP
      for (let bIndex = 0; bIndex < rawBosses.length; bIndex++) {
        bossLines = rawBosses[bIndex].split("\r\n");

        bossName = bossLines[0].trim();
        boss = new Trainer(bossName, []);
        bossText = `\r\n===\r\n${bossName}\r\n===\r\n`;

        bossPokemonLines = bossLines.slice(1);

        // Parse boss pokemon to JSON and add to boss object
        boss.pokemon =
          bossPokemonParser.parseBossPokemonToJson(bossPokemonLines);

        // Parse
        bossText += bossPokemonParser.parseBossPokemonToTxt(bossPokemonLines);

        addBoss(boss);
        textSets += bossText;
      }
    }

    // Export json sets to routes/{filename}.json
    filePath = path.join(JSON_FILE_DIR, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(json));

    // Export text sets to sets/{filename}.txt
    filePath = path.join(TXT_FILE_DIR, `${filename}.txt`);
    fs.writeFileSync(filePath, textSets);

    // Success
    console.log("Successfully converted sets");
    process.exit(0);
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
};

main();
