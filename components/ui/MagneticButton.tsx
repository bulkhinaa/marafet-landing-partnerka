"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: "gradient-brand text-white hover:opacity-90",
  secondary: "bg-ink-100 text-white hover:bg-ink-90",
  ghost:
    "bg-accent-10 text-accent-100 ring-1 ring-inset ring-accent-30 hover:bg-accent-20",
};

/**
 * Лёгкая кнопка — CSS-only hover (scale + shadow).
 * Никаких useMotionValue / useSpring / mousemove-листенеров — GPU + CSS делают всё сами.
 */
export function MagneticButton({
  variant = "primary",
  icon,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5",
        "h-14 rounded-full px-8 text-base font-semibold",
        "transition-colors duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-60 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}
