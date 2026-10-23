# Redesign content (Phase 1)

Draft 2026-10-23 for `redesign/tactile`. Every claim traces to a repo, a live site or something you confirmed. **Decided** means you chose it; **Draft** means it's waiting for your OK.

All copy is written fresh: no wording or sentence pattern is lifted from yashb.xyz.

## 11 · Hero line (Draft)

> I'm Ayinde. I build web apps and **the APIs behind them**, from Lagos.

The bold words get the purple hand-drawn underline. Alternatives:

- "Friendly interfaces, careful backends. I'm Ayinde, and I build both in Lagos."
- "I'm Ayinde, a Lagos developer who builds the app and the API it talks to."

## 12 · About (Draft)

**Heading:** I'm Ayinde, *[rotating role, with its article: a full-stack developer / an API builder / a fintech tinkerer]* who builds friendly interfaces on top of careful backends.

**Personal-projects note (Decided, requested 2026-10-23):** Everything in Selected work is a personal project. My day-to-day work is for a company, and that code lives in private repositories, so you won’t find it on my GitHub.

**Paragraph:** I care as much about what happens after you tap Pay as about how the button feels: the request that only goes through once, the webhook that confirms it, the receipt that lands. Most of my work lives where payments, APIs and interfaces meet, and I'm happiest owning all three.

Sources: Quicksurf's idempotent purchases and Paystack webhooks; your "security-first" GitHub bio.

## 13 · Rotating roles (Draft)

1. full-stack developer
2. API builder
3. fintech tinkerer

## 14 · Work tabs (Decided)

| Tab | Projects, in order |
| --- | --- |
| **Products** (default) | Quicksurf, Web X-Ray, PayIntent, LandKrypt |
| **Side builds** | NobleKin Bio, MediRemind, Keyra Protocol |

## 15 · Projects (Draft)

