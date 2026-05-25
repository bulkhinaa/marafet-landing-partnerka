"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BorderBeamButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

/**
 * Premium-кнопка с вращающейся подсветкой по периметру.
 * Эффект достигается через ::before c conic-gradient + slow rotate.
 * Дёшево: один transform: rotate, никакого filter / blur большого радиуса.
 *
 * Структура:
 *  - wrapper (rounded-full, overflow-hidden)
 *  - ::before (поверх — вращающийся conic-gradient)
 *  - inner (с padding 2px от края — это и есть "рамка")
 */
export function BorderBeamButton({
  children,
  icon,
  className,
  ...rest
}: BorderBeamButtonProps) {
  return (
    <button
      className={cn(
        "group relative isolate inline-flex h-14 items-center justify-center overflow-hidden rounded-full",
        "transition-transform duration-200 ease-out active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-60 focus-visible:ring-offset-2",
        className
      )}
      {...rest}
    >
      {/* Вращающаяся подсветка — conic-gradient, GPU-композитно */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-[beamSpin_4s_linear_infinite] will-change-transform"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #FFFFFF 30deg, #CABBFF 90deg, transparent 120deg, transparent 360deg)",
        }}
      />
      {/* Внутренний слой — собственно кнопка */}
      <span className="relative inline-flex h-[calc(100%-3px)] items-center gap-2.5 rounded-full gradient-brand px-[calc(2rem-1.5px)] text-base font-semibold text-white">
        <span>{children}</span>
        {icon}
      </span>
    </button>
  );
}
