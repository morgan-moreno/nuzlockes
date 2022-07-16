import { readFileSync } from "fs";
import {
  DocumentationSection,
  ItemChange,
  ItemLocationChange,
  ReplacedItemChange,
} from "./types";

interface CreateItemChangesDocumentation {
  modifiedItems: DocumentationSection<ItemChange>;
  modifiedTms: DocumentationSection<ItemChange>;
  itemLocations: DocumentationSection<ItemLocationChange>;
  tmLocations: DocumentationSection<ItemLocationChange>;
  plateLocations: DocumentationSection<ItemLocationChange>;
  keyItems: DocumentationSection<ItemLocationChange>;
  replacedItems: DocumentationSection<ReplacedItemChange>;
  berryLocations: DocumentationSection<ItemLocationChange>;
}

class ItemChangesDocumentation {
  modifiedItems: DocumentationSection<ItemChange>;
  modifiedTms: DocumentationSection<ItemChange>;
  itemLocations: DocumentationSection<ItemLocationChange>;
  tmLocations: DocumentationSection<ItemLocationChange>;
  plateLocations: DocumentationSection<ItemLocationChange>;
  keyItems: DocumentationSection<ItemLocationChange>;
  replacedItems: DocumentationSection<ReplacedItemChange>;
  berryLocations: DocumentationSection<ItemLocationChange>;

  constructor({
    modifiedItems,
    modifiedTms,
    itemLocations,
    tmLocations,
    plateLocations,
    keyItems,
    replacedItems,
    berryLocations,
  }: CreateItemChangesDocumentation) {
    this.modifiedItems = modifiedItems;
    this.modifiedTms = modifiedTms;
    this.itemLocations = itemLocations;
    this.tmLocations = tmLocations;
    this.plateLocations = plateLocations;
    this.keyItems = keyItems;
    this.replacedItems = replacedItems;
    this.berryLocations = berryLocations;
  }
}

export const getItemChanges = () => {
  const FILE = "Documentation/ItemChanges.txt";

  const file = readFileSync(FILE).toString("utf-8");

  const sections = file.split(
    "========================================================="
  );

  let changeLines: string[];
  let noteLines: string[];

  sections.splice(0, 1);

  // Modified Items
  const modifiedItems = new DocumentationSection<ItemChange>(sections[0]);
  const modifiedItemsLines = sections[1].split("\n");

  const likeEvoStoneLines = modifiedItemsLines.slice(2, 13);
  for (let i = 0; i < likeEvoStoneLines.length; i++) {
    const line = likeEvoStoneLines[i];

    modifiedItems.addChange(
      new ItemChange({
        item: line.slice(2),
        change: "Can be used like an evolutionary stone",
      })
    );
  }

  const costAdjustments = modifiedItemsLines.slice(15, 18);
  for (let i = 0; i < costAdjustments.length; i++) {
    const line = costAdjustments[i].slice(2);

    let [item, rawPriceChange] = line.split(/\s{2,}/);
    const change = rawPriceChange
      .replace("(", "")
      .replace(")", "")
      .replace(">>", "=>");

    modifiedItems.addChange(
      new ItemChange({
        item,
        change,
      })
    );
  }

  // Modified TMs
  const modifiedTms = new DocumentationSection<ItemChange>(sections[2]);
  const modifiedTmsLines = sections[3].split("\n");

  changeLines = modifiedTmsLines.slice(2, 8);

  for (let i = 0; i < changeLines.length; i++) {
    const line = changeLines[i].slice(2);

    const parts = line.split(": ");
    const item = parts[0];
    const change = parts[1].trimEnd();

    modifiedTms.addChange(
      new ItemChange({
        item,
        change,
      })
    );
  }

  // ItemLocations
  const itemLocations = new DocumentationSection<ItemLocationChange>(
    sections[4]
  );
  const itemLocationsLines = sections[5].split("\n");

  changeLines = itemLocationsLines.slice(3, 122);

  for (let i = 0; i < changeLines.length; i++) {
    const line = changeLines[i];

    const parts = line.split(/\s{2,}/);
    const item = parts[0];
    const locations = parts[1].split(", ");

    itemLocations.addChange(
      new ItemLocationChange({
        item,
        locations,
      })
    );
  }

  // TM Locations
  const tmLocations = new DocumentationSection<ItemLocationChange>(sections[6]);
  const tmLocationsLines = sections[7].split("\n");

  changeLines = tmLocationsLines.slice(5, 105);

  for (let i = 0; i < changeLines.length; i++) {
    const line = changeLines[i];

    const parts = line.split(/\s{2,}/);
    const item = parts[0];
    const locations = parts[1].split(", ");
    const obtained = parts[2];

    tmLocations.addChange(
      new ItemLocationChange({
        item,
        locations,
        obtained,
      })
    );
  }

  // Plate Locations
  const plateLocations = new DocumentationSection<ItemLocationChange>(
    sections[8]
  );
  const plateLocationsLines = sections[9].split("\n");

  noteLines = plateLocationsLines.slice(1, 4);
  noteLines.forEach((line) => plateLocations.addNote(line.trim()));

  changeLines = plateLocationsLines.slice(7, 23);

  for (let i = 0; i < changeLines.length; i++) {
    const line = changeLines[i];

    const parts = line.split(/\s{2,}/);
    const item = parts[0];
    const locations = [parts[1]];

    plateLocations.addChange(
      new ItemLocationChange({
        item,
        locations,
      })
    );
  }

  const remainingDocumentation = sections[11].split("==================");

  // Key Items
  const keyItems = new DocumentationSection<ItemLocationChange>(sections[10]);
  const keyItemsLines = remainingDocumentation[0].split("\n");

  changeLines = keyItemsLines.slice(4, 39);

  for (let i = 0; i < changeLines.length; i++) {
    const line = changeLines[i];

    const parts = line.split(/\s{2,}/);
    const item = parts[0];
    const locations = [parts[1]];
    const obtained = parts[2];

    keyItems.addChange(
      new ItemLocationChange({
        item,
        locations,
        obtained,
      })
    );
  }

  // Replaced Items
  const replacedItems = new DocumentationSection<ReplacedItemChange>(
    remainingDocumentation[1]
  );
  const replacedItemsLines = remainingDocumentation[2].split("\n");

  noteLines = replacedItemsLines.slice(1, 3);
  noteLines.forEach((line) => replacedItems.addNote(line.trim()));

  changeLines = replacedItemsLines.slice(6, 16);
  changeLines.forEach((line) => {
    const parts = line.split(/\s{2,}/);

    const oldItem = parts[0];
    const newItem = parts[1];

    replacedItems.addChange(
      new ReplacedItemChange({
        item: oldItem,
        oldItem,
        newItem,
      })
    );
  });

  // Berry Locations
  const berryLocations = new DocumentationSection<ItemLocationChange>(
    remainingDocumentation[3]
  );
  const berryLocationsLines = remainingDocumentation[4].split("\n");

  changeLines = berryLocationsLines.slice(4, -1);
  changeLines.forEach((line) => {
    const parts = line.split(/\s{2,}/);
    const item = parts[0];
    const locations = [parts[1]];

    berryLocations.addChange(
      new ItemLocationChange({
        item,
        locations,
      })
    );
  });

  return new ItemChangesDocumentation({
    modifiedItems,
    modifiedTms,
    itemLocations,
    tmLocations,
    plateLocations,
    keyItems,
    replacedItems,
    berryLocations,
  });
};
