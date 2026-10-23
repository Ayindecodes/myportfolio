import { cacheLife } from "next/cache";
import { Hero } from "@/components/hero/Hero";
import { Work } from "@/components/work/Work";
import { About } from "@/components/about/About";
import { Journey } from "@/components/journey/Journey";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/contact/Footer";
import { MusicDock } from "@/components/music/MusicDock";
import { LogoReel } from "@/components/nav/LogoReel";
import { SiteNav } from "@/components/nav/SiteNav";
import { education, site } from "@/content/site";

/** Cached at build time and refreshed at most monthly; only feeds the copyright year. */
async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: [site.name, site.alias],
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  sameAs: site.socials.map((social) => social.href),
  alumniOf: education.map((item) => ({ "@type": "EducationalOrganization", name: item.institution })),
};

export default async function Home() {
  const year = await getCurrentYear();

  return (
    <>
      <SiteNav logo={<LogoReel />} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Work />
        <About />
        <Journey />
        <Contact />
      </main>
      <Footer year={year} />
      <MusicDock />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
