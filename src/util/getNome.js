const puppeteer = require("puppeteer");

const getNome = async (CPF) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const selectors = {
    inputCPF: "input#doc",
    inputConsultar: "input#consultar",
    nome: "#resultado > .dados.nome",
    result: "tr:nth-child(2) > td > *",
  };

  await page.goto("https://www.situacao-cadastral.com/");
  await page.waitFor(selectors.inputCPF);
  await page.type(selectors.inputCPF, CPF, { delay: 140 });
  await page.click(selectors.inputConsultar);

  await page.waitFor(selectors.result, { visible: true });
  const nome = await page.evaluate((nome) => {
    let element = document.querySelector(nome);
    if (!element) {
      return null;
    }
    return document.querySelector(nome).innerText;
  }, selectors.nome);

  await browser.close();
  console.log(nome);
  return nome;
};

module.exports = getNome;
