import type { CSSProperties } from "react";
import { featuredProjects } from "@/content/projects";
import { hero, site } from "@/content/site";
import { IdBadge } from "./IdBadge";

function Wordmark() {
  const words = site.wordmark.split(" ");
  const offsets = words.map((_, index) => words.slice(0, index).join("").length);

  return (
    <h1 className="wordmark relative z-0 mt-auto flex justify-start overflow-visible px-[var(--gutter)] pt-10 md:justify-center md:px-0 md:pt-14">
      <span className="sr-only">
        {site.fullName}, {site.role}
      </span>
      <span aria-hidden="true" className="-mb-[0.06em] md:-mb-[0.04em]">
        {words.map((word, wordIndex) => (
          <span key={word} className="wordmark-word">
            {wordIndex > 0 && <span className="hidden md:inline"> </span>}
            {[...word].map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="wordmark-letter"
                style={{ "--i": offsets[wordIndex] + letterIndex } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}

export function Hero({ year }: { year: number }) {
  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden md:min-h-[820px] lg:min-h-[max(100svh,780px)]">
      <div className="page relative z-10 pt-[112px] md:pt-[152px]">
        <p className="max-w-[10.6em] text-[clamp(1.85rem,4.7vw,3.76rem)] leading-[0.98] font-semibold tracking-[-0.052em] text-balance">
          {hero.statement}
        </p>

        <ul className="mt-7 space-y-0.5" aria-label="Selected projects">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <a
                href={`#${project.slug}`}
                className="meta inline-flex items-center gap-2 py-0.5 text-[10.5px] leading-[1.75] text-dim transition-colors hover:text-ink sm:text-[0.72rem]"
              >
                {project.name}, {project.tagline}
                <span aria-hidden="true" className="nudge-r">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href={site.resume.href} download={site.resume.downloadName} className="btn btn-primary">
            Download résumé
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in touch
          </a>
          <a
            href="#projects"
            className="ml-2 inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-dim link-underline transition-colors hover:text-ink"
          >
            See selected work
            <span aria-hidden="true" className="nudge-d">
              ↓
            </span>
          </a>
        </div>
      </div>

      <div className="relative z-20 mt-14 flex -rotate-[4deg] justify-center lg:static lg:mt-0 lg:block lg:rotate-none">
        <IdBadge year={year} />
      </div>

      <Wordmark />
    </section>
  );
}
