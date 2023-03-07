import chalk from "chalk";
import fileCatch from "./index.js";

const path = process.argv;

async function textProcess(path) {
  const result = await fileCatch(path[2]);

  console.log(chalk.yellow("lista de links"), (result));
}

textProcess(path);