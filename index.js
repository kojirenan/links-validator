import fs from 'fs';
import chalk from 'chalk';

function errorApp(error) {
  throw new Error(chalk.red(error.code, "Arquivo não encontrado"))
};

async function fileCatch(fileDir) {
  try {
    const enconding = "utf-8";
    const text = await fs.promises.readFile(fileDir, enconding)
    console.log(chalk.green(text))
  } catch (error) {
    errorApp(error)
  }
};

fileCatch("./arquivos/texto.md");