function pullLinks(arrLinks) {
  return arrLinks.map(linkObj => Object.values(linkObj).join());
};

async function statusCheck(listURLs) {
  const arrStatus = await Promise.all(
    listURLs.map(async url => {
      const res = await fetch(url);
      return res.status;
    }));
  return arrStatus;
};

export default async function valideList(linkList) {
  const links = pullLinks(linkList);
  const status = await statusCheck(links);
  return status;
};
