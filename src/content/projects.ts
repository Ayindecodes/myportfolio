// Projects shown in Work (01) and the hero's card fan. Copy is from docs/redesign/CONTENT.md (§14–15);
// every claim traces to the repo or live site. The first link is the main one: the project image opens it.

import type { StaticImageData } from "next/image";
import coverMediRemind from "@/assets/redesign/cover-mediremind.webp";
import coverPayIntent from "@/assets/redesign/cover-payintent.webp";
import coverWebXRay from "@/assets/redesign/cover-webxray.webp";
import shotKeyra from "@/assets/redesign/shot-keyra.webp";
import shotLandKrypt from "@/assets/redesign/shot-landkrypt.webp";
import shotNobleKin from "@/assets/redesign/shot-noblekin.webp";
import shotQuicksurf from "@/assets/redesign/shot-quicksurf.webp";

export type ProjectStatus = "live" | "building" | "open-source";

export type ProjectLink = { label: string; href: string };

export type WorkTab = "products" | "side";

export type Project = {
  slug: string;
  name: string;
  tab: WorkTab;
  status: ProjectStatus;
  years?: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  image: StaticImageData;
};

export const workTabs: { id: WorkTab; label: string }[] = [
  { id: "products", label: "Products" },
  { id: "side", label: "Side builds" },
];

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  building: "Building",
  "open-source": "Open source",
};

const github = (repo: string) => `https://github.com/Ayindecodes/${repo}`;

export const projects: Project[] = [
  {
    slug: "quicksurf",
    name: "Quicksurf",
    tab: "products",
    status: "live",
    years: "2025–26",
    description:
      "Top up airtime and data in a few taps. I built the Django REST backend, with VTpass for delivery, Paystack-funded wallets and webhooks, JWT auth, idempotent purchases and reward points, plus the Next.js app on top.",
    stack: ["Django REST", "PostgreSQL", "Redis", "Paystack", "Next.js", "TypeScript"],
    links: [
      { label: "Open project", href: "https://quicksurf-frontend.vercel.app" },
      { label: "Backend code", href: github("QuickSurf") },
      { label: "Frontend code", href: github("quicksurf-frontend") },
    ],
    image: shotQuicksurf,
  },
  {
    slug: "web-x-ray",
    name: "Web X-Ray",
    tab: "products",
    status: "building",
    years: "2026",
    description:
      "A testing robot that proves a bug before reporting it. It explores a site you’re allowed to test, runs real user journeys on desktop and mobile, then writes a Playwright test and runs it to confirm the failure.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Playwright", "Next.js", "Tailwind CSS"],
    links: [{ label: "View code", href: github("webpush") }],
    image: coverWebXRay,
  },
  {
    slug: "payintent",
    name: "PayIntent",
    tab: "products",
    status: "open-source",
    years: "2026",
    description:
      "Payments with rules attached: hold money until delivery is confirmed, cap spending by category, or release it once the work is approved. An Expo app that also handles wallets, transfers and bill payments.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand"],
    links: [{ label: "View code", href: github("fepayintent") }],
    image: coverPayIntent,
  },
  {
    slug: "landkrypt",
    name: "LandKrypt",
    tab: "products",
    status: "live",
    description:
      "A marketplace that splits virtual properties into fractional NFTs. Holders stake, vote on how a property develops and earn rewards, with daily XP streaks that keep them coming back.",
    stack: ["React", "Web3", "Solidity"],
    links: [{ label: "Open project", href: "https://landkrypt-fe.vercel.app" }],
    image: shotLandKrypt,
  },
  {
    slug: "noblekin-bio",
    name: "NobleKin Bio",
    tab: "side",
    status: "live",
    description: "Website for an African bioinformatics institute, with courses in genomics, transcriptomics and biostatistics.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [{ label: "Open project", href: "https://noblekinbio.com" }],
    image: shotNobleKin,
  },
  {
    slug: "mediremind",
    name: "MediRemind",
    tab: "side",
    status: "open-source",
    years: "2025–26",
    description: "Medication reminders, mood logging and therapy sessions, with email-code sign-in.",
    stack: ["Next.js", "TypeScript", "Resend"],
    links: [{ label: "View code", href: github("MediRemind") }],
    image: coverMediRemind,
  },
  {
    slug: "keyra-protocol",
    name: "Keyra Protocol",
    tab: "side",
    status: "live",
    years: "2025",
    description: "Landing page for a GameFi and DeFi project: tokenomics, FAQs and a whitepaper.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "Open project", href: "https://keyra-sepia.vercel.app" },
      { label: "View code", href: github("keyra-") },
    ],
    image: shotKeyra,
  },
];
