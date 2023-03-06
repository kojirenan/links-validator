import fs from 'fs';
import chalk from 'chalk';

function errorApp(error) {
  throw new Error(chalk.red(error.code, "Arquivo não encontrado"))
};

function linksExtract(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  const catchText = [...text.matchAll(regex)];

  const results = catchText.map(catchText => ({
    [catchText[1]]: catchText[2]
  }));

  return results;
}

async function fileCatch(fileDir) {
  try {
    const enconding = "utf-8";
    const text = await fs.promises.readFile(fileDir, enconding);

    console.log(linksExtract(text));
  } catch (error) {
    errorApp(error)
  }
};

fileCatch("./arquivos/texto.md");