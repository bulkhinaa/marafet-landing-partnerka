import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Задержка перед первым словом */
  delay?: number;
  /** Шаг между словами */
  stagger?: number;
  /** Render override — позволяет обернуть отдельные слова в highlight */
  renderWord?: (word: string, index: number) => ReactNode;
}

/**
 * Появление текста по словам — CSS animation-delay через inline style,
 * запускается сразу при монтировании (CSS will-change опускаем —
 * это одноразовая анимация, не нужна композитная фиксация).
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  renderWord,
}: TextRevealProps) {
  const words = text.split(" ");
  return (
    <Tag className={cn("[perspective:1000px]", className)}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-[wordIn_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {renderWord ? renderWord(w, i) : w}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
