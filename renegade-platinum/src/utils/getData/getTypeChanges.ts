import { DocumentationSection, TypeChange } from "./types";
import { getFileSections } from "../files";

const FILE_NAME = "TypeChanges";

interface CreateTypeChangesDocumentation {
  generalChanges: DocumentationSection<string>;
  pokemonTypeChanges: DocumentationSection<TypeChange>;
}

class TypeChangesDocumentation {
  generalChanges: DocumentationSection<any>;
  pokemonTypeChanges: DocumentationSection<TypeChange>;
  constructor({
    generalChanges,
    pokemonTypeChanges,
  }: CreateTypeChangesDocumentation) {
    this.generalChanges = generalChanges;
    this.pokemonTypeChanges = pokemonTypeChanges;
  }
}

export const getTypeChanges = () => {
  const sections = getFileSections(FILE_NAME);

  const generalChanges = new DocumentationSection<string>(sections[0]);
  const generalChangeLines = sections[1].trim().split("\n");

  generalChangeLines.forEach((line) => {
    if (line.trim() !== "") {
      generalChanges.addChange(line.slice(2));
    }
  });

  const pokemonTypeChanges = new DocumentationSection<TypeChange>(sections[2]);
  const pokemonTypeChangeLines = sections[3].trim().split("\n").slice(2);

  pokemonTypeChangeLines.forEach((line) => {
    const sections = line.split(/\s{2,}/);

    const pokemon = {
      id: sections[0].split(" ")[0].replace("#", ""),
      name: sections[0].split(" ")[1],
    };

    const oldType = sections[1];
    const newType = sections[2];
    const justification = sections[3];

    pokemonTypeChanges.addChange(
      new TypeChange({
        pokemon,
        oldType,
        newType,
        justification,
      })
    );
  });

  return new TypeChangesDocumentation({
    generalChanges,
    pokemonTypeChanges,
  });
};
