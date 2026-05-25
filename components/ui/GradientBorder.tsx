"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GradientBorderProps {
  children: ReactNode;
  /** Border width in pixels */
  borderWidth?: number;
  /** Border radius */
  borderRadius?: number | string;
  /** Gradient colors */
  colors?: string[];
  /** Animation duration in seconds */
  duration?: number;
  /** Additional className for outer wrapper */
  className?: string;
  /** Additional className for inner content */
  contentClassName?: string;
}

/**
 * Animated gradient border wrapper.
 * Creates a spinning conic gradient border effect.
 */
export function GradientBorder({
  children,
  borderWidth = 2,
  borderRadius = 24,
  colors = ["#7A54FF", "#AB5CE9", "#FF7B9C", "#FFD78A", "#7A54FF"],
  duration = 4,
  className,
  contentClassName,
}: GradientBorderProps) {
  const reducedMotion = useReducedMotion();
  const gradient = `conic-gradient(from 0deg, ${colors.join(", ")})`;

  return (
    <div
      className={cn("relative p-[var(--border-width)]", className)}
      style={
        {
          "--border-width": `${borderWidth}px`,
          borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
        } as React.CSSProperties
      }
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: gradient,
          borderRadius: "inherit",
        }}
        animate={
          !reducedMotion
            ? {
                rotate: 360,
              }
            : undefined
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Blur layer for glow effect */}
      <motion.div
        className="absolute inset-0 -z-20 opacity-50 blur-xl"
        style={{
          background: gradient,
          borderRadius: "inherit",
        }}
        animate={
          !reducedMotion
            ? {
                rotate: 360,
              }
            : undefined
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner content */}
      <div
        className={cn("relative bg-ink-100 h-full", contentClassName)}
        style={{
          borderRadius: `calc(${typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default GradientBorder;
