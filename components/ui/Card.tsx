import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

type CardTone = "light" | "soft" | "outline" | "dark";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  children: ReactNode;
}

const toneStyles: Record<CardTone, string> = {
  light: "bg-surface ring-1 ring-inset ring-ink-20",
  soft: "bg-accent-10",
  outline: "bg-surface ring-1 ring-inset ring-accent-30",
  dark: "bg-ink-90 text-white ring-1 ring-inset ring-white/10",
};

/**
 * Карточка для блок-сеток (фичи, шаги, преимущества).
 * Без shadow по умолчанию — shadow дороги для скролл-композитора.
 * Hover — лёгкое поднятие фона/обводки, без transform.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ tone = "light", className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-3xl p-6 md:p-8",
        "transition-colors duration-200",
        toneStyles[tone],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";
