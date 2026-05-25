"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { assetPath } from "@/lib/paths";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export function AnimatedLogo({ size = 400, className = "" }: AnimatedLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow ring - pulsing */}
      <motion.div
        className="absolute inset-0 rounded-[25%]"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(171,92,233,0.4), rgba(122,84,255,0.6), rgba(171,92,233,0.4))",
          filter: "blur(40px)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
                rotate: [0, 360],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Second glow layer - counter rotation */}
      <motion.div
        className="absolute inset-[10%] rounded-[25%]"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(255,107,156,0.3), rgba(171,92,233,0.5), rgba(122,84,255,0.4), rgba(255,107,156,0.3))",
          filter: "blur(30px)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.7, 0.4],
                rotate: [360, 0],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Sparkle particles around logo */}
      {!prefersReducedMotion &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white"
            style={{
              left: "50%",
              top: "50%",
              boxShadow: "0 0 10px 2px rgba(255,255,255,0.8)",
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 4) * (size * 0.55)],
              y: [0, Math.sin((i * Math.PI) / 4) * (size * 0.55)],
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Logo container with float animation */}
      <motion.div
        className="absolute inset-[8%] flex items-center justify-center"
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -12, 0],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Logo shadow */}
        <div
          className="absolute inset-0 rounded-[20%]"
          style={{
            background: "rgba(122,84,255,0.3)",
            filter: "blur(25px)",
            transform: "translateY(20px) scale(0.9)",
          }}
        />

        {/* Actual logo with shine effect */}
        <motion.div
          className="relative w-full h-full rounded-[20%] overflow-hidden"
          style={{
            boxShadow:
              "0 25px 80px -15px rgba(122,84,255,0.5), 0 10px 30px -10px rgba(171,92,233,0.4)",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={assetPath("/logo.svg")}
            alt="Марафет"
            fill
            className="object-contain"
            priority
          />

          {/* Shine sweep effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: ["-100%", "200%"],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Orbiting accent dots */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute h-4 w-4 rounded-full"
            style={{
              background: "linear-gradient(135deg, #ff7b9c, #ab5ce9)",
              boxShadow: "0 4px 15px rgba(255,123,156,0.5)",
              left: "50%",
              top: "50%",
              marginLeft: -8,
              marginTop: -8,
            }}
            animate={{
              x: [size * 0.45, 0, -size * 0.45, 0, size * 0.45],
              y: [0, -size * 0.45, 0, size * 0.45, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute h-3 w-3 rounded-full"
            style={{
              background: "linear-gradient(135deg, #7a54ff, #cabbff)",
              boxShadow: "0 4px 12px rgba(122,84,255,0.5)",
              left: "50%",
              top: "50%",
              marginLeft: -6,
              marginTop: -6,
            }}
            animate={{
              x: [0, size * 0.4, 0, -size * 0.4, 0],
              y: [size * 0.4, 0, -size * 0.4, 0, size * 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </>
      )}
    </div>
  );
}
