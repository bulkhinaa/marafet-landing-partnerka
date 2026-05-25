import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type SectionTone = "light" | "soft" | "dark";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  /** Идентификатор для якоря/навигации */
  anchor?: string;
}

const toneStyles: Record<SectionTone, string> = {
  light: "bg-surface text-ink-100",
  soft: "bg-accent-10 text-ink-100",
  dark: "bg-ink-100 text-white",
};

/**
 * Унифицированный wrapper для секций лендинга.
 * Никаких motion-обвязок, только семантика + paddings + фон.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ tone = "light", anchor, className, children, ...rest }, ref) => (
    <section
      ref={ref}
      id={anchor}
      className={cn(
        "relative w-full overflow-hidden py-20 md:py-28 lg:py-32",
        toneStyles[tone],
        className
      )}
      {...rest}
    >
      {children}
    </section>
  )
);

Section.displayName = "Section";
