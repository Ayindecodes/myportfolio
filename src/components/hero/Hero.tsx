// Hero (Phase 6): the balloon name with its props and doodles, one line about me, and a hand of project cards.
// Everything here is server HTML, readable before JavaScript runs; the load choreography is CSS, and
// HeroStage adds the physics once the page is interactive.

import { Arcs, Sparkle } from "@/components/ui/Doodles";
import { Underlined } from "@/components/ui/HandUnderline";
import { BalloonName } from "./BalloonName";
import { CardFan } from "./CardFan";
import { balloonEntrance } from "./entrance";
import { HeroProps } from "./HeroProps";
import { HeroStage } from "./HeroStage";

const entrance = balloonEntrance();

export function Hero() {
  return (
    <section id="top" className="hero">
      <style href="hero-entrance" precedence="default">{`${entrance.css}.hero{--balloon-dur:${entrance.duration}ms}`}</style>
      <HeroStage>
        <div className="hero-name-wrap" data-hero-name="">
          <BalloonName />
          <HeroProps />
          <span className="hero-doodle doodle-sparkle" data-doodle="spin" style={{ ["--d" as string]: 0 }} aria-hidden="true">
            <Sparkle className="w-full" />
          </span>
          <span className="hero-doodle doodle-arcs" data-doodle="" style={{ ["--d" as string]: 2 }} aria-hidden="true">
            <Arcs className="w-full" color="var(--accent)" />
          </span>
          <span className="hero-doodle doodle-sparkle-sm" data-doodle="spin" style={{ ["--d" as string]: 3 }} aria-hidden="true">
            <Sparkle className="w-full" />
          </span>
        </div>

        <div className="hero-line-wrap" data-hero-line="">
          <p className="hero-line type-lead">
            I&rsquo;m Ayinde. I build web apps and <br className="max-sm:hidden" />
            <Underlined className="text-accent-ink">the APIs behind them</Underlined>, from Lagos.
          </p>
        </div>

        <CardFan />
      </HeroStage>
    </section>
  );
}
