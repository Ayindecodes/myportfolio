import type { StaticImageData } from "next/image";
import landkryptShot from "@/assets/projects/landkrypt.webp";
import quicksurfShot from "@/assets/projects/quicksurf.webp";

export type ProjectLink = { label: string; href: string };

export type ProjectStatus = "live" | "building" | "open-source";

export type FeaturedProject = {
  slug: string;
  name: string;
  /** Short label used in the hero list, e.g. "airtime & data payments". */
  tagline: string;
  kind: string;
  /** Brand colour used to tint the project's preview panel. */
  tint: string;
  year?: string;
  status: ProjectStatus;
  title: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  /** Real screenshot of the product. Without one, `preview` is rendered as a typographic panel. */
  image?: { src: StaticImageData; alt: string };
  preview?: { title: string; items: { label: string; text?: string }[] };
};

export type MinorProject = {
  name: string;
  description: string;
  stack: string[];
  year?: string;
  links: ProjectLink[];
};

const github = (repo: string) => `https://github.com/Ayindecodes/${repo}`;

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "quicksurf",
    tint: "#0f6a80",
    name: "Quicksurf",
    tagline: "airtime & data payments",
    kind: "Fintech web app",
    year: "2025–26",
    status: "live",
    title: "Airtime and data top-ups, backed by a real payments API",
    description:
      "A Django REST backend that buys airtime and data through VTpass, with Paystack-funded wallets and webhooks, JWT auth, idempotent purchases and reward points. The Next.js client covers sign-up, the dashboard and checkout.",
    stack: ["Django REST", "PostgreSQL", "Redis", "Paystack", "Next.js", "TypeScript"],
    links: [
      { label: "Live site", href: "https://quicksurf-frontend.vercel.app" },
      { label: "Backend code", href: github("QuickSurf") },
      { label: "Frontend code", href: github("quicksurf-frontend") },
    ],
    image: {
      src: quicksurfShot,
      alt: "Quicksurf landing page with a form to buy airtime or data by network, amount and phone number",
    },
  },
  {
    slug: "web-x-ray",
    tint: "#8055f5",
    name: "Web X-Ray",
    tagline: "automated website QA",
    kind: "Developer tool",
    year: "2026",
    status: "building",
    title: "Website testing that proves a bug before reporting it",
    description:
      "Point it at a site you’re authorised to test and it explores in an isolated browser, runs user journeys on desktop and mobile, records evidence and diagnoses failures. It then writes a Playwright reproduction test and runs it before calling anything reproduced.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Playwright", "Next.js", "Tailwind CSS"],
    links: [{ label: "Source code", href: github("webpush") }],
    preview: {
      title: "How it works",
      items: [
        { label: "Explore" },
        { label: "Run journeys" },
        { label: "Record evidence" },
        { label: "Diagnose" },
        { label: "Generate test" },
        { label: "Execute it" },
      ],
    },
  },
  {
    slug: "payintent",
    tint: "#2f5bd3",
    name: "PayIntent",
    tagline: "rule-based mobile payments",
    kind: "Mobile payments app",
    year: "2026",
    status: "open-source",
    title: "Payments that only release when the conditions are met",
    description:
      "An Expo app for payments with rules: hold funds until delivery is confirmed, limit spending to set categories, or release only after the work is approved. It also handles wallet funding, bank and in-app transfers, and airtime, data, electricity and TV bills.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand", "React Navigation"],
    links: [{ label: "Source code", href: github("fepayintent") }],
    preview: {
      title: "Payment types",
      items: [
        { label: "Conditional payment", text: "Funds stay secured until you confirm delivery." },
        { label: "Restricted payment", text: "Set spending categories and limits before release." },
        { label: "Completion payment", text: "Release only after work is marked done and approved." },
      ],
    },
  },
  {
    slug: "landkrypt",
    tint: "#c2410c",
    name: "LandKrypt",
    tagline: "fractional real estate on-chain",
    kind: "Web3 platform",
    status: "live",
    title: "Fractional ownership of virtual real estate",
    description:
      "A marketplace that splits virtual properties into fractional NFTs. Holders stake, vote on how a property develops and earn rewards, with daily XP streaks that keep them coming back.",
    stack: ["React", "Web3", "Solidity"],
    links: [{ label: "Live site", href: "https://landkrypt-fe.vercel.app" }],
    image: {
      src: landkryptShot,
      alt: "LandKrypt landing page headed “Beyond Play: Own The World” with an Explore Marketplace button",
    },
  },
];

export const moreProjects: MinorProject[] = [
  {
    name: "NobleKin Bio",
    description:
      "Website for an African bioinformatics institute, with training in genomics, transcriptomics and biostatistics.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [{ label: "Live site", href: "https://noblekinbio.com" }],
  },
  {
    name: "MediRemind",
    description: "Medication reminders, mood logging and therapy sessions, with email-code sign-in.",
    stack: ["Next.js", "TypeScript", "Resend"],
    year: "2026",
    links: [{ label: "Source code", href: github("MediRemind") }],
  },
  {
    name: "Keyra Protocol",
    description: "Landing page for a GameFi and DeFi project, with tokenomics, FAQs and a whitepaper.",
    stack: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    links: [
      { label: "Live site", href: "https://keyra-sepia.vercel.app" },
      { label: "Source code", href: github("keyra-") },
    ],
  },
];

export const selectedWorkLede = "Four projects across fintech, developer tooling, mobile payments and web3.";

export const allProjectsHref ="https://github.com/Ayindecodes?tab=repositories";
