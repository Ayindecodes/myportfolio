# Design assets

Source files for every image, sound and document the redesign ships. Outputs are generated; edit the sources and re-run the command.

| Command | Builds | From |
| --- | --- | --- |
| `npm run assets` | `src/assets/redesign/*.webp`, `src/app/icon.svg`, `src/app/apple-icon.png` | `design/assets/*.svg`, `_tiles.json`, `design/screens/` |
| `npm run assets -- logo-` | Only outputs whose name contains `logo-` | Same |
| `npm run og` | `src/app/opengraph-image.png` (1200×630) | `design/og/og.html` |
| `npm run resume` | `public/resume/resume.pdf` (one page) | `design/resume/resume.html` |
| `python3 design/generate-sounds.py` | `public/sounds/*.wav` | The script itself (synthesised) |
| `FFMPEG=… node design/music/build-music.mjs` | `public/music/*.mp3` (background music) | Free Music Archive tracks (CC BY 4.0), cached in `design/.cache/music/` |
| `npm run wordmark` | `src/components/hero/wordmark.generated.ts` (the hero's balloon letters as SVG paths) | Fredoka, downloaded once into the git-ignored `design/.cache/` |

`npm run og` and `npm run resume` use headless Chromium through `playwright-core`. If no browser is cached, run `npx playwright-core install chromium`.

## Lighting recipe (one look for everything)

`design/assets/_materials.svg` defines the shared filters, and the render script injects them into every SVG:

- `vinyl` for large shapes and `vinylSmall` for details. Both treat a blurred copy of the shape as a height map and light it with one distant light from the **upper left** (azimuth 225°, elevation 40–52°), a warm fill (`#fff6ea`) and a soft specular sheen.
- `contactShadow` is the blurred ellipse under each object, tinted `#2a2430`, never pure black.
- `glow` is for emissive bits, such as the avatar's eyes.

New objects must use these filters rather than their own lighting, so they sit in the same world.

## Inventory

| Asset | Use | Status |
| --- | --- | --- |
| `avatar.webp`, `avatar-head.webp` | About portrait; second frame of the nav logo reel | **Placeholder** (anonymous hacker) |
| `padlock-body.webp` + `padlock-shackle.webp` | Hero prop; separate layers so the shackle can pop open | Final |
| `card.webp` | Hero prop | Final |
| `logo-*.webp` (10) | Tech-stack strip: React, Next.js, TypeScript, Python, Django, Tailwind, PostgreSQL, Docker, FastAPI, Git | Final |
| `social-*.webp` (4) | Contact: GitHub, LinkedIn, Email, Résumé | Final |
| `shot-*.webp` (4) | Real screenshots in a browser frame: Quicksurf, LandKrypt, NobleKin Bio, Keyra Protocol | Final; refresh when the sites change |
| `cover-*.webp` (3) | Illustrated covers (not screenshots): Web X-Ray, PayIntent, MediRemind | Placeholder until real product shots exist |
| `public/sounds/pop.wav`, `pop-low.wav`, `unlock.wav` | Letters and squishy objects; hero props; padlock opening | Final |
| `src/app/opengraph-image.png` | Link previews | Final; re-run after copy changes |
| `public/resume/resume.pdf` | Résumé download | Final; edit `resume.html` and re-run |

The nav wordmark isn't an image. It's live SVG text in Fredoka with the `vinyl` filter, the same technique as `og.html`. Journey logo tiles are CSS monograms, so they need no images.

## Replacing the placeholder avatar

1. Redraw `design/assets/avatar.svg` from a photo (or swap in a rendered portrait with a transparent background). Keep the 800×800 canvas and the file name.
2. If the head moves, adjust the `avatar-head` crop in `render-assets.mjs`.
3. Run `npm run assets -- avatar`, then `npm run og`.

## Sources and licences

- Brand logos come from [Simple Icons](https://simpleicons.org) 16.35.0 (CC0-1.0) and are used only to name technologies. The LinkedIn, email and résumé glyphs are hand-drawn.
- Sounds are synthesised by `generate-sounds.py`; no samples are used.
- Background music is five CC BY 4.0 tracks from Free Music Archive (credits in `src/content/music.ts` and the root README), shortened to at most 2½ minutes, loudness-matched to -16 LUFS and re-encoded at 96 kbps.
- The hero letters are outlines of [Fredoka](https://github.com/googlefonts/Fredoka) (SIL Open Font License 1.1), weight 700, width 100. The balloon material, glints and spacing live in `src/components/hero/`.
- Screenshots are of Ayinde's own projects, captured from their live sites.
- Nothing here is taken from yashb.xyz. Its screenshots live only in the git-ignored `.reference/` folder.
