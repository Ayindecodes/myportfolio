// 03 · Journey (Phase 9): work, education and a dated list of personal builds, as ruled rows.
// Only verified entries: work as Ayinde described it (current employers unnamed by choice), education as
// confirmed, and build dates from GitHub.

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealWords } from "@/components/motion/RevealWords";
import { StarBullet } from "@/components/ui/Doodles";
import { SectionTag } from "@/components/ui/SectionTag";
import { buildTimeline, education, experience } from "@/content/site";

type IconName = "work" | "intern" | "school";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Hand-drawn tile icons in the doodle style: a briefcase, a sprout and a mortarboard. */
function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      {name === "work" && (
        <>
          <rect x="3.5" y="9" width="21" height="14.5" rx="3.5" {...stroke} />
          <path d="M10 9V6.8a1.8 1.8 0 0 1 1.8-1.8h4.4A1.8 1.8 0 0 1 18 6.8V9M3.8 15.2c6.6 2.4 13.8 2.4 20.4 0" {...stroke} />
        </>
      )}
      {name === "intern" && <path d="M14 24V13M14 15c0-5 3-8 8.5-8.5C22.5 12 19 15 14 15ZM14 18c0-3.6-2.3-6-6.5-6.4C7.5 15.8 10 18 14 18Z" {...stroke} />}
      {name === "school" && <path d="M2.5 11 14 5.5 25.5 11 14 16.5ZM7.5 13.5v5.3c3.8 2.9 9.2 2.9 13 0v-5.3M25.5 11v6.5" {...stroke} />}
    </svg>
  );
}

function Row({ icon, place, when, index, children }: { icon: IconName; place: string; when: string; index: number; children: ReactNode }) {
  return (
    <Reveal as="li" delay={index * 90} className="journey-row">
      <div className="journey-where">
        <span className="journey-tile">
          <Icon name={icon} />
        </span>
        <div>
          <p className="journey-place">{place}</p>
          <p className="type-meta mt-1">{when}</p>
        </div>
      </div>
      <div>{children}</div>
    </Reveal>
  );
}

export function Journey() {
  return (
    <section id="journey" className="page section-pad" aria-labelledby="journey-title">
      <SectionTag number={3} label="Journey" />
      <h2 id="journey-title" className="type-h1 mt-8 max-w-[18ch]">
        <RevealWords text={"How I got here,\none build at a time."} />
      </h2>

      <div className="journey-group">
        <h3 className="journey-heading">Work</h3>
        <ol className="journey-list">
          {experience.map((job, index) => (
            <Row key={job.title} icon={job.current ? "work" : "intern"} place={job.place} when={job.when} index={index}>
              {job.current && (
                <span className="status-badge mb-3" data-status="live">
                  <span className="status-dot" aria-hidden="true" />
                  Now
                </span>
              )}
              <h4 className="journey-role">{job.title}</h4>
              {job.summary && <p className="type-body mt-2 max-w-[40em]">{job.summary}</p>}
              <ul className="journey-bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>
                    <StarBullet className="mt-[0.55em] shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Row>
          ))}
        </ol>
      </div>

      <div className="journey-group">
        <h3 className="journey-heading">Education</h3>
        <ol className="journey-list">
          {education.map((item, index) => (
            <Row key={item.institution} icon="school" place={item.institution} when={item.years} index={index}>
              <h4 className="journey-role">{item.field}</h4>
            </Row>
          ))}
        </ol>
      </div>

      <div className="journey-group">
        <h3 className="journey-heading">
          Personal builds <span className="type-meta normal-case">Dated from GitHub</span>
        </h3>
        <ol className="journey-list">
          {buildTimeline.map((build, index) => (
            <Reveal as="li" key={build.name} delay={index * 60} className="build-row">
              <p className="type-meta">{build.when}</p>
              <p className="type-body">
                <strong className="font-semibold text-ink">{build.name}</strong> · {build.note}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
