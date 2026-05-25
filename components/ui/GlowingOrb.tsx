"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GlowingOrbProps {
  /** Size in pixels */
  size?: number;
  /** Primary color */
  color?: string;
  /** Secondary color for gradient */
  secondaryColor?: string;
  /** Glow intensity */
  glowIntensity?: number;
  /** Animation duration */
  duration?: number;
  /** Additional className */
  className?: string;
}

/**
 * Animated glowing orb decoration.
 */
export function GlowingOrb({
  size = 200,
  color = "#7A54FF",
  secondaryColor = "#FF7B9C",
  glowIntensity = 0.5,
  duration = 6,
  className,
}: GlowingOrbProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none", className)}
      style={{
        width: size,
        height: size,
      }}
      animate={
        !reducedMotion
          ? {
              scale: [1, 1.1, 1],
              opacity: [glowIntensity, glowIntensity * 1.3, glowIntensity],
            }
          : undefined
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Core */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}, ${secondaryColor})`,
        }}
        animate={
          !reducedMotion
            ? {
                rotate: 360,
              }
            : undefined
        }
        transition={{
          duration: duration * 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow layers */}
      <div
        className="absolute inset-0 rounded-full blur-xl"
        style={{
          background: `radial-gradient(circle, ${color}80, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-[-20%] rounded-full blur-2xl opacity-50"
        style={{
          background: `radial-gradient(circle, ${secondaryColor}60, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

export default GlowingOrb;
