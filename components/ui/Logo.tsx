import Image from "next/image";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/paths";

interface LogoMarkProps {
  size?: number;
  className?: string;
  /** Включает свечение под марком (для тёмных фонов и hero-CTA) */
  glow?: boolean;
}

/**
 * Логотип-марк Марафета — официальный SVG.
 * Векторный, масштабируется без потерь. Источник: brand assets.
 */
export function LogoMark({ size = 40, className, glow = false }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className
      )}
      style={{
        width: size,
        height: size,
        filter: glow
          ? "drop-shadow(0 6px 18px rgba(122,84,255,0.4)) drop-shadow(0 0 28px rgba(171,92,233,0.32))"
          : undefined,
      }}
    >
      <Image
        src={assetPath("/logo.svg")}
        alt="Марафет"
        width={size}
        height={size}
        priority={size >= 40}
        unoptimized
      />
    </span>
  );
}

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: number;
  showSubtitle?: boolean;
  glow?: boolean;
}

/**
 * Полный логотип: марк + название «Марафет».
 * Основной B2C-лендинг — без подзаголовка «Пространства».
 */
export function Logo({
  className,
  variant = "dark",
  size = 40,
  showSubtitle = false,
  glow = false,
}: LogoProps) {
  const isLight = variant === "light";
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} glow={glow} />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-tight",
            isLight ? "text-white" : "text-ink-100"
          )}
          style={{ fontSize: size * 0.42 }}
        >
          Марафет
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "mt-0.5 font-semibold uppercase tracking-[0.18em]",
              isLight ? "text-white/55" : "text-ink-60"
            )}
            style={{ fontSize: size * 0.22 }}
          >
            beauty app
          </span>
        )}
      </div>
    </div>
  );
}
