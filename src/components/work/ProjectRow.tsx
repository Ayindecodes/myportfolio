// One project in Work (tasks 77–79): a moulded image frame, then status, title, description, tech chips and links.
// The image is a shortcut to the main link for mouse users (with the "Open ↗" pill); the text links are the
// accessible route, so the image link is hidden from assistive tech and skipped by Tab.

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { statusLabels, type Project, type ProjectStatus } from "@/content/projects";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="status-badge" data-status={status}>
      <span className="status-dot" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}

function LinkText({ label }: { label: string }) {
  return (
    <>
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
      <span aria-hidden="true" className="nudge-ur">
        ↗
      </span>
    </>
  );
}

export function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const [main, ...more] = project.links;
  const titleId = `work-${project.slug}-title`;

  return (
    <article id={`work-${project.slug}`} className="project-row" data-flip={flip ? "" : undefined} aria-labelledby={titleId}>
      <Reveal
        as="a"
        href={main.href}
        {...external}
        className="project-media"
        aria-hidden="true"
        tabIndex={-1}
        data-visit="Open ↗"
        draggable={false}
      >
        <span className="project-frame">
          <span className="project-shot">
            <Image src={project.image} alt="" fill sizes="(max-width: 920px) 88vw, 560px" className="object-contain" />
          </span>
        </span>
      </Reveal>

      <Reveal delay={120} className="project-text">
        <p className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          {project.years && <span className="type-meta">{project.years}</span>}
        </p>
        <h3 id={titleId} className="type-h3 mt-4">
          {project.name}
        </h3>
        <p className="type-body mt-4 max-w-[34em]">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} is built with`}>
          {project.stack.map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>
        <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <li>
            <Button variant="dark" href={main.href} {...external}>
              <LinkText label={main.label} />
            </Button>
          </li>
          {more.map((link) => (
            <li key={link.href}>
              <a href={link.href} {...external} className="project-link">
                <LinkText label={link.label} />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}
