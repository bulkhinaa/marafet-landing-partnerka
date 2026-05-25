"use client";

import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Glow color (CSS color) */
  glowColor?: string;
  /** Glow intensity */
  intensity?: "soft" | "medium" | "strong";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Visual variant */
  variant?: "solid" | "outline" | "ghost";
}

const intensityStyles = {
  soft: "shadow-[0_0_20px_-5px_var(--glow-color)]",
  medium: "shadow-[0_0_40px_-8px_var(--glow-color)]",
  strong: "shadow-[0_0_60px_-10px_var(--glow-color)]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

const variantStyles = {
  solid:
    "bg-gradient-to-r from-accent-60 to-magenta-60 text-white hover:from-accent-70 hover:to-magenta-70",
  outline:
    "bg-transparent text-accent-60 ring-2 ring-inset ring-accent-60 hover:bg-accent-60/10",
  ghost: "bg-white/5 text-white hover:bg-white/10",
};

/**
 * Button with animated pulsing glow effect.
 */
export function GlowButton({
  children,
  glowColor = "rgba(122, 84, 255, 0.6)",
  intensity = "medium",
  size = "md",
  variant = "solid",
  className,
  disabled,
  ...props
}: GlowButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-60 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        sizeStyles[size],
        variantStyles[variant],
        !disabled && intensityStyles[intensity],
        className
      )}
      style={{ "--glow-color": glowColor } as React.CSSProperties}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={
        !disabled
          ? {
              boxShadow: [
                `0 0 20px -5px ${glowColor}`,
                `0 0 40px -5px ${glowColor}`,
                `0 0 20px -5px ${glowColor}`,
              ],
            }
          : undefined
      }
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default GlowButton;
