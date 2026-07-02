"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MARAFET_APP_URL, PROSTRANSTVA_URL } from "@/lib/paths";

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-ink-100 text-white">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <Container size="xl" className="relative py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12">
          <div className="flex flex-col gap-5">
            <Logo variant="light" size={44} />
            <p className="max-w-sm text-sm leading-relaxed text-white/65 md:text-base">
              Партнёрская программа Марафет. 1% + 1% с визитов рефералов.
              Без ИП, без бумажек, без налоговой.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/15"
              >
                App Store
              </a>
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/15"
              >
                Google Play
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">
              По этой странице
            </h4>
            <Link
              href="#how-it-works"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              Как работает
            </Link>
            <Link
              href="#earnings"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              Сколько вы заработаете
            </Link>
            <Link
              href="#calculator"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              Калькулятор
            </Link>
            <Link
              href="#legal"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              Юридически
            </Link>
            <Link
              href="#faq"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              FAQ
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">
              Экосистема Марафет
            </h4>
            <a
              href={MARAFET_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white"
            >
              Приложение для клиентов и мастеров
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={PROSTRANSTVA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white"
            >
              Марафет Пространства (коворкингам)
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:hello@marafet.app"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              hello@marafet.app
            </a>
            <a
              href="https://t.me/marafet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              Telegram
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Марафет. Все права защищены.</p>
          {/* Юр-ссылки скрыты: документов ещё нет (href="#" вели в никуда).
              КРИТИЧНО для партнёрки: на странице обещания про налоги/договор —
              оферту нужно опубликовать в первую очередь. */}
          {false && (
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="transition-colors hover:text-white/75">
                Политика конфиденциальности
              </a>
              <a href="#" className="transition-colors hover:text-white/75">
                Оферта партнёрской программы
              </a>
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
