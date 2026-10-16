import { featuredProjects, moreProjects } from "@/content/projects";
import { about, education, site } from "@/content/site";
import { RevealText } from "./RevealText";

export function About() {
  const projectCount = featuredProjects.length + moreProjects.length;
  const stats = [
    { value: about.yearsBuilding, label: "years building for the web" },
    { value: String(projectCount), label: "projects you can open, live or on GitHub" },
    { value: education[0].abbreviation, label: `${education[0].field}, ${education[0].institution}` },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="pt-[clamp(96px,13vw,180px)] pb-[clamp(48px,6vw,80px)]">
      <div className="page">
        <h2 id="about-title" className="sr-only">
          About
        </h2>
        <RevealText
          text={about.statement}
          className="max-w-[24em] text-[clamp(1.6rem,3.45vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-pretty"
        />

        <div className="mt-9 flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-full bg-accent font-display text-[15px] font-extrabold tracking-tight text-white"
          >
            {site.initials.toLowerCase()}
          </span>
          <div className="leading-tight">
            <p className="text-[14.5px] font-semibold">{site.fullName}</p>
            <a
              href={site.resume.href}
              target="_blank"
              rel="noopener"
              className="mt-1 inline-flex items-center gap-1 text-[13px] text-dim transition-colors hover:text-ink"
            >
              Read my résumé
              <span aria-hidden="true" className="nudge-ur">
                ↗
              </span>
            </a>
          </div>
        </div>

        <ul className="mt-[clamp(64px,9vw,128px)] grid gap-12 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <li key={stat.label}>
              <span aria-hidden="true" className="block h-0.5 w-6 rounded-full bg-accent" />
              <p className="mt-5 text-[clamp(2.75rem,5vw,4rem)] leading-none font-bold tracking-[-0.045em]">
                {stat.value}
              </p>
              <p className="mt-3 max-w-[16rem] text-[14.5px] leading-normal text-dim">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
