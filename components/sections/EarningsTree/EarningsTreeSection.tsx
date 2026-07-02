"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Users, Heart, Infinity as InfinityIcon, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Earnings Tree — визуальное объяснение 2-уровневой схемы 1% + 1%.
 * Дерево: вы → друзья → их друзья. С анимацией пульсации монеток.
 */
export function EarningsTreeSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section anchor="earnings" tone="light" className="bg-surface-soft">
      <Container size="xl">
        <SectionHeading
          eyebrow="Сколько вы заработаете"
          title={
            <>
              <span className="bg-gradient-to-br from-accent-60 via-magenta-60 to-rose-60 bg-clip-text text-transparent">
                1% + 1%
              </span>{" "}
              на двух уровнях. Пожизненно
            </>
          }
          subtitle="Не сетевой маркетинг — глубина программы всего 2 уровня. Без обязательных закупок и квалификаций. Один раз привели человека, дальше получаете с него всегда."
          align="center"
        />

        <div className="mt-14 grid items-start gap-10 md:mt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* LEFT: Tree diagram */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[32px] bg-white p-8 ring-1 ring-inset ring-ink-20 shadow-[0_20px_60px_-25px_rgba(122,84,255,0.25)] md:p-10"
          >
            <div className="flex flex-col items-center gap-5">
              {/* You — с пульсирующим кольцом (только desktop) */}
              <div className="relative">
                {/* Pulse rings — md+ only, оптимизация для мобилки */}
                {!prefersReducedMotion && (
                  <>
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 hidden rounded-3xl ring-2 ring-accent-60/40 md:block"
                      animate={{
                        scale: [1, 1.4, 1.6],
                        opacity: [0.6, 0.2, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 hidden rounded-3xl ring-2 ring-magenta-60/40 md:block"
                      animate={{
                        scale: [1, 1.4, 1.6],
                        opacity: [0.6, 0.2, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        delay: 1.1,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  </>
                )}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-60 to-magenta-60 text-white shadow-[0_15px_40px_-10px_rgba(122,84,255,0.5)]">
                  <Heart className="h-9 w-9 fill-white" strokeWidth={0} />
                </div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Вы
                </span>
              </div>

              {/* Arrow down + label "+1%" + текущая монетка */}
              <div className="relative flex flex-col items-center">
                <div className="relative h-12 w-px bg-gradient-to-b from-accent-60 to-magenta-60 overflow-visible">
                  {!prefersReducedMotion && (
                    <motion.span
                      className="absolute -left-[5px] top-0 hidden h-2.5 w-2.5 items-center justify-center rounded-full bg-accent-60 shadow-[0_0_12px_2px_rgba(122,84,255,0.6)] md:inline-flex"
                      animate={{ y: [-4, 48], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeIn",
                        delay: 0.3,
                      }}
                    />
                  )}
                </div>
                <span className="absolute -right-2 md:-right-12 top-2 inline-flex items-center gap-1 rounded-full bg-accent-60 px-2.5 py-0.5 text-xs font-bold text-white">
                  +1%
                </span>
              </div>

              {/* L1 friends */}
              <div className="flex items-center gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <FriendChip key={i} delay={i * 0.1} kind="l1" />
                ))}
                <span className="text-2xl font-display font-bold text-ink-60">
                  …
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-60">
                Ваши друзья (уровень 1)
              </p>

              {/* Arrow down + label "+1%" + текущая монетка к L2 */}
              <div className="relative flex flex-col items-center pt-4">
                <div className="relative h-12 w-px bg-gradient-to-b from-magenta-60 to-rose-60 overflow-visible">
                  {!prefersReducedMotion && (
                    <motion.span
                      className="absolute -left-[5px] top-0 hidden h-2.5 w-2.5 items-center justify-center rounded-full bg-magenta-60 shadow-[0_0_12px_2px_rgba(171,92,233,0.6)] md:inline-flex"
                      animate={{ y: [-4, 48], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeIn",
                        delay: 0.9,
                      }}
                    />
                  )}
                </div>
                <span className="absolute -right-2 md:-right-12 top-6 inline-flex items-center gap-1 rounded-full bg-magenta-60 px-2.5 py-0.5 text-xs font-bold text-white">
                  +1%
                </span>
              </div>

              {/* L2 friends-of-friends */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <FriendChip key={i} delay={0.4 + i * 0.05} kind="l2" small />
                ))}
                <span className="text-xl font-display font-bold text-ink-60">
                  …
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-magenta-60">
                Друзья друзей (уровень 2)
              </p>

              <p className="mt-4 max-w-sm text-center text-xs text-ink-60">
                Глубина программы — только 2 уровня. Привязка действует всё время
                существования программы и до расторжения договора любой из сторон.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: 4 explanation cards */}
          <div className="flex flex-col gap-4">
            <ExplainCard
              icon={<Users className="h-5 w-5" />}
              title="Уровень 1 — ваши прямые рефералы"
              body="Все, кого вы привели лично по ссылке/QR. 1% с каждого их визита: маникюр, стрижка, брови, что угодно. Не только с первого, а навсегда."
              tone="accent"
            />
            <ExplainCard
              icon={<Heart className="h-5 w-5" />}
              title="Уровень 2 — их друзья"
              body="Когда ваш друг сам становится партнёром и приводит своих знакомых, вы получаете 1% с их визитов тоже. «Бонусы умеют расти»."
              tone="magenta"
            />
            <ExplainCard
              icon={<InfinityIcon className="h-5 w-5" />}
              title="Долгосрочная привязка"
              body="Однажды зарегистрировавшийся по вашей ссылке — ваш реферал на всё время работы программы. Перейти к другому партнёру нельзя."
              tone="rose"
            />
            <ExplainCard
              icon={<Shield className="h-5 w-5" />}
              title="Без квалификаций и закупок"
              body="Это не MLM. Нет обязательных платежей, рангов, ежемесячных норм. Просто приглашайте, когда удобно."
              tone="success"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FriendChip({
  delay,
  kind,
  small,
}: {
  delay: number;
  kind: "l1" | "l2";
  small?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const size = small ? "h-9 w-9" : "h-12 w-12";
  const tone =
    kind === "l1"
      ? "from-accent-60 to-magenta-60"
      : "from-magenta-50 to-rose-50";
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`flex ${size} items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-[0_8px_20px_-6px_rgba(122,84,255,0.4)]`}
    >
      <Users className={small ? "h-4 w-4" : "h-5 w-5"} />
    </motion.div>
  );
}

function ExplainCard({
  icon,
  title,
  body,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone: "accent" | "magenta" | "rose" | "success";
}) {
  const toneMap = {
    accent: "bg-accent-60 text-white",
    magenta: "bg-magenta-60 text-white",
    rose: "bg-rose-60 text-white",
    success: "bg-success text-white",
  };
  return (
    <div className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-inset ring-ink-20 transition-shadow hover:shadow-[0_15px_40px_-15px_rgba(122,84,255,0.25)]">
      <span
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneMap[tone]}`}
      >
        {icon}
      </span>
      <div className="flex flex-col gap-1.5">
        <h4 className="font-display text-base font-bold text-ink-100">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-ink-70">{body}</p>
      </div>
    </div>
  );
}
