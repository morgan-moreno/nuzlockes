import { urlToHttpOptions } from "url";
import { REGEX_MULTIPLE_SPACES, REGEX_NEW_LINE } from "../constants";
import { getFileSections } from "../files";
import {
  DocumentationSection,
  Encounter,
  EncounterOdds,
  EncounterType,
  WildPokemonAreaChange,
} from "./types";

const FILE_NAME = "WildPokemon";
const ENCOUNTER_TYPES: EncounterType[] = [
  "Surf",
  "Old Rod",
  "Good Rod",
  "Super Rod",
  "Morning",
  "Day",
  "Night",
  "Poké Radar",
  "Honey Tree",
];

interface CreateWildPokemonDocumentation {
  generalChanges: DocumentationSection<string>;
  areaChanges: DocumentationSection<WildPokemonAreaChange>;
}

class WildPokemonDocumentation {
  generalChanges: DocumentationSection<string>;
  areaChanges: DocumentationSection<WildPokemonAreaChange>;

  constructor({ generalChanges, areaChanges }: CreateWildPokemonDocumentation) {
    this.generalChanges = generalChanges;
    this.areaChanges = areaChanges;
  }
}

export const getWildPokemon = () => {
  const sections = getFileSections(FILE_NAME, "$$$");

  const generalChanges = new DocumentationSection<string>(sections[0]);
  const generalChangeLines = sections[1].trim().split("\n");

  generalChangeLines.forEach((line) => {
    if (line.trim() !== "") {
      generalChanges.addChange(line.slice(2));
    }
  });

  const areaChanges = new DocumentationSection<WildPokemonAreaChange>(
    sections[2]
  );

  const areaChangeSections = sections[3].split(
    "=================================================================================================================================="
  );

  let location = "Twinleaf Town";
  let section: string;
  let sectionLines: string[];
  let areaChange: WildPokemonAreaChange;

  for (let i = 1; i < areaChangeSections.length; i++) {
    // String containing section contents
    section = areaChangeSections[i];
    sectionLines = section.trim().split(REGEX_NEW_LINE);

    // Initiliaze the area change object
    areaChange = new WildPokemonAreaChange(location);

    // Add encounters to the area change object
    let encounterSections: string[];
    let oddsSections: string[];
    let encounter: Encounter;

    sectionLines.forEach((line) => {
      // Ensure line is empty
      if (line.trim() !== "") {
        // Split the line at multiple spaces: {EncounterType} {EncounterOdds}
        encounterSections = line.split(REGEX_MULTIPLE_SPACES);

        if (ENCOUNTER_TYPES.includes(encounterSections[0] as EncounterType)) {
          // Create encounter object
          encounter = new Encounter(encounterSections[0] as EncounterType);

          // Get the encounter options
          oddsSections = encounterSections[1].split(", ");

          oddsSections.forEach((section) => {
            encounter.addOdds(
              new EncounterOdds(section.split(" ")[0], section.split(" ")[1])
            );
          });

          areaChange.addEncounter(encounter);
        }
      }
    });

    // Add area change object to area changes doc section
    areaChanges.addChange(areaChange);

    // Grab the location from the end of the section
    location = sectionLines[sectionLines.length - 2];
  }

  return new WildPokemonDocumentation({
    generalChanges,
    areaChanges,
  });
};
