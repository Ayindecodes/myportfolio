// Personal details, links and copy used across the site.
// Edit this file (and projects.ts) to update the portfolio's content.

const productionUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  url: productionUrl,
  name: "Ayinde Ojikutu",
  fullName: "Abdulrahman Ayinde Ojikutu",
  alias: "TechBlaze",
  initials: "AO",
  wordmark: "ayinde ojikutu",
  role: "Full-Stack Developer",
  location: "Lagos, Nigeria",
  locationShort: "Lagos, NG",
  availability: "Open to work",
  description:
    "Ayinde Ojikutu is a full-stack developer in Lagos building web apps with React, Next.js, Python and Django, with a focus on fintech and security.",
  email: "techblazecodes@gmail.com",
  resume: {
    href: "/resume/resume.pdf",
    downloadName: "Abdulrahman-Ojikutu-Resume.pdf",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/Ayindecodes" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayindecodes" },
  ],
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  statement: "I build full-stack web apps, from the API to the last pixel.",
  badge: {
    title: "Full-Stack Developer",
    stack: "React · Next.js · Django",
    buildingLabel: "Building",
    building: "Quicksurf",
  },
};

export const about = {
  yearsBuilding: "2+",
  statement:
    "I’m Ayinde, a full-stack developer in Lagos. I build web apps end to end: React and Next.js interfaces on top of Python and Django APIs, with a security-first habit and a soft spot for fintech.",
};

export const capabilities = [
  "Full-stack web applications",
  "REST API design",
  "Payments and wallet flows",
  "Authentication and security",
  "Responsive, accessible interfaces",
  "Mobile apps with React Native",
  "Browser automation and testing",
  "Web3 front-ends",
];

export const stack = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "HTML & CSS"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "React Native & Expo"] },
  { group: "Backend", items: ["Django & DRF", "FastAPI", "Node.js", "REST APIs", "JWT auth"] },
  { group: "Data & infra", items: ["PostgreSQL", "Redis", "MongoDB", "Docker", "AWS (EC2, S3)", "Vercel", "Render"] },
  { group: "Tooling", items: ["Playwright", "Git & GitHub", "CI/CD"] },
];

export const howIWork =
  "I like owning a feature from the database to the screen. On the backend that means input validation, idempotent payment flows and secrets that never leave the server. On the frontend it means pages that load fast, work on a phone and stay usable from a keyboard. I write things down as I go, from specs to architecture notes, so the next person can pick the work up.";

export const education = [
  {
    award: "National Diploma",
    abbreviation: "ND",
    field: "Software Engineering",
    institution: "Lagos City Computer College",
    years: "2023–2025",
  },
];

export const contact = {
  lead: { before: "Let’s build something people can ", accent: "rely on", after: "." },
};
