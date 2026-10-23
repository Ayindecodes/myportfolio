// 04 · Say hello (Phase 10): heading, the copy-email button, a tear line, inflated social icons and the closing
// sticker. No message form: without an email service there's no honest way to send one from the site, and
// copying the address works everywhere.

import Image, { type StaticImageData } from "next/image";
import socialEmail from "@/assets/redesign/social-email.webp";
import socialGithub from "@/assets/redesign/social-github.webp";
import socialLinkedin from "@/assets/redesign/social-linkedin.webp";
import socialResume from "@/assets/redesign/social-resume.webp";
import { Reveal } from "@/components/motion/Reveal";
import { RevealWords } from "@/components/motion/RevealWords";
import { SectionTag } from "@/components/ui/SectionTag";
import { contact, site } from "@/content/site";
import { EmailButton } from "./EmailButton";
import { Sticker } from "./Sticker";

const profile = (label: string) => site.socials.find((social) => social.label === label)!.href;

const socials: { label: string; href: string; icon: StaticImageData; external: boolean }[] = [
  { label: "GitHub", href: profile("GitHub"), icon: socialGithub, external: true },
  { label: "LinkedIn", href: profile("LinkedIn"), icon: socialLinkedin, external: true },
  { label: "Email", href: `mailto:${site.email}`, icon: socialEmail, external: false },
  { label: "Résumé", href: site.resume.href, icon: socialResume, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="contact section-pad" aria-labelledby="contact-title">
      <div className="page contact-inner">
        <SectionTag number={4} label={contact.label} className="justify-center" />
        <h2 id="contact-title" className="type-h1 mt-8 max-w-[22ch] text-center">
          <RevealWords text={contact.heading} />
        </h2>
        <Reveal as="p" delay={150} className="type-body mt-5 text-center">
          {contact.lead}
        </Reveal>
        <Reveal delay={220} className="mt-10">
          <EmailButton email={site.email} />
        </Reveal>

        <div className="tear-line" aria-hidden="true" />

        <ul className="socials">
          {socials.map((social, index) => (
            <Reveal as="li" key={social.label} variant="pop" delay={120 + index * 70}>
              <a
                href={social.href}
                className="social"
                {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Image src={social.icon} alt="" sizes="88px" className="social-icon" draggable={false} />
                <span className="social-label">{social.label}</span>
                {social.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal variant="pop" delay={420} className="sticker-spot">
          <Sticker text={contact.sticker} />
        </Reveal>
      </div>
    </section>
  );
}
