// The About portrait (task 83): the vinyl avatar in a thick ink frame, with a label that wiggles when pressed.

import Image from "next/image";
import avatar from "@/assets/redesign/avatar.webp";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Doodles";
import { about } from "@/content/site";

export function Portrait() {
  return (
    <Reveal as="figure" variant="pop" className="about-portrait">
      <span className="portrait-frame" data-squish="0.18">
        <Image src={avatar} alt={about.portrait.alt} sizes="(max-width: 920px) 70vw, 340px" />
      </span>
      <figcaption className="portrait-label" data-squish="1.3">
        <Arrow className="portrait-arrow" />
        {about.portrait.label}
      </figcaption>
    </Reveal>
  );
}
