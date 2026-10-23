// Renders design/og/og.html to src/app/opengraph-image.png (task 32). Usage: npm run og
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import sharp from "sharp";

const dir = new URL("./", import.meta.url);
const materials = (await readFile(new URL("../assets/_materials.svg", import.meta.url), "utf8")).replace(/<!--[\s\S]*?-->/, "");
const html = (await readFile(new URL("og.html", dir), "utf8")).replace(
  "<!--@materials-->",
  `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${materials}</svg>`,
);
const tmp = new URL(".og.rendered.html", dir);
await writeFile(tmp, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(tmp.href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot();
await browser.close();

const out = new URL("../../src/app/opengraph-image.png", import.meta.url).pathname;
await sharp(png).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(out);
console.log(`src/app/opengraph-image.png  ${((await readFile(out)).length / 1024).toFixed(0)} KB`);
