import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="page flex min-h-svh flex-col justify-center py-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 max-w-[14em] text-[clamp(2rem,5vw,3.75rem)] leading-[1] font-semibold tracking-[-0.045em]">
        This page doesn’t exist, but the rest of the site does.
      </h1>
      <Link href="/" className="btn btn-primary mt-10 self-start">
        Back to the homepage
      </Link>
    </main>
  );
}
