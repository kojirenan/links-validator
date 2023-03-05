import fs from 'fs';
import chalk from 'chalk';

function errorApp(error) {
  throw new Error(chalk.red(error.code, "Arquivo não encontrado"))
};

function fileCatch(fileDir) {
  const enconding = "utf-8";

  fs.readFile(fileDir, enconding, (error, text) => {
    if (error) {
      errorApp(error);
    }

    console.log(chalk.bgGreen(text));
  });
};

fileCatch("./arquivos/texto.md");