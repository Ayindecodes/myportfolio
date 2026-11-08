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
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

// 02 · About (copy from docs/redesign/CONTENT.md §12–13)
export const about = {
  // Each role carries its own article, so "an API builder" reads right.
  roles: ["a full-stack developer", "an API builder", "a fintech tinkerer"],
  paragraph:
    "I care as much about what happens after you tap Pay as about how the button feels: the request that only goes through once, the webhook that confirms it, the receipt that lands. Most of my work lives where payments, APIs and interfaces meet, and I’m happiest owning all three.",
  // Confirmed by Ayinde: company work never reaches the public GitHub account, so everything shown here is personal.
  personalNote:
    "Everything in Selected work is a personal project. My day-to-day work is for a company, and that code lives in private repositories, so you won’t find it on my GitHub.",
  portrait: {
    // An anonymous chibi on purpose (Ayinde's choice); see design/README.md to swap in a real portrait.
    alt: "Ayinde as a chibi vinyl toy: a big purple hood with headphones, glowing eyes and a happy smile, and a laptop covered in stickers",
    label: "me, in vinyl",
  },
};

export const github = {
  user: "Ayindecodes",
  /**
   * The contribution calendar stays off the home page while this account's graph undercounts: recent commits use
   * an email that GitHub credits to another account. It always shows on /styleguide for review.
   */
  showCalendar: false,
};

export const stack = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "HTML & CSS"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "React Native & Expo"] },
  { group: "Backend", items: ["Django & DRF", "FastAPI", "Node.js", "REST APIs", "JWT auth"] },
  { group: "Data & infra", items: ["PostgreSQL", "Redis", "MongoDB", "Docker", "AWS (EC2, S3)", "Vercel", "Render"] },
  { group: "Tooling", items: ["Playwright", "Git & GitHub", "CI/CD"] },
];

// 03 · Journey. Work history as Ayinde gave it (2026-10-23), newest first. The three current employers stay unnamed
// by choice; titles pair with start dates in the order Ayinde listed them. Lines are written from the titles, phrased
// professionally at Ayinde's request.
export const experience = [
  {
    when: "May 2026 – now · hybrid",
    place: "Company name private",
    title: "API tester & team lead",
    summary: "",
    bullets: [
      "Test APIs for correctness, reliability and edge cases before they reach users.",
      "Lead the team, coordinating the work and keeping delivery on track.",
    ],
    current: true,
  },
  {
    when: "Jan 2026 – now · hybrid",
    place: "Company name private",
    title: "Full-stack developer",
    summary: "",
    bullets: [
      "Build and ship features across the stack, from the interface to the API and database behind it.",
      "Maintain and improve existing code on both the front end and the back end.",
    ],
    current: true,
  },
  {
    when: "Aug 2025 – now · hybrid",
    place: "Company name private",
    title: "UI/UX designer",
    summary: "",
    bullets: [
      "Design user interfaces and user flows that turn product requirements into clear, usable screens.",
      "Work closely with developers so designs ship as intended.",
    ],
    current: true,
  },
  {
    when: "2024 · 6 months",
    place: "Dervac Hub · Lagos",
    title: "Front-end developer intern",
    summary: "",
    bullets: ["Turned designs into responsive web pages and reusable interface components."],
    current: false,
  },
];

export const education = [
  {
    field: "Software Engineering",
    institution: "University of Lagos (UNILAG)",
    years: "2022–2026",
  },
  {
    field: "Software Development",
    institution: "NIIT Ikeja",
    years: "2025 · one year",
  },
];

// 04 · Say hello (copy from docs/redesign/CONTENT.md §19)
export const contact = {
  label: "Say hello",
  heading: "Let’s build something\npeople can rely on.",
  lead: "Email is the quickest way to reach me. One click copies the address.",
  sticker: "Thanks for stopping by!",
};
