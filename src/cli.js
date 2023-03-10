import chalk from "chalk";
import fs from "fs";
import fileCatch from "./index.js";
import validatedList from "./http-valide.js";

const path = process.argv;

async function printList(valide, result, id = '') {
  if (valide) {
    console.log(
      chalk.yellow("Lista  Validada"),
      chalk.black.bgGreen(id),
      await validatedList(result)
    );
  } else {
    console.log(
      chalk.yellow("Lista de Links"),
      chalk.black.bgGreen(id),
      result
    );
  };
};

async function textProcess(argument) {
  const path = argument[2];
  const valide = argument[3] === "--valide";

  console.log(valide);

  try {
    fs.lstatSync(path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("Arquivo ou diretório não existente")
      return
    }
  };
  if (fs.lstatSync(path).isFile()) {
    const result = await fileCatch(argument[2]);

    printList(valide, result);

  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);

    files.forEach(async (fileName) => {
      const list = await fileCatch(`${path}/${fileName}`)
      printList(valide, list, fileName);
    });
  };
};

textProcess(path);