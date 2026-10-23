// The hero's hand of cards (task 73): the Products projects, fanned like cards. They deal in on load, lift on
// hover and jump to the project in Work, which opens the right tab first (see WorkTabs).

import Image from "next/image";
import { projects } from "@/content/projects";

const cards = projects.filter((project) => project.tab === "products");

export function CardFan() {
  return (
    <ul className="hero-fan" aria-label="Featured projects">
      {cards.map((card, i) => (
        <li key={card.slug} className="fan-slot" style={{ ["--i" as string]: i, ["--o" as string]: i - (cards.length - 1) / 2 }}>
          <a href={`#work-${card.slug}`} className="fan-card">
            <span className="fan-card-in">
              <span className="fan-card-body" data-squish="0.3" data-gloss="">
                <span className="fan-card-media">
                  <Image src={card.image} alt="" fill sizes="(max-width: 640px) 24vw, 190px" loading="eager" draggable={false} />
                </span>
                <span className="fan-card-caption">{card.name}</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
