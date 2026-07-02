"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles as SparklesIcon, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Sparkles } from "@/components/ui/Sparkles";
import { Marquee } from "@/components/ui/Marquee";

export function DownloadSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section anchor="download" tone="dark" className="bg-ink-100">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(171,92,233,0.7) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 -z-0 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(122,84,255,0.7) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 -z-0 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,123,156,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Sparkles overlay — только md+, экономим CPU мобилки */}
      <div className="pointer-events-none absolute inset-0 -z-0 hidden md:block">
        <Sparkles
          count={12}
          color="rgba(255,255,255,0.85)"
          minSize={1}
          maxSize={3}
          className="absolute inset-0"
        />
      </div>

      <Container size="lg" className="relative">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-10 text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white ring-1 ring-inset ring-white/20 backdrop-blur">
            <SparklesIcon className="h-3.5 w-3.5 text-magenta-50" />
            Стать партнёром
          </span>

          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Установите{" "}
            <span className="bg-gradient-to-br from-accent-40 via-magenta-50 to-rose-50 bg-clip-text text-transparent">
              Марафет
            </span>
            <br />
            и подпишите договор за минуту
          </h2>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
            Бесплатно. Без бумажек. Без открытия ИП. С первого визита вашего
            реферала пойдут начисления.
          </p>

          {/* Плашка вместо кнопок: приложение ещё не опубликовано в сторах */}
          <div className="inline-flex items-center gap-2.5 rounded-2xl bg-white/[0.08] px-6 py-4 ring-1 ring-inset ring-white/20 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-40 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-40" />
            </span>
            <span className="font-display text-base font-bold text-white">
              Скоро в App Store и Google Play
            </span>
          </div>

          {/* Кнопки сторов скрыты: ссылки вели в никуда (href="#"), приложение
              не опубликовано. Вернуть с реальными URL после релиза. */}
          {false && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-6 py-4 text-ink-100 shadow-[0_20px_60px_-20px_rgba(255,255,255,0.4)] transition-transform hover:scale-[1.03]"
            >
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M17.05 12.04c-.02-2.05 1.66-3.03 1.73-3.08-0.95-1.39-2.42-1.58-2.94-1.6-1.25-.13-2.45.74-3.09.74-.65 0-1.63-.72-2.68-.7-1.37.02-2.65.8-3.36 2.04-1.44 2.49-.37 6.18 1.04 8.21.69 1 1.5 2.11 2.55 2.07 1.03-.04 1.41-.66 2.66-.66 1.24 0 1.6.66 2.68.64 1.11-.02 1.81-1.01 2.49-2.01.78-1.15 1.1-2.27 1.12-2.33-.02-.01-2.14-.82-2.16-3.27zM15.06 5.39c.57-.69.95-1.65.85-2.6-.82.03-1.81.55-2.4 1.24-.53.61-.99 1.59-.87 2.53.91.07 1.85-.46 2.42-1.17z" />
              </svg>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[11px] font-medium uppercase tracking-wider text-ink-60">
                  Скачать в
                </span>
                <span className="font-display text-lg font-bold">
                  App Store
                </span>
              </div>
            </a>

            <a
              href="#"
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-white/[0.08] px-6 py-4 text-white ring-1 ring-inset ring-white/25 backdrop-blur transition-colors hover:bg-white/[0.14] hover:ring-white/45"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" aria-hidden>
                <defs>
                  <linearGradient id="gp-pk-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#0078ff" />
                  </linearGradient>
                  <linearGradient id="gp-pk-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff9500" />
                    <stop offset="100%" stopColor="#ffd400" />
                  </linearGradient>
                  <linearGradient id="gp-pk-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff3a3a" />
                    <stop offset="100%" stopColor="#ff7676" />
                  </linearGradient>
                  <linearGradient id="gp-pk-4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d563" />
                    <stop offset="100%" stopColor="#00a046" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#gp-pk-1)"
                  d="M3.6 1.8c-.4.4-.6 1-.6 1.7v17c0 .7.2 1.3.6 1.7l9.5-9.6V11.4L3.6 1.8z"
                />
                <path
                  fill="url(#gp-pk-2)"
                  d="M16.4 15.2L13.1 11.9v0.2l3.3-3.3 4.1 2.4c1.2.7 1.2 1.9 0 2.5l-4.1 2.5z"
                />
                <path
                  fill="url(#gp-pk-3)"
                  d="M16.4 15.2l-3.3-3.3-9.5 9.6c.4.4 1.1.5 1.8 0l11-6.3z"
                />
                <path
                  fill="url(#gp-pk-4)"
                  d="M16.4 8.8L5.4 2.4c-.7-.4-1.4-.4-1.8 0l9.5 9.5 3.3-3.1z"
                />
              </svg>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/70">
                  Доступно в
                </span>
                <span className="font-display text-lg font-bold">
                  Google Play
                </span>
              </div>
            </a>
          </div>
          )}

          <p className="text-xs text-white/45">
            После установки откройте «Кошелёк → Партнёрская программа» и подключитесь
            к оферте партнёрской программы в приложении.
          </p>
        </motion.div>
      </Container>

      {/* Бегущая строка выгод */}
      <div className="relative mt-16 md:mt-20">
        <Marquee speed={45} fade fadeWidth={120} gap={56} className="text-white/65">
          <BenefitItem text="Без ИП" />
          <BenefitItem text="Без бумажек" />
          <BenefitItem text="Без походов в налоговую" />
          <BenefitItem text="Страховой стаж" />
          <BenefitItem text="Полис ОМС" />
          <BenefitItem text="Без лимита 2,4 млн ₽" />
          <BenefitItem text="Чистые деньги на карту" />
          <BenefitItem text="Партнёрская программа Марафет" highlight />
        </Marquee>
      </div>
    </Section>
  );
}

function BenefitItem({ text, highlight }: { text: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display font-bold tracking-tight ${
        highlight
          ? "text-2xl md:text-3xl bg-gradient-to-br from-accent-40 via-magenta-50 to-rose-50 bg-clip-text text-transparent"
          : "text-xl md:text-2xl text-white/55"
      }`}
    >
      <Shield className="h-4 w-4 text-success" />
      {text}
    </span>
  );
}
