import { writeFile } from "fs";
import { getData } from "./utils/getData";

const main = async () => {
  const json = getData();

  writeFile("data.json", JSON.stringify(json), (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log("Data written successfully to - data.json");
      process.exit(0);
    }
  });
};

main();
