const fs = require("fs");

const FILE = "my-mons.txt";

const args = process.argv.slice(2);

if (!args.length > 0) {
  console.error("Invalid usage: $ yarn update-levels <new-level>");
  process.exit(1);
}

const newLevel = args[0];
let file = fs.readFileSync(FILE).toString();

file = file.replace(/Level: \d{2,}/g, `Level: ${newLevel}`);

fs.writeFile(FILE, file, (err, data) => {
  if (err) {
    console.error("Error writing to file");
    process.exit(1);
  }

  console.log("Levels successfully updated");
  process.exit(0);
});
