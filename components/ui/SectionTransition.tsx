"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

type TransitionVariant = "fade" | "zoom" | "slide" | "reveal" | "wave";

interface SectionTransitionProps {
  children: React.ReactNode;
  variant?: TransitionVariant;
  className?: string;
  /** Parallax depth effect - negative values move slower (background feel) */
  depth?: number;
}

export function SectionTransition({
  children,
  variant = "fade",
  className = "",
  depth = 0,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Common transforms
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const parallaxY = useTransform(smoothProgress, [0, 1], [depth * 100, depth * -100]);

  // Variant-specific transforms
  const getTransforms = () => {
    if (prefersReducedMotion) {
      return { opacity: 1 };
    }

    switch (variant) {
      case "zoom":
        return {
          opacity,
          scale,
          y: parallaxY,
        };
      case "slide":
        return {
          opacity,
          y,
        };
      case "reveal":
        return {
          opacity,
          clipPath: useTransform(
            smoothProgress,
            [0, 0.3],
            ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
          ),
        };
      case "wave":
        return {
          opacity,
          y: useTransform(smoothProgress, [0, 0.5, 1], [80, 0, -80]),
          rotateX: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -15]),
        };
      case "fade":
      default:
        return {
          opacity,
          y: parallaxY,
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      style={getTransforms()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Decorative divider between sections with parallax */
export function SectionDivider({
  variant = "gradient",
  className = "",
}: {
  variant?: "gradient" | "wave" | "dots" | "line";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  if (variant === "gradient") {
    return (
      <div ref={ref} className={`relative h-32 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
          style={prefersReducedMotion ? {} : { width, opacity }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-accent-60 to-transparent" />
        </motion.div>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div ref={ref} className={`relative h-24 overflow-hidden ${className}`}>
        <motion.svg
          viewBox="0 0 1200 60"
          className="absolute inset-x-0 bottom-0 w-full"
          style={prefersReducedMotion ? {} : { opacity }}
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,30 Q300,60 600,30 T1200,30 V60 H0 Z"
            fill="currentColor"
            className="text-accent-10"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div ref={ref} className={`flex justify-center gap-2 py-12 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-accent-40"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          />
        ))}
      </div>
    );
  }

  // line
  return (
    <div ref={ref} className={`py-8 ${className}`}>
      <motion.div
        className="mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-ink-30 to-transparent"
        style={prefersReducedMotion ? {} : { opacity }}
      />
    </div>
  );
}
