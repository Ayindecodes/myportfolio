import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GitHubCalendar } from "@/components/about/GitHubCalendar";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { MotionToggle, SoundToggle } from "@/components/motion/PreferenceToggles";
import { RevealWords } from "@/components/motion/RevealWords";
import { RotatingText } from "@/components/motion/RotatingText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Arcs, Arrow, Blaze, Sparkle, StarBullet } from "@/components/ui/Doodles";
import { Underlined } from "@/components/ui/HandUnderline";
import { SectionTag } from "@/components/ui/SectionTag";
import { GsapDemo } from "./GsapDemo";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// Values live in globals.css; swatches read the variables so they can't drift. Ratios are against --bg.
const palette = [
  { token: "bg", use: "Page background" },
  { token: "surface", use: "Card highlights", ratio: "—" },
  { token: "ink", use: "Headings, primary text", ratio: "15.8:1" },
  { token: "body", use: "Paragraphs", ratio: "8.7:1" },
  { token: "dim", use: "Dates, labels, small meta", ratio: "5.0:1" },
  { token: "faint", use: "Decoration only", ratio: "2.4:1" },
  { token: "accent", use: "Fills, doodles, buttons", ratio: "4.0:1" },
  { token: "accent-ink", use: "Small accent text", ratio: "5.3:1" },
  { token: "live", use: "“Live” status", ratio: "4.6:1" },
];

const typeScale = [
  { name: "type-h1", sample: "Built, shipped, still tinkering." },
  { name: "type-h2", sample: "I’m Ayinde, a full-stack developer who builds friendly interfaces." },
  { name: "type-h3", sample: "Quicksurf" },
  { name: "type-label", sample: "Selected work" },
  { name: "type-lead", sample: "I build web apps and the APIs behind them, from Lagos." },
  { name: "type-body", sample: "Top up airtime and data in a few taps, with Paystack-funded wallets and idempotent purchases." },
  { name: "type-meta", sample: "Apr 2026 – now · Building" },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-hairline py-12">
      <h2 className="type-meta mb-8">{title}</h2>
      {children}
    </section>
  );
}

export default function Styleguide() {
  return (
    <main id="main" className="page py-24">
      <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-bold [font-stretch:112%]">Styleguide</h1>
      <p className="type-body mt-4 max-w-[40em]">
        The design system from <code>docs/redesign/BRIEF.md</code>: tokens in <code>src/app/globals.css</code>, primitives in{" "}
        <code>src/components/ui/</code>, motion in <code>src/lib/motion/</code>.
      </p>

      <Block title="Palette">
        <ul className="grid gap-4 sm:grid-cols-3">
          {palette.map((swatch) => (
            <li key={swatch.token} className="flex items-center gap-4">
              <span
                className="size-14 shrink-0 rounded-2xl border border-hairline"
                style={{ background: `var(--${swatch.token})` }}
              />
              <span className="leading-snug">
                <span className="block font-mono text-sm text-ink">--{swatch.token}</span>
                <span className="block text-sm text-body">{swatch.use}</span>
                {swatch.ratio && <span className="type-meta">{swatch.ratio}</span>}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Type scale">
        <dl className="space-y-7">
          {typeScale.map((type) => (
            <div key={type.name} className="grid gap-2 md:grid-cols-[140px_1fr] md:items-baseline">
              <dt className="font-mono text-sm text-dim">{type.name}</dt>
              <dd className={type.name}>{type.sample}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Vinyl surfaces and shadows">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="vinyl-cream grid h-36 place-items-center rounded-[28px] font-mono text-sm">vinyl-cream</div>
          <div className="vinyl-dark grid h-36 place-items-center rounded-[28px] font-mono text-sm">vinyl-dark</div>
          <div className="vinyl-accent grid h-36 place-items-center rounded-[28px] font-mono text-sm">vinyl-accent</div>
        </div>
        <Card className="mt-8 p-8">
          <p className="type-h3">Card</p>
          <p className="type-body mt-2">The moulded frame used for project media and panels.</p>
        </Card>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button variant="dark">Let&rsquo;s talk</Button>
          <Button variant="cream">Say hello</Button>
          <Button variant="accent">Download résumé</Button>
        </div>
      </Block>

      <Block title="Chips">
        <ul className="flex flex-wrap gap-2">
          {["Django REST", "PostgreSQL", "Paystack", "Next.js"].map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Section tag and hand underline">
        <SectionTag number={1} label="Selected work" />
        <p className="type-lead mt-10">
          I build web apps and <Underlined>the APIs behind them</Underlined>, from Lagos.
        </p>
      </Block>

      <Block title="Doodles">
        <ul className="flex flex-wrap items-end gap-10">
          {[
            { name: "Sparkle", el: <Sparkle className="w-12" /> },
            { name: "StarBullet", el: <StarBullet className="size-5" /> },
            { name: "Arcs", el: <Arcs className="w-20" /> },
            { name: "Arrow", el: <Arrow className="w-14" /> },
            { name: "Blaze", el: <Blaze className="w-12" /> },
          ].map((doodle) => (
            <li key={doodle.name} className="flex flex-col items-center gap-3">
              {doodle.el}
              <span className="font-mono text-xs text-dim">{doodle.name}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Motion">
        <div className="flex flex-wrap gap-3">
          <SoundToggle />
          <MotionToggle />
        </div>
        <p className="type-body mt-4 max-w-[44em]">
          Press and hold anything below: it squashes toward your finger, keeps inflating while held and wobbles back.
          With a mouse, buttons and chips catch a gloss that follows the cursor.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="dark">Squish me</Button>
          <Magnetic>
            <Button variant="cream">Magnetic</Button>
          </Magnetic>
          <Button variant="accent" data-squish-sound="pop">
            Pop (sound)
          </Button>
          <Button variant="cream" data-squish-sound="popLow">
            Low pop
          </Button>
          <Button variant="cream" data-squish-sound="unlock">
            Unlock
          </Button>
        </div>

        <h3 className="type-h1 mt-14">
          <RevealWords text={"Words rise in\none after another."} />
        </h3>
        <p className="type-h2 mt-8">
          I&rsquo;m Ayinde, a <RotatingText words={["full-stack developer", "API builder", "fintech tinkerer"]} />
          <br />
          who builds things.
        </p>

        <ul className="mt-12 flex flex-wrap items-end gap-6">
          {["Fade up", "Pop in", "Fade up", "Pop in"].map((label, index) => (
            <Reveal
              as="li"
              key={index}
              variant={index % 2 ? "pop" : "fade"}
              delay={index * 90}
              className="vinyl-cream grid h-24 w-36 place-items-center rounded-[22px] font-mono text-xs text-dim"
            >
              {label}
            </Reveal>
          ))}
          <li>
            <GsapDemo />
          </li>
        </ul>
      </Block>

      <Block title="GitHub calendar (off on the home page while site.ts github.showCalendar is false)">
        <GitHubCalendar />
      </Block>

      <Block title="Easing">
        <ul className="space-y-2 font-mono text-sm text-body">
          <li>--ease-out-soft · cubic-bezier(0.22, 1, 0.36, 1) · entrances and drawing</li>
          <li>--ease-spring-soft · cubic-bezier(0.34, 1.56, 0.64, 1) · overshoot on pops and lifts</li>
        </ul>
      </Block>
    </main>
  );
}
