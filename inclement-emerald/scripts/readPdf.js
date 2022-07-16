const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");

const DOCS_BASE_PATH = path.resolve(__dirname, "..\\docs");

function parsePdf(filename) {
  const pdfBuffer = fs.readFileSync(`${DOCS_BASE_PATH}\\${filename}.pdf`);

  pdf(pdfBuffer).then(function (data) {
    const lines = data.text.split("\n");

    for (let i = 0; i < 100; i++) {
      console.log(`[${i}] - ${lines[i]}`);
    }
  });
}

const args = process.argv.slice(2);

if (args.length > 0) {
  const filename = args[0];

  parsePdf(filename);
} else {
  console.error("[ERROR] - Filename argument is required");
  process.exit(1);
}
