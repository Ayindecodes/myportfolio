// Prints design/resume/resume.html to public/resume/resume.pdf with headless Chromium (task 17).
// Usage: npm run resume   (needs Chromium: `npx playwright-core install chromium` if it's missing)

import { readFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const html = new URL("./resume.html", import.meta.url).href;
const out = new URL("../../public/resume/resume.pdf", import.meta.url).pathname;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
const pages = ((await readFile(out, "latin1")).match(/\/Type\s*\/Page\b/g) ?? []).length;
console.log(`public/resume/resume.pdf written: ${pages} page${pages === 1 ? "" : "s"}${pages > 1 ? "  ⚠ should fit on one page" : ""}`);
