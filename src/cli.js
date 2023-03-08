import chalk from "chalk";
import fs from "fs";
import fileCatch from "./index.js";

const path = process.argv;

function printList(result, id = '') {
  console.log(
    chalk.yellow("Lista de Links"),
    chalk.black.bgGreen(id),
    result
  );
};

async function textProcess(argument) {
  const path = argument[2];

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

    printList(result);

  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);

    files.forEach(async (fileName) => {
      const list = await fileCatch(`${path}/${fileName}`)
      printList(list, fileName);
    });
  };
};

textProcess(path);