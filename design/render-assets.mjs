// Renders the SVG sources in design/assets/ to optimised WebP files in src/assets/redesign/.
// Shared filters and gradients from design/assets/_materials.svg are injected into every source,
// so all objects share one lighting recipe.
//
// Usage: npm run assets              (everything)
//        npm run assets -- avatar    (only sources whose name contains "avatar")

import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import sharp from "sharp";

const SRC = new URL("./assets/", import.meta.url).pathname;
const OUT = new URL("../src/assets/redesign/", import.meta.url).pathname;
const MAX_BYTES = 150 * 1024; // per-image budget from docs/redesign/BRIEF.md
const only = process.argv[2];

// Output width in px: about 2x the largest size each asset is displayed at. Default 600.
const widths = { avatar: 900 };

// Smaller variants cut out of a rendered source (coordinates in the source's 800-unit viewBox).
const crops = {
  "avatar-head": { from: "avatar", left: 150, top: 90, size: 500, width: 160 },
};

const materials = (await readFile(join(SRC, "_materials.svg"), "utf8")).replace(/<!--[\s\S]*?-->/, "");

async function rasterise(name) {
  const source = await readFile(join(SRC, `${name}.svg`), "utf8");
  // Inject the shared <defs> right after the root <svg …> tag.
  const svg = source.replace(/(<svg\b[^>]*>)/, `$1\n${materials}`);
  return sharp(Buffer.from(svg), { density: 300 });
}

async function write(image, outName) {
  const out = join(OUT, `${outName}.webp`);
  await image.webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(out);
  const { size } = await stat(out);
  const flag = size > MAX_BYTES ? "  ⚠ over the 150 KB budget" : "";
  console.log(`${outName}.webp  ${(size / 1024).toFixed(1)} KB${flag}`);
}

const sources = (await readdir(SRC))
  .filter((f) => f.endsWith(".svg") && !f.startsWith("_"))
  .map((f) => basename(f, ".svg"))
  .filter((name) => !only || name.includes(only));

for (const name of sources) {
  await write((await rasterise(name)).resize({ width: widths[name] ?? 600 }), name);
}

// Icon tiles (tech logos and socials) share one template: a puffy rounded tile with the glyph embossed on it.
const { tiles } = JSON.parse(await readFile(join(SRC, "_tiles.json"), "utf8"));
for (const tile of tiles.filter((t) => !only || t.name.includes(only))) {
  const glyph = tile.path ? `<path d="${tile.path}"/>` : tile.markup;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    ${materials}
    <ellipse cx="200" cy="372" rx="128" ry="13" fill="#2a2430" opacity="0.26" filter="url(#contactShadow)"/>
    <rect x="48" y="40" width="304" height="304" rx="86" fill="${tile.tile}" filter="url(#vinyl)"/>
    <g fill="${tile.glyph}" filter="url(#vinylSmall)" transform="translate(200 192) scale(7.6) translate(-12 -12)">${glyph}</g>
  </svg>`;
  await write(sharp(Buffer.from(svg), { density: 300 }).resize({ width: 240 }), tile.name);
}

// Browser mock-ups: every real screenshot in design/screens/ is set inside a cream vinyl browser window.
const SCREENS = new URL("./screens/", import.meta.url).pathname;
const screens = (await readdir(SCREENS)).filter((f) => /\.(webp|png|jpe?g)$/.test(f));
for (const file of screens) {
  const name = `shot-${file.replace(/\.\w+$/, "")}`;
  if (only && !name.includes(only)) continue;
  // librsvg can't decode WebP inside an SVG, so embed the screenshot as JPEG.
  const jpeg = await sharp(join(SCREENS, file)).resize({ width: 1072 * 1.5 }).jpeg({ quality: 86 }).toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 840" width="1200" height="840">
    ${materials}
    <defs><clipPath id="screen"><rect x="64" y="104" width="1072" height="660" rx="18"/></clipPath></defs>
    <ellipse cx="600" cy="808" rx="470" ry="20" fill="#2a2430" opacity="0.24" filter="url(#contactShadow)"/>
    <rect x="36" y="30" width="1128" height="762" rx="38" fill="#fbf8f2" filter="url(#vinyl)"/>
    <g fill="#ddd3c1"><circle cx="92" cy="68" r="10"/><circle cx="126" cy="68" r="10"/><circle cx="160" cy="68" r="10"/></g>
    <rect x="420" y="54" width="360" height="28" rx="14" fill="#efe8dc"/>
    <image x="64" y="104" width="1072" height="660" preserveAspectRatio="xMidYMin slice" clip-path="url(#screen)"
           xlink:href="data:image/jpeg;base64,${jpeg.toString("base64")}"/>
    <rect x="64" y="104" width="1072" height="660" rx="18" fill="none" stroke="#2a2430" stroke-opacity="0.08" stroke-width="2"/>
  </svg>`;
  await write(sharp(Buffer.from(svg), { density: 144 }).resize({ width: 1200 }), name);
}

for (const [name, crop] of Object.entries(crops)) {
  if (only && !name.includes(only) && !crop.from.includes(only)) continue;
  // Render the source at 1 unit = 1 px, cut the square, then scale it down.
  const full = await (await rasterise(crop.from)).resize({ width: 800 }).png().toBuffer();
  const image = sharp(full)
    .extract({ left: crop.left, top: crop.top, width: crop.size, height: crop.size })
    .resize({ width: crop.width });
  await write(image, name);
}

// App icons (task 33): a flat padlock mark, copied as the favicon and rendered as the iOS home-screen icon.
if (!only || "icon".includes(only)) {
  const APP = new URL("../src/app/", import.meta.url).pathname;
  const icon = await readFile(join(SRC, "_icon.svg"));
  await writeFile(join(APP, "icon.svg"), icon);
  await sharp(icon, { density: 600 }).resize(180).png().toFile(join(APP, "apple-icon.png"));
  console.log("icon.svg, apple-icon.png → src/app/");
}

// The same materials, exported for live SVG in the site (the nav wordmark and the hero balloon letters).
if (!only) {
  const defs = materials.replace(/<!--[\s\S]*?-->/g, "").replace(/^\s*<defs>|<\/defs>\s*$/g, "").replace(/\s*\n\s*/g, " ").trim();
  const file = new URL("../src/lib/materials.generated.ts", import.meta.url).pathname;
  await writeFile(
    file,
    `// Generated by design/render-assets.mjs from design/assets/_materials.svg. Do not edit.\nexport const materialDefs = ${JSON.stringify(defs)};\n`,
  );
  console.log("src/lib/materials.generated.ts");
}
