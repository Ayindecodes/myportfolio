// 01 · Selected work (Phase 7): heading, then the Products / Side builds tabs, each a list of project rows.
// The rows are server-rendered, so every project and link is in the HTML; WorkTabs only decides which list shows.
// Task 81 (a small-experiments grid) is skipped on purpose: there are no experiments to show yet.

import { Reveal } from "@/components/motion/Reveal";
import { RevealWords } from "@/components/motion/RevealWords";
import { SectionTag } from "@/components/ui/SectionTag";
import { projects, workTabs } from "@/content/projects";
import { ProjectRow } from "./ProjectRow";
import { WorkTabs, type WorkPanel } from "./WorkTabs";

export function Work() {
  const panels: WorkPanel[] = workTabs.map((tab) => {
    const list = projects.filter((project) => project.tab === tab.id);
    return {
      id: tab.id,
      label: tab.label,
      slugs: list.map((project) => project.slug),
      content: (
        <div className="project-list">
          {list.map((project, index) => (
            <ProjectRow key={project.slug} project={project} flip={index % 2 === 1} />
          ))}
        </div>
      ),
    };
  });

  return (
    <section id="work" className="page section-pad" aria-labelledby="work-title">
      <SectionTag number={1} label="Selected work" />
      <h2 id="work-title" className="type-h1 mt-8 max-w-[16ch]">
        <RevealWords text={"Built, shipped,\nstill tinkering."} />
      </h2>
      <Reveal as="p" delay={200} className="type-body mt-5 max-w-[34em]">
        Personal projects: payments, developer tools and a few side builds. Switch tabs for the smaller ones.
      </Reveal>
      <WorkTabs panels={panels} />
    </section>
  );
}
