"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Wallet,
  ShieldCheck,
  Sparkles as SparklesIcon,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ShimmerText } from "@/components/ui/ShimmerText";
import { Sparkles } from "@/components/ui/Sparkles";
import { FloatingElement } from "@/components/ui/FloatingElement";
import { assetPath } from "@/lib/paths";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-ink-100 text-white"
    >
      {/* AI cinematic фон. Ken Burns только md+, на мобиле — статичный (экономия GPU) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-50"
      >
        {prefersReducedMotion ? (
          <Image
            src={assetPath("/bg/hero-ethereal.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.15 }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Image
              src={assetPath("/bg/hero-ethereal.jpg")}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        )}
      </div>

      {/* Затемняющий градиент поверх AI фона для читаемости текста */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(23,23,26,0.55) 0%, rgba(23,23,26,0.4) 40%, rgba(23,23,26,0.75) 100%)",
        }}
      />

      {/* Большие радиальные orbs поверх */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-0 h-[700px] w-[700px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(122,84,255,0.65) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 -z-0 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(171,92,233,0.55) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-0 -z-0 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(24,179,138,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Плавающие искры по hero — только md+, чтобы не нагружать мобилку */}
      <div className="pointer-events-none absolute inset-0 -z-0 hidden md:block">
        <Sparkles
          count={12}
          color="rgba(255,255,255,0.85)"
          minSize={1}
          maxSize={3}
          className="absolute inset-0"
        />
      </div>

      <Container
        size="xl"
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* LEFT: текст */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/85 ring-1 ring-inset ring-white/20 backdrop-blur">
              <SparklesIcon className="h-3.5 w-3.5 text-magenta-50" />
              Партнёрская программа Марафет
            </span>

            <h1 className="font-display text-[40px] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[80px]">
              Зарабатывайте{" "}
              <ShimmerText className="bg-gradient-to-br from-accent-40 via-magenta-50 to-rose-50">
                на красоте
              </ShimmerText>
              .
              <br />
              Без{" "}
              <span className="line-through decoration-rose-50/70 decoration-4">
                ИП
              </span>
              , без{" "}
              <span className="line-through decoration-rose-50/70 decoration-4">
                бумажек
              </span>
              ,
              <br />
              без походов в{" "}
              <span className="line-through decoration-rose-50/70 decoration-4">
                налоговую
              </span>
              .
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
              Приглашайте друзей в Марафет — получайте 1% с каждого их визита
              плюс 1% с визитов их друзей. НДФЛ и страховые взносы платим за вас,
              на карту приходят чистые деньги.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#download"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-accent-60 via-magenta-60 to-rose-60 px-5 py-3.5 text-base font-semibold text-white shadow-[0_20px_60px_-20px_rgba(122,84,255,0.65)] transition-transform hover:scale-[1.02]"
              >
                Стать партнёром
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/[0.08] px-5 py-3.5 text-base font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur transition-colors hover:bg-white/[0.14] hover:ring-white/35"
              >
                Рассчитать доход
                <TrendingUp className="h-4 w-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-success" />
                Налоговый агент
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-success" />
                Страховые взносы за вас
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-success" />
                Страховой стаж для пенсии
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-success" />
                Без лимита 2,4 млн ₽
              </span>
            </div>
          </motion.div>

          {/* RIGHT: floating earnings card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <FloatingElement amplitude={6} duration={6}>
              <EarningsPreview />
            </FloatingElement>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Большая карточка-превью: "Маша пригласила 47 человек → 12 350 ₽ за май"
 * Имитирует экран кошелька в приложении.
 */
function EarningsPreview() {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-[50px] bg-gradient-to-br from-accent-60/40 via-magenta-60/40 to-rose-60/25 blur-3xl"
      />

      <div className="relative grid gap-4 rounded-[32px] bg-white/[0.06] p-7 ring-1 ring-inset ring-white/15 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-9">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-60 to-magenta-60 text-white">
              <Wallet className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                Партнёрский кошелёк
              </p>
              <p className="font-display text-sm font-bold text-white">
                Май 2026
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Live
          </span>
        </div>

        {/* Главная цифра */}
        <div className="rounded-2xl bg-gradient-to-br from-accent-60 to-magenta-60 p-5 text-white">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
              Начислено в этом месяце
            </p>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/90">
              пример
            </span>
          </div>
          <p className="mt-1 font-display text-4xl font-bold leading-none md:text-5xl">
            12 350 ₽
          </p>
          <p className="mt-2 text-xs text-white/80">
            НДФЛ уже удержан. На карту по заявке.
          </p>
        </div>

        {/* Разбивка по уровням */}
        <div className="grid grid-cols-2 gap-2.5">
          <LevelStat
            label="Уровень 1"
            value="8 200 ₽"
            sub="с 47 ваших друзей"
            tone="accent"
          />
          <LevelStat
            label="Уровень 2"
            value="4 150 ₽"
            sub="с 138 друзей друзей"
            tone="magenta"
          />
        </div>

        {/* Активность */}
        <div className="grid gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
            Последние начисления
          </p>
          <Activity name="Аня К." service="Маникюр" amount="+18 ₽" lvl={1} />
          <Activity name="Лёша П." service="Стрижка" amount="+47 ₽" lvl={1} />
          <Activity name="Друг Ани" service="Брови" amount="+12 ₽" lvl={2} />
        </div>
      </div>

      {/* Floating "стаж" */}
      <div className="absolute -right-3 top-16 z-20 flex flex-col items-center gap-0 rounded-2xl bg-white px-3 py-2 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)]">
        <span className="font-display text-sm font-bold text-success">
          +стаж
        </span>
        <span className="text-[8px] font-bold uppercase tracking-wider text-ink-60">
          для пенсии
        </span>
      </div>

      {/* Floating "Без декларации" */}
      <div className="absolute -left-3 bottom-24 z-20 flex flex-col items-center gap-0 rounded-2xl bg-success px-3 py-2 text-white shadow-[0_15px_40px_-10px_rgba(24,179,138,0.5)]">
        <span className="font-display text-sm font-bold">3-НДФЛ</span>
        <span className="text-[8px] font-bold uppercase tracking-wider text-white/80">
          не подаём
        </span>
      </div>
    </div>
  );
}

function LevelStat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "accent" | "magenta";
}) {
  const toneClass =
    tone === "accent"
      ? "bg-accent-60/20 ring-accent-60/30 text-accent-30"
      : "bg-magenta-60/20 ring-magenta-60/30 text-magenta-50";
  return (
    <div className="rounded-2xl bg-white/[0.04] p-3 ring-1 ring-inset ring-white/10">
      <span
        className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ring-1 ring-inset ${toneClass}`}
      >
        {label}
      </span>
      <p className="mt-2 font-display text-2xl font-bold leading-none text-white">
        {value}
      </p>
      <p className="mt-1 text-[10px] text-white/55">{sub}</p>
    </div>
  );
}

function Activity({
  name,
  service,
  amount,
  lvl,
}: {
  name: string;
  service: string;
  amount: string;
  lvl: 1 | 2;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] p-2 ring-1 ring-inset ring-white/8">
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-bold ring-1 ring-inset ${
          lvl === 1
            ? "bg-accent-60/20 text-accent-30 ring-accent-60/30"
            : "bg-magenta-60/20 text-magenta-50 ring-magenta-60/30"
        }`}
      >
        L{lvl}
      </span>
      <div className="flex-1 min-w-0">
        <p className="truncate text-xs font-bold text-white">{name}</p>
        <p className="truncate text-[10px] text-white/55">{service}</p>
      </div>
      <span className="font-display text-sm font-bold text-success">
        {amount}
      </span>
    </div>
  );
}
