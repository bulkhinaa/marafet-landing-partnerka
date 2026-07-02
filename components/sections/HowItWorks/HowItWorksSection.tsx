"use client";

import {
  Smartphone,
  Link2,
  Users,
  Coins,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Step {
  num: string;
  icon: typeof Smartphone;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    icon: Smartphone,
    title: "Регистрируетесь",
    description:
      "Установите Марафет, нажмите «Стать партнёром». Нужен только паспорт и карта. Минута на подключение к оферте партнёрской программы прямо в приложении.",
  },
  {
    num: "02",
    icon: Link2,
    title: "Получаете ссылку",
    description:
      "Персональная ссылка и QR-код для шеринга. Делитесь в чатах, соцсетях, ставите в bio. Срок действия пожизненный.",
  },
  {
    num: "03",
    icon: Users,
    title: "Приглашаете",
    description:
      "Любых людей: клиентов, мастеров, других партнёров. Когда они регистрируются по вашей ссылке, привязываются к вам навсегда.",
  },
  {
    num: "04",
    icon: Coins,
    title: "Получаете деньги",
    description:
      "1% с каждого их визита плюс 1% с визитов их друзей. Раз в месяц по заявке в приложении выводите на карту. НДФЛ удерживаем мы.",
  },
];

export function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section anchor="how-it-works" tone="light">
      <Container size="xl">
        <SectionHeading
          eyebrow="Как это работает"
          title={
            <>
              4 шага. От установки приложения{" "}
              <span className="bg-gradient-to-br from-accent-60 via-magenta-60 to-rose-60 bg-clip-text text-transparent">
                до первой выплаты
              </span>
            </>
          }
          subtitle="Никаких заполнений анкет, регистрации ИП или походов в налоговую. Всё внутри приложения за минуту."
          align="center"
        />

        <div className="relative mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connector line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-accent-30 to-transparent lg:block"
          />

          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.num}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col gap-4 rounded-3xl bg-white p-7 ring-1 ring-inset ring-ink-20 transition-all hover:shadow-[0_25px_60px_-25px_rgba(122,84,255,0.3)] hover:ring-accent-30 md:p-8"
              >
                <span className="absolute right-6 top-6 font-display text-3xl font-bold text-accent-10 transition-colors group-hover:text-accent-20 md:text-4xl">
                  {s.num}
                </span>

                <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-60 to-magenta-60 text-white shadow-[0_10px_30px_-8px_rgba(122,84,255,0.5)]">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-60">
                  шаг {s.num}
                </p>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink-100 md:text-[26px]">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-70">
                  {s.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
