import type { Metadata, Viewport } from "next";
import { Fredoka, Geist, Geist_Mono, Kalam } from "next/font/google";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { VinylDefs } from "@/components/ui/VinylDefs";
import { site } from "@/content/site";
import { motionBootScript } from "@/lib/motion/boot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// Display face for the number seals and the menu (the balloon name and nav logo are outlines, so nothing on the
// first screen needs it): not preloaded, to keep it off the critical path.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  axes: ["wdth"],
  preload: false,
});

// Handwritten voice for headings, labels and the hero line (only the bold cut is used).
const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: "700",
});

const title = `${site.name}, ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.socials[0].href }],
  creator: site.fullName,
  keywords: [site.fullName, site.alias, site.role, "React", "Next.js", "Django", "Python", "TypeScript", "Lagos"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f1ede4",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the boot script adds the "js" class and data-calm before React hydrates.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} ${kalam.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>
        <VinylDefs />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <MotionRuntime />
      </body>
    </html>
  );
}
