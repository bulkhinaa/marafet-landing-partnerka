"use client";

import { HTMLAttributes, ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/cn";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Максимальный угол наклона в градусах */
  maxTilt?: number;
  /** Сила подсветки от 0 до 1 */
  glowStrength?: number;
}

/**
 * Карточка с 3D-наклоном к курсору + radial spotlight на самой карточке.
 * Только transform — никаких top/left/width. GPU-композитно.
 * На мобиле эффект не работает (нет hover) и не мешает.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 8,
  glowStrength = 0.5,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxTilt * 2;
    const rotateY = (x - 0.5) * maxTilt * 2;
    node.style.setProperty("--rx", `${rotateX}deg`);
    node.style.setProperty("--ry", `${rotateY}deg`);
    node.style.setProperty("--mx", `${x * 100}%`);
    node.style.setProperty("--my", `${y * 100}%`);
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", `0deg`);
    node.style.setProperty("--ry", `0deg`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "relative transform-3d transition-transform duration-200 ease-out will-change-transform",
        className
      )}
      style={{
        transform:
          "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
      }}
      {...rest}
    >
      {children}
      {/* Spotlight внутри карточки */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,${glowStrength * 0.6}), transparent 40%)`,
        }}
      />
    </div>
  );
}
