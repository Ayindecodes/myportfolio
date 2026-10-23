// One-line footer (task 92): © year, where it's built, and a way back up.

import { site } from "@/content/site";

export function Footer({ year }: { year: number }) {
  return (
    <footer className="site-footer">
      <div className="page footer-row">
        <p>
          © {year} {site.name} · Built in Lagos
        </p>
        <a href="#top" className="footer-top">
          Back to top
          <span aria-hidden="true" className="nudge-u">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
