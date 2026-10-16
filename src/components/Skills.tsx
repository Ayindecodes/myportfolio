import type { ReactNode } from "react";
import { capabilities, education, howIWork, stack } from "@/content/site";

function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-6 border-b border-hairline py-[38px] last:border-b-0 lg:grid-cols-[minmax(0,404fr)_minmax(0,771fr)] lg:gap-8">
      <h3 className="text-[23px] leading-[1.05] font-semibold tracking-[-0.02em]">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="pt-[clamp(72px,9vw,120px)] pb-[clamp(64px,8vw,104px)]">
      <div className="page">
        <h2 id="skills-title" className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          What I do
        </h2>

        <div className="mt-6">
          <Row title="Capabilities">
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {capabilities.map((item) => (
                <li key={item} className="border-b border-hairline py-3.5 text-[14.5px] text-dim">
                  {item}
                </li>
              ))}
            </ul>
          </Row>

          <Row title="Stack">
            <dl className="divide-y divide-hairline">
              {stack.map(({ group, items }) => (
                <div key={group} className="grid gap-1.5 py-3.5 first:pt-0 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <dt className="meta pt-1 text-[10.5px] text-dim">{group}</dt>
                  <dd className="text-[15px] leading-relaxed text-ink">{items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Row>

          <Row title="How I work">
            <p className="max-w-[658px] text-base leading-[1.62] text-dim">{howIWork}</p>
          </Row>

          <Row title="Education">
            <ul className="space-y-4">
              {education.map((entry) => (
                <li key={entry.award + entry.institution}>
                  <p className="text-base font-semibold tracking-[-0.01em]">
                    {entry.award}, {entry.field}
                  </p>
                  <p className="mt-1 text-[14.5px] text-dim">
                    {entry.institution}
                    <span className="meta ml-3 text-[11px]">{entry.years}</span>
                  </p>
                </li>
              ))}
            </ul>
          </Row>
        </div>
      </div>
    </section>
  );
}
