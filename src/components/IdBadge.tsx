import { hero, site } from "@/content/site";

const strapText = Array.from({ length: 6 }, () => `${site.name} · Dev pass`).join(" · ");

/** Decorative lanyard ID card; everything on it is repeated elsewhere on the page. */
export function IdBadge({ year }: { year: number }) {
  return (
    <div aria-hidden="true" className="badge-rig">
      <div className="badge-straps">
        <div className="badge-strap">
          <span>{strapText}</span>
        </div>
        <div className="badge-strap">
          <span>{strapText}</span>
        </div>
      </div>
      <div className="badge-clip" />

      <div className="badge-card">
        <div className="badge-slot" />

        <div className="relative overflow-hidden rounded-[0.7em] bg-accent px-[0.9em] pt-[0.8em] pb-[0.2em]">
          <div className="flex items-center justify-between font-mono text-[0.68em] font-semibold tracking-[0.18em] text-white uppercase">
            <span>Dev pass</span>
            <span>{year}</span>
          </div>
          <p className="mt-[0.3em] font-display text-[6.4em] leading-[0.9] font-extrabold tracking-[-0.06em] text-bg">
            {site.initials.toLowerCase()}
          </p>
        </div>

        <div className="px-[0.35em] pt-[1em] pb-[0.25em]">
          <p className="text-[1.05em] leading-tight font-semibold tracking-[-0.01em] text-ink">{hero.badge.title}</p>
          <p className="mt-[0.45em] font-mono text-[0.66em] tracking-[0.12em] text-dim uppercase">{hero.badge.stack}</p>

          <p className="mt-[1.3em] font-mono text-[0.6em] tracking-[0.2em] text-dim uppercase">{hero.badge.buildingLabel}</p>
          <p className="mt-[0.35em] text-[0.9em] font-medium text-ink">{hero.badge.building}</p>

          <div className="mt-[1.3em] flex items-center justify-between border-t border-hairline pt-[0.8em] font-mono text-[0.6em] tracking-[0.16em] uppercase">
            <span className="text-dim">{site.locationShort}</span>
            <span className="inline-flex items-center gap-[0.6em] text-ink">
              <span className="size-[0.7em] rounded-full bg-live shadow-[0_0_0_3px_rgb(62_207_142/0.18)]" />
              {site.availability}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
