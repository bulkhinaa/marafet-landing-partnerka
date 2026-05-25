"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ShimmerTextProps {
  children: ReactNode;
  /** Shimmer colors */
  colors?: string[];
  /** Animation duration in seconds */
  duration?: number;
  /** Additional className */
  className?: string;
  /** Element type */
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
}

/**
 * Text with animated shimmer gradient effect.
 */
export function ShimmerText({
  children,
  colors = ["#7A54FF", "#AB5CE9", "#FF7B9C", "#FFD78A", "#7A54FF"],
  duration = 3,
  className,
  as: Component = "span",
}: ShimmerTextProps) {
  const reducedMotion = useReducedMotion();
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  if (reducedMotion) {
    return (
      <Component
        className={cn(
          "bg-gradient-to-r from-accent-60 to-magenta-60 bg-clip-text text-transparent",
          className
        )}
      >
        {children}
      </Component>
    );
  }

  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

export default ShimmerText;
