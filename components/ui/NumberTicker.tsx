"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

interface NumberTickerProps {
  value: number;
  /** Duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Format number with locale */
  locale?: string;
  /** Additional className */
  className?: string;
  /** Use slot machine style (vertical scroll) vs simple count */
  variant?: "count" | "slot";
}

/**
 * Animated number with spring physics.
 * "count" variant: smooth interpolation
 * "slot" variant: individual digit reels
 */
export function NumberTicker({
  value,
  duration = 2,
  delay = 0,
  locale = "ru-RU",
  className,
  variant = "count",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (variant === "slot") {
    return (
      <SlotTicker
        value={value}
        duration={duration}
        delay={delay}
        locale={locale}
        className={className}
      />
    );
  }

  return (
    <CountTicker
      ref={ref}
      value={value}
      duration={duration}
      delay={delay}
      locale={locale}
      className={className}
      isInView={isInView}
    />
  );
}

// Simple counting animation
interface CountTickerProps {
  value: number;
  duration: number;
  delay: number;
  locale: string;
  className?: string;
  isInView: boolean;
}

const CountTicker = ({
  ref,
  value,
  duration,
  delay,
  locale,
  className,
  isInView,
}: CountTickerProps & { ref: React.RefObject<HTMLSpanElement | null> }) => {
  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString(locale)
  );

  const [displayValue, setDisplayValue] = useState(value.toLocaleString(locale));

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {displayValue}
    </span>
  );
};

// Slot machine style animation
interface SlotTickerProps {
  value: number;
  duration: number;
  delay: number;
  locale: string;
  className?: string;
}

function SlotTicker({
  value,
  duration,
  delay,
  locale,
  className,
}: SlotTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const formatted = value.toLocaleString(locale);

  return (
    <span ref={ref} className={cn("inline-flex items-baseline tabular-nums", className)}>
      {formatted.split("").map((char, i) => {
        const isDigit = /\d/.test(char);
        if (!isDigit) {
          // Separator (space, comma, etc.)
          return (
            <span key={i} className="inline-block">
              {char}
            </span>
          );
        }

        return (
          <DigitReel
            key={i}
            digit={parseInt(char)}
            duration={duration}
            delay={delay + i * 0.05}
            isInView={isInView}
          />
        );
      })}
    </span>
  );
}

interface DigitReelProps {
  digit: number;
  duration: number;
  delay: number;
  isInView: boolean;
}

function DigitReel({ digit, duration, delay, isInView }: DigitReelProps) {
  // Generate sequence: 0-9 repeated, ending on target digit
  const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const finalIndex = 10 + digit; // Second round + target
  // Шаг рулетки — выше 1em, чтобы вместить ascenders/descenders display-шрифта (Unbounded)
  const STEP = 1.15;

  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: `${STEP}em`, width: "1ch" }}
    >
      <motion.span
        className="absolute left-0 top-0 block w-full text-center"
        initial={{ y: 0 }}
        animate={
          isInView
            ? {
                y: `-${finalIndex * STEP}em`,
              }
            : { y: 0 }
        }
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // Custom expo-out
        }}
      >
        {sequence.map((d, i) => (
          <span
            key={i}
            className="block"
            style={{
              height: `${STEP}em`,
              lineHeight: `${STEP}`,
            }}
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default NumberTicker;