| Project | Tab | Status | Years | Copy | Stack | Links |
| --- | --- | --- | --- | --- | --- | --- |
| Quicksurf | Products | Live | 2025–26 | Top up airtime and data in a few taps. I built the Django REST backend, with VTpass for delivery, Paystack-funded wallets and webhooks, JWT auth, idempotent purchases and reward points, plus the Next.js app on top. | Django REST, PostgreSQL, Redis, Paystack, Next.js, TypeScript | [Live site](https://quicksurf-frontend.vercel.app) · [Backend code](https://github.com/Ayindecodes/QuickSurf) · [Frontend code](https://github.com/Ayindecodes/quicksurf-frontend) |
| Web X-Ray | Products | Building | 2026 | A testing robot that proves a bug before reporting it. It explores a site you're allowed to test, runs real user journeys on desktop and mobile, then writes a Playwright test and runs it to confirm the failure. | FastAPI, PostgreSQL, Redis, Playwright, Next.js, Tailwind CSS | [Code](https://github.com/Ayindecodes/webpush) |
| PayIntent | Products | Open source | 2026 | Payments with rules attached: hold money until delivery is confirmed, cap spending by category, or release it once the work is approved. An Expo app that also handles wallets, transfers and bill payments. | React Native, Expo, TypeScript, Zustand | [Code](https://github.com/Ayindecodes/fepayintent) |
| LandKrypt | Products | Live | — | A marketplace that splits virtual properties into fractional NFTs. Holders stake, vote on how a property develops and earn rewards, with daily XP streaks that keep them coming back. | React, Web3, Solidity | [Live site](https://landkrypt-fe.vercel.app) |
| NobleKin Bio | Side builds | Live | — | Website for an African bioinformatics institute, with courses in genomics, transcriptomics and biostatistics. | Next.js, TypeScript, Tailwind CSS | [Live site](https://noblekinbio.com) |
| MediRemind | Side builds | Open source | 2025–26 | Medication reminders, mood logging and therapy sessions, with email-code sign-in. | Next.js, TypeScript, Resend | [Code](https://github.com/Ayindecodes/MediRemind) |
| Keyra Protocol | Side builds | Live | 2025 | Landing page for a GameFi and DeFi project: tokenomics, FAQs and a whitepaper. | HTML, CSS, JavaScript | [Live site](https://keyra-sepia.vercel.app) · [Code](https://github.com/Ayindecodes/keyra-) |

Status badges: **Live** (green), **Building** (purple), **Open source** (muted).

## 16 · Journey: work, education and build timeline (Decided)

**Heading:** How I got here, one build at a time. ("one repo" became "one build" once company work, which isn't on GitHub, joined the section.)

**Work** (given by you on 2026-10-23, newest first; current employers unnamed by your choice; titles paired with start dates in the order you listed them):

| When | Where | Role | Lines (written from the titles, at your request) |
| --- | --- | --- | --- |
| May 2026 – now · hybrid | Company name private | API tester & team lead | Test APIs for correctness, reliability and edge cases before they reach users. · Lead the team, coordinating the work and keeping delivery on track. |
| Jan 2026 – now · hybrid | Company name private | Full-stack developer | Build and ship features across the stack, from the interface to the API and database behind it. · Maintain and improve existing code on both the front end and the back end. |
| Aug 2025 – now · hybrid | Company name private | UI/UX designer | Design user interfaces and user flows that turn product requirements into clear, usable screens. · Work closely with developers so designs ship as intended. |
| 2024 · 6 months | Dervac Hub · Lagos | Front-end developer intern | Turned designs into responsive web pages and reusable interface components. |

**Education:** Software Engineering · University of Lagos (UNILAG), 2022–2026. Software Development · NIIT Ikeja, 2025 (one year).

**Personal builds** (GitHub repo creation and last-push dates, checked 2026-10-23; LandKrypt and NobleKin Bio left out because their dates aren't verifiable):

| When | Entry | One line |
| --- | --- | --- |
| Apr 2026 – now | **Web X-Ray** | Started an automated website tester; still shipping updates. |
| Apr 2026 | **PayIntent** | Built a rule-based payments app in Expo and React Native. |
| Dec 2025 – Jan 2026 | **MediRemind** | Built medication reminders with email-code sign-in in Next.js. |
| Oct 2025 | **Keyra Protocol** | Shipped a landing page for a GameFi and DeFi project. |
| Aug 2025 – Apr 2026 | **Quicksurf** | Backend from August, web app from September: airtime and data payments end to end. |
| Oct 2024 | **First public code** | HTML and Tailwind practice sites, the start of building in public. |

## 17 · Résumé (Decided: regenerate)

I'll build a one-page PDF during the asset phase from verified content only:

1. Name, role, Lagos, then email, GitHub, LinkedIn and site URL. No phone number.
2. A two-line summary taken from the About copy.
3. The Products projects (one or two lines each), plus Side builds on one line.
4. Skills grouped as on the site.
5. Education.

The old `public/resume/resume.pdf` will be replaced. It still lists the unverified "Tech Studio" and "Digital Agency" roles.

## 18 · Social links (Decided)

GitHub (github.com/Ayindecodes) · LinkedIn (linkedin.com/in/ayindecodes, confirmed by you) · Email (techblazecodes@gmail.com) · Résumé. No X/Twitter.

## 19 · Microcopy (Draft)

| Place | Copy |
| --- | --- |
| Section labels | 01 Selected work · 02 About me · 03 Journey · 04 Say hello |
| Work heading and intro | **Built, shipped, still tinkering.** Personal projects: payments, developer tools and a few side builds. Switch tabs for the smaller ones. |
| Journey heading | **How I got here, one build at a time.** |
| Contact heading | **Let's build something people can rely on.** |
| Project links | "Open project ↗" · "View code ↗" · cursor pill: "Open ↗" |
| Portrait label | "me, in vinyl" |
| Copy-email button | "Copied!" (announced: "Email address copied") |
| Closing sticker | "Thanks for stopping by!" |
| Sound toggle | "Sound on" / "Sound off" |
| Menu hint | "Tip: press ⌘K anywhere to open this menu." |
| Nav button | "Let's talk" |
| Résumé link | "Download résumé ↗" |
| GitHub calendar | Eyebrow "GitHub"; footer "[n] contributions in the last year" |
| Stack strip | Eyebrow "Tools I use" |
| 404 | **This page popped.** The rest of the site is still inflated. [Back to the homepage] |
| Footer | © [year] Ayinde Ojikutu · Built in Lagos · Back to top ↑ |

## 20 · Hero card fan (Draft)

Four cards, left to right: **Quicksurf, Web X-Ray, PayIntent, LandKrypt** (the Products tab). Clicking a card opens Work on the Products tab and scrolls to that project. Card images are made in Phase 2 (task 28). Captions are the project names in Kalam.
