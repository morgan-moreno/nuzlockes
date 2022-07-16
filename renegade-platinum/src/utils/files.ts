import { readFileSync } from "fs";

export function getFileSections(
  filename: string,
  delimiter = "========================================================="
): string[] {
  const FILE = `Documentation/${filename}.txt`;

  const file = readFileSync(FILE).toString("utf-8");

  let sections = file.split(delimiter);

  sections = sections.slice(1);

  return sections;
}
