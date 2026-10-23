import type { ComponentPropsWithoutRef } from "react";

type Variant = "dark" | "cream" | "accent";
type Common = { variant?: Variant };
type LinkProps = Common & ComponentPropsWithoutRef<"a"> & { href: string };
type ButtonProps = Common & ComponentPropsWithoutRef<"button"> & { href?: undefined };

// Every button squishes when pressed and catches the cursor gloss (src/lib/motion); callers can override either.
const motion = { "data-squish": "0.7", "data-gloss": "" };

/** Vinyl pill button. Renders a link when given `href`, otherwise a `<button type="button">`. */
export function Button(props: LinkProps | ButtonProps) {
  const { variant = "dark", className = "", ...rest } = props;
  const classes = `btn btn-${variant} ${className}`.trim();

  if (rest.href !== undefined) {
    return <a {...motion} {...(rest as ComponentPropsWithoutRef<"a">)} className={classes} />;
  }
  return <button type="button" {...motion} {...(rest as ComponentPropsWithoutRef<"button">)} className={classes} />;
}
