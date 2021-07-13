const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 500, // slow down by 250ms
  });

  const xpath = {
    searchResult: {
      dateDiv: '//div[contains(@class, "_2asEJ_k_27")]',
    }
  }

  const page = await browser.newPage();
  await page.goto('https://calendly.com/dowanna/meeting-30?back=1&month=2021-07&date=2021-07-07');
  const elems = await page.$x(xpath.searchResult.dateDiv);

  // var data = [];
  // for(let i = 0; i < elems.length; ++i){

  //   text = await elems[i].getProperty('textContent');
  //   data.push(await text.jsonValue());
  //   // data.push(await (await elems[i].getProperty('textContent')).jsonValue());
  // }

  const data = await Promise.all(elems.map(async (elem) => {
    const content = await elem.getProperty('textContent');
    return await content.jsonValue();
  }));
  console.log(data);
  await browser.close();
})();

