import { DocumentationSection, IVs, TradeChange } from "./types";
import { getFileSections } from "../files";

const FILE_NAME = "TradeChanges";

interface CreateTradeChangeDocumentation {
  generalChanges: DocumentationSection<TradeChange>;
}

class TradeChangesDocumentation {
  generalChanges: DocumentationSection<TradeChange>;

  constructor({ generalChanges }: CreateTradeChangeDocumentation) {
    this.generalChanges = generalChanges;
  }
}

export const getTradeChanges = () => {
  const sections = getFileSections(FILE_NAME);

  const generalChanges = new DocumentationSection<TradeChange>(sections[0]);
  let generalChangeLines = sections[1].split("\n");

  const noteLines = generalChangeLines.slice(1, 4);
  noteLines.forEach((line) => {
    if (line.trim() !== "") {
      generalChanges.addNote(line.slice(2));
    }
  });
  generalChangeLines = generalChangeLines.slice(5, 44);
  const generalChangeSections = generalChangeLines
    .join("\n")
    .split("---")
    .filter((line) => line.trim() !== "" || line.trim() !== "---");

  let changeLinesCounter = 2;
  for (let i = 1; i < generalChangeSections.length; i += 2) {
    const location = generalChangeSections[i];
    const changes = generalChangeSections[changeLinesCounter].split("\n");
    const description = changes[1];
    const pokeInfo = changes.slice(3);
    const nameLine = pokeInfo[0];
    const itemLine = pokeInfo[1];
    const ivLine = pokeInfo[2].split(": ")[1];
    const natureLine = pokeInfo[3];

    const name = nameLine.split(" the ")[0].trim();
    const pokemon = nameLine.split(" the ")[1].trim();
    const item = itemLine.split(": ")[1].trim();
    const ivItems = ivLine.split(" / ");

    const ivs: IVs = {
      hp: Number(ivItems[0].split(" ")[0]),
      atk: Number(ivItems[1].split(" ")[0]),
      def: Number(ivItems[2].split(" ")[0]),
      spa: Number(ivItems[3].split(" ")[0]),
      spd: Number(ivItems[4].split(" ")[0]),
      spe: Number(ivItems[5].split(" ")[0]),
    };
    const nature = natureLine.split(": ")[1].trim();

    generalChanges.addChange(
      new TradeChange({
        location,
        description,
        receive: {
          name,
          pokemon,
          item,
          ivs,
          nature,
        },
      })
    );

    changeLinesCounter += 2;
  }

  return new TradeChangesDocumentation({
    generalChanges,
  });
};
