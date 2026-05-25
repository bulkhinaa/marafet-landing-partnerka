"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface MarqueeProps {
  children: ReactNode;
  /** Direction of scroll */
  direction?: "left" | "right";
  /** Speed in pixels per second */
  speed?: number;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Gap between items */
  gap?: number;
  /** Additional className for wrapper */
  className?: string;
  /** Fade edges with gradient mask */
  fade?: boolean;
  /** Gradient mask width in pixels */
  fadeWidth?: number;
}

export function Marquee({
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  gap = 24,
  className,
  fade = true,
  fadeWidth = 80,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();

  // Measure content width on mount and resize
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const firstChild = containerRef.current.querySelector(
          "[data-marquee-content]"
        ) as HTMLElement | null;
        if (firstChild) {
          setContentWidth(firstChild.offsetWidth);
        }
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children]);

  // Start infinite animation when width is known
  useEffect(() => {
    if (contentWidth === 0 || reducedMotion) return;

    const duration = contentWidth / speed;
    const startX = direction === "left" ? 0 : -contentWidth - gap;
    const endX = direction === "left" ? -contentWidth - gap : 0;

    controls.start({
      x: [startX, endX],
      transition: {
        x: {
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    });
  }, [contentWidth, speed, direction, gap, controls, reducedMotion]);

  const handleHoverStart = () => {
    if (pauseOnHover) {
      controls.stop();
    }
  };

  const handleHoverEnd = () => {
    if (pauseOnHover && contentWidth > 0 && !reducedMotion) {
      const duration = contentWidth / speed;
      const startX = direction === "left" ? 0 : -contentWidth - gap;
      const endX = direction === "left" ? -contentWidth - gap : 0;

      controls.start({
        x: [startX, endX],
        transition: {
          x: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        },
      });
    }
  };

  // Reduced motion: static display
  if (reducedMotion) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <div className="flex" style={{ gap }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      ref={containerRef}
    >
      {/* Fade masks */}
      {fade && (
        <>
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full"
            style={{
              width: fadeWidth,
              background:
                "linear-gradient(to right, var(--marquee-bg, #0D0D0F), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full"
            style={{
              width: fadeWidth,
              background:
                "linear-gradient(to left, var(--marquee-bg, #0D0D0F), transparent)",
            }}
          />
        </>
      )}

      <motion.div className="flex w-max" style={{ gap }} animate={controls}>
        {/* Original content */}
        <div data-marquee-content className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div aria-hidden className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
