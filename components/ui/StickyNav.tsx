"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { LogoMark } from "./Logo";
import { MARAFET_APP_URL, PROSTRANSTVA_URL } from "@/lib/paths";

const SECTIONS = [
  { id: "how-it-works", label: "Как работает" },
  { id: "earnings", label: "Сколько вы заработаете" },
  { id: "calculator", label: "Калькулятор" },
  { id: "legal", label: "Юридически" },
  { id: "faq", label: "FAQ" },
];

function EcosystemChips({ scrolled }: { scrolled: boolean }) {
  return (
    <div
      className={cn(
        "hidden shrink-0 items-center gap-0.5 rounded-full p-0.5 lg:inline-flex",
        scrolled
          ? "bg-ink-10 ring-1 ring-inset ring-ink-20"
          : "bg-white/10 ring-1 ring-inset ring-white/20 backdrop-blur"
      )}
    >
      <a
        href={MARAFET_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
          scrolled ? "text-ink-60 hover:text-ink-100" : "text-white/65 hover:text-white"
        )}
      >
        Приложение
      </a>
      <a
        href={PROSTRANSTVA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
          scrolled ? "text-ink-60 hover:text-ink-100" : "text-white/65 hover:text-white"
        )}
      >
        Коворкингам
      </a>
      <span
        className={cn(
          "rounded-full px-3 py-1 text-[11px] font-bold",
          scrolled ? "bg-ink-100 text-white" : "bg-white text-ink-100"
        )}
      >
        Партнёрам
      </span>
    </div>
  );
}

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 40);
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center gap-3 rounded-full transition-all duration-300",
          "w-[calc(100%-32px)] max-w-[1320px] px-3 md:gap-4 md:px-5",
          scrolled
            ? "bg-white/90 ring-1 ring-inset ring-ink-20 shadow-[0_10px_40px_-15px_rgba(30,22,57,0.18)] backdrop-blur-md py-2"
            : "bg-white/0 ring-1 ring-inset ring-white/15 backdrop-blur-sm py-3"
        )}
      >
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2.5"
          aria-label="Партнёрская программа Марафет · главная"
        >
          <LogoMark size={36} glow />
          <span
            className={cn(
              "hidden whitespace-nowrap font-display text-sm font-bold tracking-tight md:inline",
              scrolled ? "text-ink-100" : "text-white"
            )}
          >
            Марафет
            <span className={cn(scrolled ? "text-ink-60" : "text-white/55")}>
              {" · Партнёрка"}
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors xl:px-3",
                scrolled
                  ? "text-ink-70 hover:bg-accent-10 hover:text-ink-100"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              )}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <EcosystemChips scrolled={scrolled} />

        <a
          href="#download"
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors md:px-5",
            scrolled
              ? "bg-ink-100 text-white hover:bg-ink-90"
              : "bg-white text-ink-100 hover:bg-white/90"
          )}
        >
          Стать партнёром
        </a>
      </div>
    </header>
  );
}
