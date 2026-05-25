"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface TypewriterTextProps {
  /** Text to type */
  text: string;
  /** Typing speed in ms per character */
  speed?: number;
  /** Delay before starting */
  delay?: number;
  /** Show blinking cursor */
  cursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Loop the animation */
  loop?: boolean;
  /** Pause duration at end before loop restart (ms) */
  pauseDuration?: number;
  /** Additional className */
  className?: string;
  /** Element type */
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
}

/**
 * Typewriter effect for text.
 */
export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = "|",
  loop = false,
  pauseDuration = 2000,
  className,
  as: Component = "span",
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: !loop, margin: "-50px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || reducedMotion) {
      if (reducedMotion) setDisplayText(text);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      setDisplayText("");
      charIndex = 0;

      const type = () => {
        if (charIndex < text.length) {
          setDisplayText(text.slice(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(type, speed);
        } else {
          setIsTyping(false);
          if (loop) {
            timeoutId = setTimeout(startTyping, pauseDuration);
          }
        }
      };

      timeoutId = setTimeout(type, delay);
    };

    startTyping();

    return () => clearTimeout(timeoutId);
  }, [isInView, text, speed, delay, loop, pauseDuration, reducedMotion]);

  return (
    <Component ref={ref} className={cn("inline-block", className)}>
      {displayText}
      {cursor && (
        <motion.span
          className="ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </Component>
  );
}

export default TypewriterText;
