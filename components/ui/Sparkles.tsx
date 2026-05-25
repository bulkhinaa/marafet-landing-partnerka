"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SparklesProps {
  children?: ReactNode;
  /** Color of sparkles */
  color?: string;
  /** Number of sparkles */
  count?: number;
  /** Min size in pixels */
  minSize?: number;
  /** Max size in pixels */
  maxSize?: number;
  /** Whether to animate */
  enabled?: boolean;
  /** Additional className */
  className?: string;
}

interface Sparkle {
  id: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const COLORS = [
  "#FFA8C5", // pink
  "#7A54FF", // violet
  "#AB5CE9", // magenta
  "#FFD78A", // gold
  "#FFFFFF", // white
];

function generateSparkle(
  minSize: number,
  maxSize: number,
  colors: string[]
): Sparkle {
  return {
    id: Math.random().toString(36).slice(2, 11),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: minSize + Math.random() * (maxSize - minSize),
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

/**
 * Animated sparkles effect.
 * Wraps children with floating sparkle particles.
 */
export function Sparkles({
  children,
  color,
  count = 12,
  minSize = 8,
  maxSize = 16,
  enabled = true,
  className,
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotion = useReducedMotion();

  const colors = color ? [color] : COLORS;

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    // Initial sparkles
    const initial = Array.from({ length: count }, () =>
      generateSparkle(minSize, maxSize, colors)
    );
    setSparkles(initial);

    // Regenerate sparkles periodically
    intervalRef.current = setInterval(() => {
      setSparkles((prev) => {
        const newSparkle = generateSparkle(minSize, maxSize, colors);
        return [...prev.slice(1), newSparkle];
      });
    }, 800);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, reducedMotion, count, minSize, maxSize, colors]);

  if (reducedMotion || !enabled) {
    return <>{children}</>;
  }

  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <SparkleInstance key={sparkle.id} sparkle={sparkle} />
        ))}
      </AnimatePresence>
    </span>
  );
}

function SparkleInstance({ sparkle }: { sparkle: Sparkle }) {
  return (
    <motion.span
      className="pointer-events-none absolute"
      style={{
        left: sparkle.x,
        top: sparkle.y,
        zIndex: 10,
      }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        rotate: [0, 90, 180, 270],
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: sparkle.duration,
        delay: sparkle.delay,
        ease: "easeInOut",
      }}
    >
      <svg
        width={sparkle.size}
        height={sparkle.size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"
          fill={sparkle.color}
        />
      </svg>
    </motion.span>
  );
}

/**
 * Standalone sparkles layer (absolute positioned).
 * Use this as an overlay on any container.
 */
export function SparklesOverlay({
  count = 20,
  minSize = 6,
  maxSize = 14,
  className,
}: Omit<SparklesProps, "children">) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const initial = Array.from({ length: count }, () =>
      generateSparkle(minSize, maxSize, COLORS)
    );
    setSparkles(initial);

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkle = generateSparkle(minSize, maxSize, COLORS);
        return [...prev.slice(1), newSparkle];
      });
    }, 600);

    return () => clearInterval(interval);
  }, [reducedMotion, count, minSize, maxSize]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="absolute"
            style={{
              left: sparkle.x,
              top: sparkle.y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0.8, 0],
              scale: [0, 1, 1, 0],
              y: [0, -20, -40, -60],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: sparkle.duration * 1.2,
              delay: sparkle.delay * 0.5,
              ease: "easeOut",
            }}
          >
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"
                fill={sparkle.color}
              />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Sparkles;
