import {
  DocumentationSection,
  GeneralMoveChange,
  MoveReplacement,
  MoveModification,
  Modification,
} from "./types";
import { getFileSections } from "../files";

interface CreateMoveChangesDocumentation {
  generalChanges: DocumentationSection<GeneralMoveChange>;
  moveReplacements: DocumentationSection<MoveReplacement>;
  moveModifications: DocumentationSection<MoveModification>;
}

class MoveChangesDocumentation {
  public generalChanges: DocumentationSection<GeneralMoveChange>;
  public moveReplacements: DocumentationSection<MoveReplacement>;
  public moveModifications: DocumentationSection<MoveModification>;

  constructor({
    generalChanges,
    moveReplacements,
    moveModifications,
  }: CreateMoveChangesDocumentation) {
    this.generalChanges = generalChanges;
    this.moveReplacements = moveReplacements;
    this.moveModifications = moveModifications;
  }
}

export const getMoveChanges = (): MoveChangesDocumentation => {
  const sections = getFileSections("MoveChanges");

  let noteLines: string[];
  let changeLines: string[];

  // General Changes
  const generalChanges = new DocumentationSection<GeneralMoveChange>(
    sections[0]
  );
  noteLines = sections[1]
    .split("\n")
    .map((line) => line.slice(2))
    .filter((line) => line !== "");
  noteLines.forEach((note) => generalChanges.addNote(note));

  // Move Replacements
  const moveReplacements = new DocumentationSection<MoveReplacement>(
    sections[2]
  );
  const moveReplacementsLines = sections[3].split("\n");

  noteLines = moveReplacementsLines.slice(1, 3);
  changeLines = moveReplacementsLines.slice(6, 17);

  noteLines.forEach((note) => moveReplacements.addNote(note));
  changeLines.forEach((line) => {
    const parts = line.split(/\s{2,}/);
    const move = parts[0];
    const newMove = parts[1];

    moveReplacements.addChange(
      new MoveReplacement({
        move,
        newMove,
      })
    );
  });

  // Move Modifications
  const moveModifications = new DocumentationSection<MoveModification>(
    sections[4]
  );
  const moveModificationsLines = sections[5].split("\n");

  noteLines = moveModificationsLines.slice(1, 3);
  changeLines = moveModificationsLines.slice(4);

  noteLines.forEach((note) => moveModifications.addNote(note));
  const rawChanges: string[] = [];

  const auroraBeam = changeLines.slice(0, 3).join();
  const blazeKick = changeLines.slice(4, 7).join();
  const bubbleBeam = changeLines.slice(8, 11).join();
  const chatter = changeLines.slice(12, 15).join();
  const crossPoison = changeLines.slice(16, 19).join();
  const cut = changeLines.slice(20, 26).join();
  const disarmingVoice = changeLines.slice(27, 29).join();
  const drainingKiss = changeLines.slice(30, 33).join();
  const flameWheel = changeLines.slice(34, 37).join();
  const fly = changeLines.slice(38, 41).join();
  const hurricane = changeLines.slice(42, 44).join();
  const needleArm = changeLines.slice(45, 47).join();
  const poisonFang = changeLines.slice(48, 51).join();
  const poisonTail = changeLines.slice(52, 55).join();
  const rockClimb = changeLines.slice(56, 61).join();
  const rockSmash = changeLines.slice(62, 64).join();
  const scald = changeLines.slice(65, 67).join();
  const shadowClaw = changeLines.slice(68, 71).join();
  const shadowPunch = changeLines.slice(72, 75).join();
  const sludge = changeLines.slice(76, 79).join();
  const strength = changeLines.slice(80, 83).join();
  const wildCharge = changeLines.slice(84, 86).join();

  rawChanges.push(auroraBeam);
  rawChanges.push(blazeKick);
  rawChanges.push(bubbleBeam);
  rawChanges.push(chatter);
  rawChanges.push(crossPoison);
  rawChanges.push(cut);
  rawChanges.push(disarmingVoice);
  rawChanges.push(drainingKiss);
  rawChanges.push(flameWheel);
  rawChanges.push(fly);
  rawChanges.push(hurricane);
  rawChanges.push(needleArm);
  rawChanges.push(poisonFang);
  rawChanges.push(poisonTail);
  rawChanges.push(rockClimb);
  rawChanges.push(rockSmash);
  rawChanges.push(scald);
  rawChanges.push(shadowClaw);
  rawChanges.push(shadowPunch);
  rawChanges.push(sludge);
  rawChanges.push(strength);
  rawChanges.push(wildCharge);

  rawChanges.forEach((rawChange) => {
    const lines = rawChange.split(",");

    const move = lines[0];

    const moveModification = new MoveModification({ move });
    const movesChanges = lines.slice(1);

    movesChanges.forEach((line) => {
      const parts = line.split(": ");

      const key = parts[0].toLowerCase() as keyof Modification;
      const change = parts[1];

      moveModification.setModification(key, change);
    });

    moveModifications.addChange(moveModification);
  });

  return new MoveChangesDocumentation({
    generalChanges,
    moveModifications,
    moveReplacements,
  });
};
