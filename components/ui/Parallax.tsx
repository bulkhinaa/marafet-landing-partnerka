"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

interface ParallaxProps {
  children: ReactNode;
  /**
   * Сила параллакса в долях относительно высоты вьюпорта.
   * Положительные значения = быстрее скролла (foreground, поднимается вверх быстрее).
   * Отрицательные = медленнее (background, "отстаёт" — кажется глубже).
   * Типичные диапазоны: -0.3 ... +0.3
   */
  speed?: number;
  /** Дополнительный horizontal drift, в долях вьюпорта (-0.2 ... +0.2) */
  driftX?: number;
  /** Масштаб контента при движении (1 = без изменений; 0.8 / 1.2 даёт лёгкий "наезд") */
  scaleRange?: [number, number];
  /** Прозрачность при скролле */
  opacityRange?: [number, number];
  className?: string;
}

/**
 * GPU-friendly параллакс через framer-motion useScroll + useTransform.
 * Считает scrollYProgress относительно элемента (offset start-end / end-start),
 * мапит в transform: translate3d + scale + opacity.
 * Никаких top/left/width — всё на композите, не вызывает layout/paint вне самого слоя.
 */
export function Parallax({
  children,
  speed = -0.15,
  driftX = 0,
  scaleRange,
  opacityRange,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ScrollYProgress: 0 — элемент только показался снизу, 1 — ушёл сверху.
  // Translate в долях вьюпорта = speed * 100vh.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -50}%`, `${speed * 50}%`]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${driftX * -50}%`, `${driftX * 50}%`]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleRange ? [scaleRange[0], (scaleRange[0] + scaleRange[1]) / 2, scaleRange[1]] : [1, 1, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    opacityRange
      ? [opacityRange[0], opacityRange[1], opacityRange[1], opacityRange[0]]
      : [1, 1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, x, scale, opacity, willChange: "transform" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Альтернатива — параллакс, считающий offset от глобального scroll'а страницы.
 * Применяй для декоративных fixed-style слоёв в hero, которые не должны
 * перепривязываться к конкретной секции.
 */
export function ParallaxGlobal({
  children,
  speed = -0.15,
  className,
}: Pick<ParallaxProps, "children" | "speed" | "className">) {
  const { scrollY } = useScroll();
  const y = useTransform(
    scrollY,
    [0, 1000],
    [0, 1000 * speed]
  ) as MotionValue<number>;

  return (
    <motion.div
      style={{ y, willChange: "transform" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
