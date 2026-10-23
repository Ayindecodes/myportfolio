// Hero props (tasks 70–71): the inflatable padlock (security first) and bank card (fintech).
// They drop in, float, lean toward the cursor and bounce when clicked (hero-motion.ts).
// The padlock is the hidden extra: click it and the shackle pops open with a few sparks.
// Purely decorative, so they're hidden from assistive tech and never take keyboard focus.

import Image from "next/image";
import card from "@/assets/redesign/card.webp";
import padlockBody from "@/assets/redesign/padlock-body.webp";
import padlockShackle from "@/assets/redesign/padlock-shackle.webp";
import { StarBullet } from "@/components/ui/Doodles";

const sizes = "(max-width: 640px) 22vw, 170px";

export function HeroProps() {
  return (
    <>
      <span className="hero-prop prop-lock" data-prop="lock" aria-hidden="true">
        <span className="prop-in">
          <Image src={padlockShackle} alt="" sizes={sizes} loading="eager" className="prop-shackle" data-shackle="" draggable={false} />
          <Image src={padlockBody} alt="" sizes={sizes} loading="eager" className="relative" draggable={false} />
          {[0, 1, 2].map((i) => (
            <span key={i} className="prop-spark" data-spark={i}>
              <StarBullet className="size-full" />
            </span>
          ))}
        </span>
      </span>
      <span className="hero-prop prop-card" data-prop="card" aria-hidden="true">
        <span className="prop-in">
          <Image src={card} alt="" sizes={sizes} loading="eager" draggable={false} />
        </span>
      </span>
    </>
  );
}
