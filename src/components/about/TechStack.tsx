// Tools I use (task 85): a row of vinyl logos and a row of tool chips drifting in opposite directions. Each row is
// its list twice over, so the loop is seamless; the copy is hidden from screen readers. The motion pauses on hover
// and stops in calm mode, where the rows wrap instead. The logos are decorative: every one is also a chip.

import Image, { type StaticImageData } from "next/image";
import logoDjango from "@/assets/redesign/logo-django.webp";
import logoDocker from "@/assets/redesign/logo-docker.webp";
import logoFastapi from "@/assets/redesign/logo-fastapi.webp";
import logoGit from "@/assets/redesign/logo-git.webp";
import logoNext from "@/assets/redesign/logo-nextjs.webp";
import logoPostgres from "@/assets/redesign/logo-postgresql.webp";
import logoPython from "@/assets/redesign/logo-python.webp";
import logoReact from "@/assets/redesign/logo-react.webp";
import logoTailwind from "@/assets/redesign/logo-tailwind.webp";
import logoTypeScript from "@/assets/redesign/logo-typescript.webp";
import { Chip } from "@/components/ui/Chip";
import { stack } from "@/content/site";

const logos: StaticImageData[] = [
  logoReact,
  logoNext,
  logoTypeScript,
  logoPython,
  logoDjango,
  logoFastapi,
  logoTailwind,
  logoPostgres,
  logoDocker,
  logoGit,
];

const tools = stack.flatMap((group) => group.items);

export function TechStack() {
  return (
    <div className="stack-block">
      <p className="type-meta">Tools I use</p>

      <div className="marquee" aria-hidden="true">
        <ul className="marquee-track">
          {[false, true].flatMap((copy) =>
            logos.map((logo, i) => (
              <li key={`${copy}-${i}`} className="marquee-logo" data-copy={copy ? "" : undefined}>
                <Image src={logo} alt="" sizes="64px" className="size-full" data-squish="" draggable={false} />
              </li>
            )),
          )}
        </ul>
      </div>

      <div className="marquee" data-reverse="">
        <ul className="marquee-track" aria-label="Tools I use">
          {[false, true].flatMap((copy) =>
            tools.map((tool) => (
              <li key={`${copy}-${tool}`} className="marquee-chip" data-copy={copy ? "" : undefined} aria-hidden={copy || undefined}>
                <Chip>{tool}</Chip>
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}
