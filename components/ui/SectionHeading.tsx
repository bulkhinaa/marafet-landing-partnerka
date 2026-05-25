import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-60">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-ink-100 sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-pretty text-lg leading-relaxed text-ink-70 md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
