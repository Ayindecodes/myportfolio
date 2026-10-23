import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="page flex min-h-svh flex-col justify-center py-24">
      <p className="type-meta">Error 404</p>
      <h1 className="type-h1 mt-6 max-w-[14em]">This page popped.</h1>
      <p className="type-body mt-4">The rest of the site is still inflated.</p>
      <Link href="/" className="btn btn-accent mt-10 self-start">
        Back to the homepage
      </Link>
    </main>
  );
}
