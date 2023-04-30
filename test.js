import fs from 'node:fs';
// import { join } from 'node:path';
import puppeteer from 'puppeteer';

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://memegen-link-examples-upleveled.netlify.app/');

  const photos = await page.$$eval('images', (imgs) => {
    return imgs.map((x) => x.src);
  });

  for (const photo of photos) {
    const imagepage = await page.goto(photo);
    fs.writeFileSync(photo.split('/').pop(), await imagepage.buffer());
  }

  await browser.close();
}

await start();
