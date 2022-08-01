export const NATURES: { [key: string]: string } = {
  adamant: "Adamant (+Atk, -SpA)",
  bashful: "Bashful (Neutral)",
  bold: "Bold (+Def, -Atk)",
  brave: "Brave (+Atk, -Spe)",
  calm: "Calm (+SpD, -Atk)",
  careful: "Careful (+SpD, -SpA)",
  docile: "Docile (Neutral)",
  gentle: "Gentle (+SpD, -Def)",
  hardy: "Hardy (Neutral)",
  hasty: "Hasty (+Spe, -Def)",
  impish: "Impish (+Def, -SpA)",
  jolly: "Jolly (+Spe, -SpA)",
  lax: "Lax (+Def, -SpD)",
  lonely: "Lonely (+Atk, -Def)",
  mild: "Mild (+SpA, -Def)",
  modest: "Modest (+SpA, -Atk)",
  naive: "Naive (+Spe, - SpD)",
  naughty: "Naughty (+Atk, -SpD)",
  quiet: "Quiet (+SpA, -Spe)",
  quirky: "Quirky (Neutral)",
  rash: "Rash (+SpA, -SpD)",
  relaxed: "Relaxed (+Def, -Spe)",
  sassy: "Sassy (+SpD, -Spe)",
  serious: "Serious (Neutral)",
  timid: "Timid (+Spe, -Atk)",
};

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("Please enter a nature: yarn natures <nature>");
  process.exit(1);
}

const natureToFind = args[0];

if (Object.keys(NATURES).includes(natureToFind)) {
  console.log(NATURES[natureToFind]);
  process.exit(0);
} else {
  console.error("Please enter a valid nature");
  process.exit(1);
}
