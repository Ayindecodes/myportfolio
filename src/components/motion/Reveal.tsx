import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** "fade" rises 24px into place; "pop" grows in with a spring overshoot. */
  variant?: "fade" | "pop";
  /** stagger offset in ms */
  delay?: number;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "style">;

/**
 * Reveals its content the first time it scrolls into view (src/lib/motion/reveal.ts adds data-revealed).
 * suppressHydrationWarning: that attribute can land before React finishes hydrating this element.
 */
export function Reveal<T extends ElementType = "div">({ as, variant = "fade", delay = 0, style, ...rest }: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      {...rest}
      data-reveal={variant === "pop" ? "pop" : ""}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
      suppressHydrationWarning
    />
  );
}
