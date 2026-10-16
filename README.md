# Ayinde Ojikutu, portfolio

Personal site for Abdulrahman Ayinde Ojikutu, full-stack developer in Lagos. It's a single page with a hero, about, selected work, skills and contact. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Editing content

All personal content lives in two files:

- `src/content/site.ts`: name, role, bio, email, social links, résumé path, skills, education and contact copy.
- `src/content/projects.ts`: featured projects (stacked cards) and the shorter "More projects" list. Each project has its own links, stack, status and brand tint. Featured projects show either a screenshot (`image`) or, if there isn't one, a typographic panel built from `preview`.

Project screenshots live in `src/assets/projects/` and are imported in `projects.ts`. Next.js resizes them and generates blur placeholders. The résumé is served from `public/resume/resume.pdf`.

Design tokens (colours, gutter, radii) are CSS variables at the top of `src/app/globals.css`. They're exposed to Tailwind as `bg-surface`, `text-dim`, `border-hairline`, `bg-accent` and so on.

## Contact form

The form doesn't send anything through a server. It validates the input, then opens the visitor's email app with the message filled in, addressed to the email in `site.ts`. To accept messages directly, add a route handler that uses an email provider and keep the API key server-side.

## Deploying

Deploy on Vercel (or any Node host). Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) so canonical URLs, Open Graph tags, `robots.txt` and `sitemap.xml` point at your domain. On Vercel, the production URL is used automatically if the variable is unset.

## Credits

The layout is adapted from [stanleyojima.vercel.app](https://stanleyojima.vercel.app/). Geist and Bricolage Grotesque are used under the SIL Open Font License (`src/assets/fonts/Geist-OFL.txt` covers the Geist files bundled for the Open Graph image).
