"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface FloatingElementProps {
  children: ReactNode;
  /** Float amplitude in pixels */
  amplitude?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Float direction */
  direction?: "vertical" | "horizontal" | "both";
  /** Additional className */
  className?: string;
}

/**
 * Wrapper that adds gentle floating/levitation animation.
 */
export function FloatingElement({
  children,
  amplitude = 10,
  duration = 4,
  delay = 0,
  direction = "vertical",
  className,
}: FloatingElementProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getAnimateProps = () => {
    switch (direction) {
      case "horizontal":
        return {
          x: [0, amplitude, 0, -amplitude, 0],
        };
      case "both":
        return {
          x: [0, amplitude * 0.5, 0, -amplitude * 0.5, 0],
          y: [0, -amplitude, 0, amplitude * 0.5, 0],
        };
      case "vertical":
      default:
        return {
          y: [0, -amplitude, 0, amplitude * 0.5, 0],
        };
    }
  };

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      animate={getAnimateProps()}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default FloatingElement;
