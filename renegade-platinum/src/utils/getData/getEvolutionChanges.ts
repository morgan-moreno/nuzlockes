import fs from "fs";
import {
  DocumentationSection,
  EvolutionChange,
  EvolutionChangeType,
} from "./types";

interface CreateEvolutionChangesDocumentation {
  itemInteractionChanges: DocumentationSection<EvolutionChange>;
  levelChanges: DocumentationSection<EvolutionChange>;
  methodChanges: DocumentationSection<EvolutionChange>;
}

class EvolutionChangesDocumentation {
  public itemInteractionChanges: DocumentationSection<EvolutionChange>;
  public levelChanges: DocumentationSection<EvolutionChange>;
  public methodChanges: DocumentationSection<EvolutionChange>;

  constructor({
    itemInteractionChanges,
    levelChanges,
    methodChanges,
  }: CreateEvolutionChangesDocumentation) {
    this.itemInteractionChanges = itemInteractionChanges;
    this.levelChanges = levelChanges;
    this.methodChanges = methodChanges;
  }
}

export const getEvolutionChanges = () => {
  const FILE = "Documentation/EvolutionChanges.txt";

  const file = fs.readFileSync(FILE).toString("utf-8");

  const sections = file.split(
    "========================================================="
  );

  let changeLines: string[];

  // Remove the file header
  sections.splice(0, 1);

  // Item Interaction Changes
  const itemInteractionChanges = new DocumentationSection<EvolutionChange>(
    sections[0]
  );
  const itemInteractionLines = sections[1].split("\n");

  itemInteractionChanges.addNote(itemInteractionLines[1]);

  changeLines = itemInteractionLines.slice(3, 17);

  for (let i = 0; i < changeLines.length; i++) {
    let line = changeLines[i];

    const parts = line.split(":");
    const preEvolutionMon = parts[0].slice(2);
    let postEvolutionMon = "";
    let change = "";
    const description = parts[1];

    postEvolutionMon = description.match(/into\s\w+/i)![0].split(" ")[1];
    change = description.match(/\san*\s\w+'*\w*-*\s*\w+\s*\w*/)![0].slice(2);

    itemInteractionChanges.addChange(
      new EvolutionChange({
        changeType: EvolutionChangeType.ITEM,
        preEvolutionMon,
        postEvolutionMon,
        change,
      })
    );
  }

  // Level Changes
  const levelChanges = new DocumentationSection<EvolutionChange>(sections[2]);
  const levelChangesLines = sections[3].split("\n");

  changeLines = levelChangesLines.slice(1, 25);

  for (let i = 0; i < changeLines.length; i++) {
    const line = changeLines[i];

    const parts = line.split(":");
    const preEvolutionMon = parts[0].slice(2);
    const description = parts[1];

    const postEvolutionMon = description.match(/into\s\w+/)![0].split(" ")[1];
    const change = description.match(/Level\s\d\d/)![0];

    levelChanges.addChange(
      new EvolutionChange({
        changeType: EvolutionChangeType.LEVEL,
        preEvolutionMon,
        postEvolutionMon,
        change,
      })
    );
  }

  // Method Changes
  const methodChanges = new DocumentationSection<EvolutionChange>(sections[4]);
  changeLines = sections[5].split("\n").slice(1);

  for (let i = 0; i < changeLines.length; i++) {
    const line = changeLines[i];

    const parts = line.split(":");
    const preEvolutionMon = parts[0].slice(2);
    const description = parts[1];

    const changeParts = description.match(/into\s\w+.*/)![0];

    const postEvolutionMon = changeParts.match(/into\s\w+/)![0].slice(5);
    const change = changeParts.match(/(at|with|by|when)\s[\w\s]*/)![0];

    methodChanges.addChange({
      changeType: EvolutionChangeType.METHOD,
      preEvolutionMon,
      postEvolutionMon,
      change,
    });
  }

  return new EvolutionChangesDocumentation({
    itemInteractionChanges,
    levelChanges,
    methodChanges,
  });
};
