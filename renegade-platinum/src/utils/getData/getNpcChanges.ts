import { DocumentationSection, NPCChange } from "./types";
import { getFileSections } from "../files";

interface CreateNPCChangesDocumentation {
  npcs: DocumentationSection<NPCChange>;
}

class NPCChangesDocumentation {
  npcs: DocumentationSection<NPCChange>;

  constructor({ npcs }: CreateNPCChangesDocumentation) {
    this.npcs = npcs;
  }
}

export const getNpcChanges = () => {
  const sections = getFileSections("NPCChanges");

  const npcs = new DocumentationSection<NPCChange>("NPC Changes");

  for (let i = 0; i < sections.length; i += 2) {
    const name = sections[i].trim();
    const info = sections[i + 1].split("\n");

    const location = info[0].split(": ")[1];
    const rawChanges = info.slice(2);

    const changes: string[] = [];

    rawChanges.forEach((c) => {
      const change = c.trim();

      if (change !== "") {
        changes.push(change.slice(2));
      }
    });

    npcs.addChange(
      new NPCChange({
        name,
        location,
        changes,
      })
    );
  }

  return new NPCChangesDocumentation({ npcs });
};
