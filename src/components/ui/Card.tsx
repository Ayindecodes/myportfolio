import type { ComponentPropsWithoutRef, ElementType } from "react";

type CardProps<T extends ElementType> = { as?: T; className?: string } & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "className"
>;

/** Moulded cream vinyl frame: 28px radius, triple shadow. */
export function Card<T extends ElementType = "div">({ as, className = "", ...rest }: CardProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag {...rest} className={`vinyl-card ${className}`.trim()} />;
}
