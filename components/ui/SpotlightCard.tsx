"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SpotlightCardProps {
  children: ReactNode;
  /** Spotlight color */
  spotlightColor?: string;
  /** Spotlight size in pixels */
  spotlightSize?: number;
  /** Border radius */
  borderRadius?: number | string;
  /** Additional className */
  className?: string;
}

/**
 * Card with cursor-following spotlight effect.
 */
export function SpotlightCard({
  children,
  spotlightColor = "rgba(122, 84, 255, 0.15)",
  spotlightSize = 300,
  borderRadius = 24,
  className,
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || reducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-white/[0.03] ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.05] hover:ring-white/20",
        className
      )}
      style={{
        borderRadius:
          typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -z-0"
          style={{
            width: spotlightSize,
            height: spotlightSize,
            background: `radial-gradient(circle, ${spotlightColor}, transparent 70%)`,
            left: position.x - spotlightSize / 2,
            top: position.y - spotlightSize / 2,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default SpotlightCard;
