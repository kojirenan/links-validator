import chalk from "chalk";

function pullLinks(arrLinks) {
  return arrLinks.map(linkObj => Object.values(linkObj).join());
};

async function statusCheck(listURLs) {
  const arrStatus = await Promise.all(
    listURLs.map(async url => {
      try {
        const res = await fetch(url);
        return res.status;

      } catch (error) {
        return handleError(error)
      };
    }));
  return arrStatus;
};

function handleError(error) {
  if (error.cause.code === "ENOTFOUND") {
    return "Link não encontrado";
  } else {
    return "Ocorreu algum erro";
  };
};

export default async function validatedList(linkList) {
  const links = pullLinks(linkList);
  const status = await statusCheck(links);

  return linkList.map((object, index) => ({
    ...object,
    status: status[index]
  }));
};
