import Image from "next/image";
import avatarHead from "@/assets/redesign/avatar-head.webp";
import { logoPath } from "@/components/hero/wordmark.generated";
import { site } from "@/content/site";

/** "ayinde" as an outline (npm run wordmark), so the first screen never waits for the display font. */
function Wordmark() {
  return (
    <svg viewBox="0 0 120 40" className="h-full w-full overflow-visible" aria-hidden="true">
      <path d={logoPath} fill="var(--ink)" filter="url(#vinylSmall)" />
    </svg>
  );
}

/** Nav logo: the vinyl wordmark and the avatar take turns in a small window (static when motion is off). */
export function LogoReel() {
  return (
    <a href="#top" className="logo-reel" aria-label={`${site.name}, back to top`} data-squish="0.5">
      <span className="logo-reel-track">
        <span className="logo-reel-frame">
          <Wordmark />
        </span>
        <span className="logo-reel-frame">
          <Image src={avatarHead} alt="" sizes="40px" className="size-10" loading="eager" />
        </span>
        <span className="logo-reel-frame" aria-hidden="true">
          <Wordmark />
        </span>
      </span>
    </a>
  );
}
