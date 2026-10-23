# Ayinde Ojikutu, portfolio

Personal site for Abdulrahman Ayinde Ojikutu, full-stack developer in Lagos. One page: a balloon-letter hero, 01 Selected work, 02 About me, 03 Journey and 04 Say hello. The look is a tactile toy shelf: inflated vinyl objects on warm paper, purple ink doodles, and spring physics on everything you can press.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4, plus GSAP for the scroll-scrubbed hero doors. All other motion runs on a small spring engine in `src/lib/motion`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Editing content

All words live in two files. Change them, save, and the page updates.

### `src/content/site.ts`

| What | Where in the file |
| --- | --- |
| Name, role, email, LinkedIn and GitHub links | `site` |
| Résumé download path and file name | `site.resume` |
| About: rotating roles, paragraph, the personal-projects note, portrait alt text and label | `about` |
| Tools in the drifting chips row | `stack` |
| Work history (newest first; `current: true` adds the green "Now" badge) | `experience` |
| Education | `education` |
| Personal builds timeline (dated from GitHub) | `buildTimeline` |
| Contact heading, lead line and sticker text | `contact` |
| GitHub contribution calendar on or off | `github.showCalendar` |

### `src/content/projects.ts`

Each project has a `tab` (`"products"` or `"side"`), a `status` (`"live"`, `"building"` or `"open-source"`), optional `years`, a `description`, a `stack` list, `links` and an `image`. **The first link is the main one**: it becomes the dark button and the target of the image and its "Open ↗" pill. The Products projects also make up the hero's card fan.

To add a project, add an entry and an image. Use a screenshot in `design/screens/` (turned into a browser mock-up by `npm run assets`) or a cover in `design/assets/`.

## Images, résumé and social preview

Everything visual is generated from sources in `design/`. Edit the source, then run the command. See `design/README.md` for details, including how to swap the placeholder avatar for a real portrait.

| Command | Rebuilds |
| --- | --- |
| `npm run assets` | Vinyl images in `src/assets/redesign/`, the favicon and the Apple touch icon |
| `npm run resume` | `public/resume/resume.pdf` from `design/resume/resume.html` (checks it stays on one page) |
| `npm run og` | The link-preview image `src/app/opengraph-image.png` from `design/og/og.html` |
| `npm run wordmark` | The hero's balloon letters and the nav logo as SVG outlines |
| `FFMPEG=… node design/music/build-music.mjs` | The background beats in `public/music/` (see Music below) |

## Motion, sound and accessibility

- **Calm mode.** The Motion switch in the nav, or the system's reduced-motion setting, turns every animation into a still, complete layout. The Sound switch mutes the pops. Both choices are remembered.
- **Touch and hover.** Press physics work on touch. Hover effects only apply where a real mouse exists, so nothing sticks after a tap.
- **No JavaScript.** Everything renders as server HTML first. With JavaScript off, the page still shows every section and link (both Work lists show, one after the other).
- **Design notes.** Design decisions are in `docs/redesign/BRIEF.md` and all copy in `docs/redesign/CONTENT.md`. `/styleguide` (not indexed) shows the tokens, components and motion.

## Music

Visitors can turn on background beats with the vinyl **Music** switch at the bottom-left (also in the menu). Nothing plays or downloads until they do; browsers only allow sound after a tap or click anyway.

The beats are chill instrumentals with a "slowed + reverb" treatment, hosted on the site, so everyone hears them in full with no account. They're random: each time scrolling settles in a new section, the beat crossfades into a new one, alternating chill and Afro. No beat repeats until its group has played through, and near the end of a beat the next one fades in. The music pauses while the tab is hidden.

| Beat | Artist | Style |
| --- | --- | --- |
| Coffee Jelly | Purrple Cat | Lo-fi |
| Bookworm | Purrple Cat | Lo-fi |
| lo-fi relax | Melatronic | Lo-fi hip hop |
| Busted Tape | 1000 Handz | Chill study |
| Feel It Heal It | Ketsa | Soul |
| Afrobeast | Joseph Sacco | Afrobeats |
| Sun Hat | Joseph Sacco | Afrobeats |
| Amapiano Beats With Log Drum Groove | Alex Morgan | Amapiano |

All eight are from [Free Music Archive](https://freemusicarchive.org) under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), and the player credits the one that's playing. `design/music/build-music.mjs` slowed them to 90% speed, added a soft reverb, shortened them to at most 2¼ minutes, matched their loudness and re-encoded them. To change the set, edit `src/content/music.ts` and the list in that script, then run it. Only use music whose licence allows it: commercial hit songs can't be hosted on the site.

## Contact

There's no message form. Without an email service a form can't send anything itself, so the contact section uses a copy-email button instead: one click copies the address, and it falls back to opening the mail app. To accept messages directly, add a route handler that uses an email provider such as Resend, and keep its API key server-side in an environment variable.

## GitHub calendar

`src/lib/github.ts` reads the public contribution graph on the server and caches it for a day. If GitHub can't be reached, the calendar simply doesn't show. It's switched off on the home page (`github.showCalendar` in `site.ts`) while the graph undercounts. Commits only count for the account whose verified email they're made with, so commit with an email on the Ayindecodes account.

## Deploying

Deploy on Vercel. Pushing a branch builds a preview; merging to `main` updates the live site. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) so canonical URLs, Open Graph tags, `robots.txt` and `sitemap.xml` point at your domain. On Vercel, the production URL is used automatically if it's unset.

## Credits

- Fonts: Geist and Geist Mono, Fredoka and Kalam, all under the SIL Open Font License, loaded through `next/font`. The balloon letters are Fredoka outlines.
- Technology logos are from [Simple Icons](https://simpleicons.org) (CC0).
- Music: "Coffee Jelly" and "Bookworm" by Purrple Cat, "lo-fi relax" by Melatronic, "Busted Tape" by 1000 Handz, "Feel It Heal It" by Ketsa, "Afrobeast" and "Sun Hat" by Joseph Sacco, and "Amapiano Beats With Log Drum Groove" by Alex Morgan. All CC BY 4.0 via Free Music Archive, slowed, with reverb added, shortened and re-encoded.
- The tactile approach was studied from [yashb.xyz](https://yashb.xyz). Only the techniques were adopted; every image, sound, line of copy and line of code here is original.
