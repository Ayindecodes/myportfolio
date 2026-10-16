import { contact, site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";

export function Contact() {
  const links = [...site.socials, { label: "Résumé", href: site.resume.href }];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-surface pt-[clamp(96px,12vw,152px)] pb-[clamp(72px,8vw,104px)]"
    >
      <div className="page">
        <div className="flex items-center justify-between gap-4 border-b border-hairline pb-[38px]">
          <h2 id="contact-title" className="eyebrow">
            Get in touch
          </h2>
          <p className="meta inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-ink/80">
            <span aria-hidden="true" className="size-[7px] rounded-full bg-live" />
            {site.availability}
          </p>
        </div>

        <div className="mt-[clamp(48px,6vw,64px)] grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <p className="max-w-[12em] text-[clamp(2.25rem,4.1vw,3.3rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance">
              {contact.lead.before}
              <span className="text-accent-ink">{contact.lead.accent}</span>
              {contact.lead.after}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href={`mailto:${site.email}`}
                className="text-[clamp(1.25rem,2.75vw,2.2rem)] leading-none font-medium tracking-[-0.02em] break-all link-underline"
              >
                {site.email}
              </a>
              <CopyEmailButton email={site.email} />
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta inline-flex items-center gap-1.5 text-[12.5px] text-ink/70 transition-colors hover:text-ink"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                    <span aria-hidden="true" className="nudge-ur">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-[-0.015em]">Or send a quick message</h3>
            <div className="mt-6">
              <ContactForm to={site.email} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
