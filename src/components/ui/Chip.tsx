import type { ReactNode } from "react";
import { StarBullet } from "./Doodles";

/** Cream vinyl tag with a star bullet, used for tech stacks. Wrap in an <li> when listing several. */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`chip ${className}`} data-squish="0.8" data-gloss="">
      <StarBullet />
      {children}
    </span>
  );
}
