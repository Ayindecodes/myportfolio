// 02 · About me (Phase 8): the rotating role, the story, a plain note that the projects shown are personal
// (company work stays in private repositories), the résumé, the portrait, the GitHub calendar and the tools.

import { Reveal } from "@/components/motion/Reveal";
import { RotatingText } from "@/components/motion/RotatingText";
import { Button } from "@/components/ui/Button";
import { StarBullet } from "@/components/ui/Doodles";
import { SectionTag } from "@/components/ui/SectionTag";
import { about, github, site } from "@/content/site";
import { GitHubCalendar } from "./GitHubCalendar";
import { Portrait } from "./Portrait";
import { TechStack } from "./TechStack";

export function About() {
  return (
    <section id="about" className="page section-pad" aria-labelledby="about-title">
      <SectionTag number={2} label="About me" />
      <div className="about-grid">
        <div>
          <h2 id="about-title" className="type-h2 mt-8 max-w-[22ch]">
            I&rsquo;m Ayinde, <RotatingText words={about.roles} />
            <br />
            who builds friendly interfaces on top of careful backends.
          </h2>
          <Reveal as="p" className="type-body mt-6 max-w-[36em]">
            {about.paragraph}
          </Reveal>
          <Reveal as="p" delay={100} className="about-note mt-6 max-w-[36em]">
            <StarBullet className="mt-[0.55em] shrink-0" />
            <span>{about.personalNote}</span>
          </Reveal>
          <Reveal delay={160} className="mt-8">
            <Button variant="dark" href={site.resume.href} download={site.resume.downloadName}>
              Download résumé
              <span aria-hidden="true" className="nudge-ur">
                ↗
              </span>
            </Button>
          </Reveal>
        </div>
        <Portrait />
      </div>
      {github.showCalendar && <GitHubCalendar />}
      <TechStack />
    </section>
  );
}
