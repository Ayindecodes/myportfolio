import Image from "next/image";
import type { CSSProperties } from "react";
import type { FeaturedProject } from "@/content/projects";

/** Screenshot panel, or a typographic preview built from the project's real features. */
export function ProjectVisual({ project, href }: { project: FeaturedProject; href: string }) {
  return (
    <div
      className="project-visual absolute inset-0 overflow-hidden"
      style={{ "--tint": project.tint } as CSSProperties}
    >
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="project-shot absolute top-[9%] left-[7%] h-full w-[118%] max-w-none rounded-tl-[14px] border-t border-l border-white/10 object-cover object-top-left shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]"
        />
      ) : (
        project.preview && <TypographicPreview name={project.name} preview={project.preview} />
      )}

      {/* Mouse shortcut to the project's first link; keyboard and screen reader users get the labelled links instead. */}
      <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className="absolute inset-0 z-10">
        <span className="view-bubble meta pointer-events-none absolute top-1/2 left-1/2 -mt-12 -ml-12 grid size-24 place-items-center rounded-full bg-accent text-center text-[11.5px] font-semibold tracking-[0.16em] text-white">
          View ↗
        </span>
      </a>
    </div>
  );
}

function TypographicPreview({ name, preview }: { name: string; preview: NonNullable<FeaturedProject["preview"]> }) {
  const hasText = preview.items.some((item) => item.text);

  return (
    <div aria-hidden="true" className="project-shot absolute inset-0 flex flex-col justify-center p-[8%]">
      <div className="mx-auto w-full max-w-lg">
        <p className="meta text-[10.5px] tracking-[0.2em] text-white/55">
          {name} / {preview.title}
        </p>

        {hasText ? (
          <ul className="mt-6 space-y-3">
            {preview.items.map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 shadow-[0_20px_40px_-28px_rgb(0_0_0/0.9)]"
              >
                <p className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{item.label}</p>
                <p className="mt-1 text-[14px] leading-snug text-white/60">{item.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ol className="mt-5">
            {preview.items.map((item, index) => (
              <li
                key={item.label}
                className="flex items-baseline gap-4 border-b border-white/10 py-2.5 last:border-b-0 md:py-3"
              >
                <span className="meta w-6 shrink-0 text-[10.5px] text-white/45">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.25rem,2.6vw,2.1rem)] leading-tight font-semibold tracking-[-0.035em] text-ink">
                  {item.label}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
