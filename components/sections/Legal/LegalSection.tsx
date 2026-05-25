"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Shield,
  FileSignature,
  CreditCard,
  HeartPulse,
  ArrowDown,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LegalSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section anchor="legal" tone="light">
      <Container size="xl">
        <SectionHeading
          eyebrow="Юридически прозрачно"
          title={
            <>
              Вы физлицо, мы{" "}
              <span className="bg-gradient-to-br from-accent-60 via-magenta-60 to-rose-60 bg-clip-text text-transparent">
                налоговый агент
              </span>
            </>
          }
          subtitle="Никакого ИП, никаких самозанятых, никаких отчётов в налоговую. Всё что нужно от вас — подписать договор ГПХ в приложении за 1 минуту."
          align="center"
        />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 lg:gap-6">
          <LegalCard
            icon={<FileSignature className="h-6 w-6" />}
            title="Договор ГПХ с физлицом"
            body="Гражданско-правовой договор подписывается в приложении. Никаких регистраций ИП или статуса самозанятого. Без походов в МФЦ."
            highlight="1 минута на подпись"
          />
          <LegalCard
            icon={<CreditCard className="h-6 w-6" />}
            title="НДФЛ 13% удерживаем мы"
            body="Марафет — налоговый агент по статье 226 НК РФ. Перечисляем НДФЛ в ФНС за вас при каждой выплате. Подавать декларацию не нужно."
            highlight="Чистыми на карту"
          />
          <LegalCard
            icon={<HeartPulse className="h-6 w-6" />}
            title="ОПС + ОМС за наш счёт"
            body="Платим пенсионные и медицинские взносы. У вас идёт страховой стаж, накапливаются пенсионные баллы, действует полис ОМС."
            highlight="Стаж + медицина"
          />
        </div>

        {/* Money flow diagram */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-hidden rounded-[32px] bg-gradient-to-br from-ink-100 via-accent-100 to-ink-100 p-8 text-white ring-1 ring-inset ring-accent-60/30 shadow-[0_30px_80px_-25px_rgba(30,22,57,0.5)] md:mt-16 md:p-12"
        >
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            Как двигаются деньги
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
            На примере одного визита вашего реферала со средним чеком 10 000 ₽
          </p>

          <div className="mt-10 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {/* Step 1: visitor pays */}
            <FlowBox
              caption="Клиент платит за визит"
              amount="10 000 ₽"
              sub="Полная сумма к Марафету"
              tone="white"
            />

            <FlowArrow />

            {/* Step 2: Marafet processes */}
            <FlowBox
              caption="Марафет начисляет вам"
              amount="200 ₽"
              sub="2% (1% L1 + 1% L2)"
              tone="purple"
              note="Удерживаем НДФЛ 13% (26 ₽) и ОПС+ОМС 27,1% (54 ₽) за наш счёт"
            />

            <FlowArrow />

            {/* Step 3: you receive */}
            <FlowBox
              caption="Вам на карту"
              amount="174 ₽"
              sub="Чистыми, готовы к трате"
              tone="success"
              note="+ стаж и полис ОМС"
            />
          </div>

          <div className="mt-10 grid gap-3 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-inset ring-white/10 md:grid-cols-2">
            <FactRow text="Декларацию 3-НДФЛ подавать не нужно — мы налоговый агент" />
            <FactRow text="Можно совмещать с основной работой по найму или ИП" />
            <FactRow text="Лимита по доходу нет (как у самозанятых: 2,4 млн)" />
            <FactRow text="Можно вывести в любой момент по заявке в приложении" />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function LegalCard({
  icon,
  title,
  body,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  highlight: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white p-7 ring-1 ring-inset ring-ink-20 transition-shadow hover:shadow-[0_25px_60px_-25px_rgba(122,84,255,0.3)]">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-60 to-magenta-60 text-white shadow-[0_10px_30px_-8px_rgba(122,84,255,0.5)]">
        {icon}
      </span>
      <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-ink-100 md:text-2xl">
        {title}
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-ink-70">{body}</p>
      <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success ring-1 ring-inset ring-success/30">
        <CheckCircle2 className="h-3.5 w-3.5" />
        {highlight}
      </div>
    </div>
  );
}

function FlowBox({
  caption,
  amount,
  sub,
  tone,
  note,
}: {
  caption: string;
  amount: string;
  sub: string;
  tone: "white" | "purple" | "success";
  note?: string;
}) {
  const toneMap = {
    white: "bg-white/[0.05] text-white ring-white/15",
    purple: "bg-gradient-to-br from-accent-60 to-magenta-60 text-white ring-white/20",
    success: "bg-success text-white ring-white/20",
  };
  return (
    <div
      className={`flex flex-col gap-1 rounded-2xl p-5 ring-1 ring-inset ${toneMap[tone]}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-75">
        {caption}
      </p>
      <p className="font-display text-3xl font-bold leading-none md:text-4xl">
        {amount}
      </p>
      <p className="text-xs opacity-85">{sub}</p>
      {note && <p className="mt-2 text-[10px] leading-relaxed opacity-65">{note}</p>}
    </div>
  );
}

function FlowArrow() {
  return (
    <>
      <ArrowDown className="mx-auto h-5 w-5 text-white/60 lg:hidden" />
      <span className="hidden text-white/60 lg:inline">
        <svg className="h-4 w-8" viewBox="0 0 32 16" fill="none">
          <path
            d="M0 8H30M30 8L24 2M30 8L24 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );
}

function FactRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm text-white/85">
      <Shield className="mt-0.5 h-4 w-4 shrink-0 text-success" />
      <span>{text}</span>
    </div>
  );
}
