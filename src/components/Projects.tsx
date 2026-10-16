import { allProjectsHref, featuredProjects, moreProjects, selectedWorkLede } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-[clamp(72px,8vw,104px)] pb-[clamp(72px,7vw,90px)]">
      <div className="page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            id="projects-title"
            className="text-[clamp(3rem,7.6vw,6.08rem)] leading-[0.9] font-extrabold tracking-[-0.055em]"
          >
            Selected work
            <sup className="ml-1 align-super font-mono text-[0.22em] font-normal tracking-normal text-dim">
              ({String(featuredProjects.length).padStart(2, "0")})
            </sup>
          </h2>
          <div className="md:max-w-[300px] md:pb-2">
            <p className="text-base leading-[1.45] text-dim">{selectedWorkLede}</p>
            <a
              href={allProjectsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 rounded-full border border-hairline-strong px-4 py-2.5 text-sm leading-none font-medium transition-colors hover:bg-surface-2"
            >
              All projects on GitHub
              <span aria-hidden="true" className="nudge-ur">
                ↗
              </span>
            </a>
          </div>
        </div>

        <ol className="mt-12 md:mt-16 [&>li+li]:mt-6 md:[&>li+li]:mt-[74px]">
          {featuredProjects.map((project) => (
            <li key={project.slug} id={project.slug} className="stack-card">
              <ProjectCard project={project} />
            </li>
          ))}
        </ol>

        <div className="mt-[clamp(80px,10vw,140px)]">
          <h3 className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            More projects
          </h3>
          <ul className="mt-8 border-t border-hairline">
            {moreProjects.map((project) => (
              <li
                key={project.name}
                className="grid gap-x-8 gap-y-2 border-b border-hairline py-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)_minmax(0,0.9fr)_13rem] lg:items-baseline"
              >
                <p className="flex items-baseline gap-3">
                  <span className="text-lg font-semibold tracking-[-0.02em]">{project.name}</span>
                  {project.year && <span className="meta text-[11px] text-dim">{project.year}</span>}
                </p>
                <p className="text-[15px] leading-relaxed text-dim">{project.description}</p>
                <p className="meta text-[10.5px] leading-relaxed text-dim/80">{project.stack.join(" · ")}</p>
                <ul className="mt-1 flex gap-5 lg:mt-0 lg:justify-end">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[14.5px] font-medium whitespace-nowrap transition-colors hover:text-accent-ink"
                      >
                        {link.label}
                        <span className="sr-only">: {project.name} (opens in a new tab)</span>
                        <span aria-hidden="true" className="nudge-ur text-dim">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
