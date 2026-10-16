import type { FeaturedProject, ProjectStatus } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";

const statusStyles: Record<ProjectStatus, { label: string; text: string; dot: string }> = {
  live: { label: "Live", text: "text-live", dot: "bg-live" },
  building: { label: "Building now", text: "text-accent-ink", dot: "bg-accent-ink" },
  "open-source": { label: "Open source", text: "text-dim", dot: "bg-dim" },
};

export function ProjectCard({ project }: { project: FeaturedProject }) {
  const status = statusStyles[project.status];
  const headingId = `${project.slug}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className="grid overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface shadow-[var(--shadow-card)] lg:min-h-[min(670px,calc(100svh-120px))] lg:grid-cols-[65fr_35fr]"
    >
      <div className="relative min-h-[240px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-0">
        <ProjectVisual project={project} href={project.links[0].href} />
      </div>

      <div className="flex flex-col justify-center gap-6 p-6 sm:p-10 lg:p-[38px]">
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-3.5">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-[11px] font-display text-[17px] font-extrabold text-white"
            style={{ backgroundColor: project.tint }}
          >
            {project.name[0]}
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-base font-semibold tracking-[-0.015em]">{project.name}</span>
            <span className="mt-0.5 block text-[13.5px] text-dim">{project.kind}</span>
          </span>
          {project.year && <span className="meta text-[11.5px] tracking-[0.08em] text-dim">{project.year}</span>}
        </div>

        <p className={`meta inline-flex items-center gap-2 text-[10.5px] ${status.text}`}>
          <span aria-hidden="true" className={`size-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </p>

        <div>
          <h3
            id={headingId}
            className="text-[clamp(1.5rem,2.4vw,1.92rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance"
          >
            {project.title}
          </h3>
          <p className="mt-4 text-[14.75px] leading-[1.6] text-dim">{project.description}</p>
        </div>

        <ul aria-label="Built with" className="flex flex-wrap gap-x-3 gap-y-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="meta text-[10.5px] tracking-[0.08em] text-dim/80">
              {tech}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-hairline pt-5">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[14.5px] font-medium transition-colors hover:text-accent-ink"
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
      </div>
    </article>
  );
}
