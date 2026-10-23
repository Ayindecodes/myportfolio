# Tactile redesign brief

Locked 2026-10-23 · branch `redesign/tactile` · the reference teardown is in Claude Docs ("yashb.xyz — design and build teardown").

A toy shelf of the things I build: soft vinyl objects that squish back, on warm paper, drawn over in purple ink.

## 1. What "fully" means

**Adopt** from yashb.xyz: the cream, tactile look; inflated and plush materials; spring physics on everything pressable; short sounds and haptics; numbered sections; the load and scroll choreography.

**Never copy**: his images, 3D renders, sounds, wording or source code; his motifs (bomb, crown, "YASH" balloons); his font pair; his blue.

**Do better than the reference**:

- Render real text on the server.
- Ship a social preview image.
- Keep images light and fonts trimmed.
- Meet 4.5:1 contrast on small text.
- Wrap every section in `<main>`, with a skip link and proper tabs.
- Show project status.
- Add a mute toggle.
- Let rotating text pause.
- Fix the portrait-tablet hero.
- Keep a footer.

## 2. Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Accent | Purple `#8055f5` for fills and doodles, `#6a3fe0` for small text | Keeps the existing brand; the only option where both fills and text pass contrast |
| Material | Inflated vinyl and stitched plush, lit from the upper left | Matches the reference's feel without reusing its objects |
| Hero props | Inflatable padlock (security-first) and bank card (fintech) | Tells my story; the padlock pops open on click as the hidden extra |
| Display font | Fredoka, weight 700, width 125 | Round terminals inflate cleanly into balloon letters |
| Heading font | Kalam 700 (400 for the hero line) | Readable handwriting for voice |
| Body and labels | Geist and Geist Mono (unchanged) | Already wired; keeps continuity |
| Stack | Next.js 16, React 19, Tailwind v4, plus GSAP 3 with ScrollTrigger and a custom spring engine | Server rendering, metadata and image optimisation; no Framer Motion, Three.js or smooth-scroll library |

## 3. Mood

Warm, tactile, playful, handmade, soft-premium, credible. Not neon, not dark, not glassy, never a gimmick that blocks content.

## 4. Palette (contrast measured against the background)

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `bg` | `#f1ede4` | Page | — |
| `surface` | `#fffdf9` | Cards, chips highlight | — |
| `ink` | `#141414` | Headings, primary text | 15.8:1 |
| `body` | `#46413a` | Paragraphs | 8.7:1 |
| `muted` | `#6b6457` | Dates, labels, small meta | 5.0:1 |
| `faint` | `#a39b8c` | Decoration only, never text | 2.4:1 |
| `accent` | `#8055f5` | Underlines, doodles, sticker, button fills | 4.0:1 (white text on it 4.6:1) |
| `accent-ink` | `#6a3fe0` | Small accent text and links | 5.3:1 |
| `live` | `#1d7a4f` | "Live" status | 4.6:1 |

- **Cream vinyl:** radial gradient at 38% 14%: `#fffdf9` → `#f3eee4` (60%) → `#e4dac8`.
- **Dark vinyl:** linear 165°: `#34303a` → `#1b1820` (47%) → `#0f0d12`. It's a purple-tinted black; text `#f7f3ec` on it is 15.9:1.
- **Shadows:** every surface stacks a drop shadow, a top sheen and an underside shade. They're tinted `#2a2430` and `#9a8f7c`, never pure black.

## 5. Type roles

| Role | Face | Notes |
| --- | --- | --- |
| Balloon name | Fredoka 700, width 100 | Letter outlines as SVG paths with a balloon filter; width 100 keeps the six letters tall (decided in Phase 6) |
| Menu links, number seals | Fredoka 700, width 112–125 | |
| Section headings, project titles | Kalam 700 | Fluid `clamp()` sizes with mobile overrides |
| Hero line, captions, labels | Kalam 400–700 | |
| Paragraphs, nav, buttons | Geist 400–500 | Line height 1.6–1.7 |
| Dates, chips, eyebrows, links | Geist Mono 400 | Uppercase with tracking only at 11–13 px |

## 6. Motion principles

1. **Physics over curves for anything pressable.** Springs are tuned by stiffness and damping. Timed tweens are only for entrances and drawing.
2. **Two easings:**
    - Ease-out: `cubic-bezier(0.22, 1, 0.36, 1)`.
    - Spring overshoot: `cubic-bezier(0.34, 1.56, 0.64, 1)`.
3. **Hover effects** only under `(hover: hover) and (pointer: fine)`. Touch gets press physics instead.
4. **Sound** is two short pops on deliberate presses only: letters, props and the padlock. Never on load. A visible mute toggle remembers the choice.
5. **Haptics:** an 8 ms vibration after long presses, only where supported.
6. **Reduced motion:** every effect has a static version. Rotating text stops. Content swaps instantly.
7. **Performance:** loops sleep off-screen. The hero settles within about 2.5 s, and text is readable in the HTML before any animation runs.

## 7. Section map

| # | Section | Content | Open items |
| --- | --- | --- | --- |
| — | Nav | Logo reel (wordmark ↔ avatar), cream pill links with a sliding ink indicator, "Let's talk" | — |
| — | Hero | Balloon "AYINDE" split into door halves, padlock and card props, one-line intro, a fan of 4 project cards | Hero line (task 11), card picks (task 20) |
| 01 | Work | Two-tab toggle (Products / Side builds); project rows with status badges, chips and Visit links | Copy approval (task 15) |
| 02 | About | Rotating role, paragraph, résumé link, avatar portrait, GitHub calendar (Ayindecodes), stack marquee | Roles (task 13), avatar photo (task 23) |
| 03 | Journey | Ruled rows: education plus a dated build timeline from GitHub (decided in Phase 1) | Résumé regenerated in Phase 2 (task 17) |
| 04 | Contact | Copy-email button, inflated social icons (GitHub, LinkedIn, Email, Résumé), closing sticker | Keep the form? (task 89) |
| — | Footer | © year, back to top | — |

## 8. Targets

| Area | Target | Checked with |
| --- | --- | --- |
| Speed | Main content shown within 2.5 s on mobile; layout shift under 0.05 | Lighthouse mobile |
| Weight | First load ≤ 1 MB in total; each image ≤ 150 KB; JavaScript ≤ 200 KB gzipped | Network panel, build output |
| Fonts | Four families, only the weights in use | Build output |
| Accessibility | Lighthouse 100; text under 24 px at ≥ 4.5:1; full keyboard path; screen-reader read-through | Lighthouse, manual |
| Motion | Zero animation under reduced motion | Emulated `prefers-reduced-motion` |
| Resilience | Hero text, nav and project links readable with JavaScript off | JS-disabled check |
| Sharing | Title, description and a 1200×630 image in link previews | Open Graph debugger |

## 9. Reference board

Screenshots of the reference live in `.reference/yashb/` with notes. The folder is git-ignored: study material only, never shipped.
