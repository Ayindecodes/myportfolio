import { site } from "@/content/site";

export function SiteFooter({ year }: { year: number }) {
  return (
    <footer className="overflow-hidden bg-surface pb-[35px]">
      <div className="page">
        <p aria-hidden="true" className="outline-wordmark select-none">
          {site.wordmark}
        </p>
        <div className="meta mt-6 flex items-center justify-between gap-4 border-t border-hairline pt-[22px] text-[11px] font-normal tracking-[0.06em] text-dim normal-case">
          <p>
            © {year} {site.name}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 uppercase transition-colors hover:text-ink">
            Back to top
            <span aria-hidden="true" className="nudge-u">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
