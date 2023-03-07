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

  return results.length !== 0 ? results : "Não há links no arquivo";
}

async function fileCatch(fileDir) {
  try {
    const enconding = "utf-8";
    const text = await fs.promises.readFile(fileDir, enconding);

    return linksExtract(text);
  } catch (error) {
    errorApp(error)
  }
};

export default fileCatch;