"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Когда я получу первые деньги?",
    a: "Деньги начисляются автоматически в момент каждого визита вашего реферала. Накапливаются в партнёрском кошельке в приложении. Вывод на карту по заявке раз в месяц.",
  },
  {
    q: "Что если приглашённый не покупает услуги?",
    a: "Тогда вы ничего не получаете, но и не теряете. Партнёрка работает по принципу revenue share: процент только с реальных оплаченных визитов. Никаких обязательств и комиссий.",
  },
  {
    q: "Нужно ли подавать декларацию 3-НДФЛ?",
    a: "Нет. Марафет является налоговым агентом по статье 226 НК РФ. Мы сами удерживаем 13% НДФЛ при каждой выплате и перечисляем в ФНС за вас. Вам ничего подавать не нужно.",
  },
  {
    q: "А если я уже самозанятый или ИП?",
    a: "Можно. По умолчанию вы работаете как физлицо — мы налоговый агент. Если у вас уже есть НПД (самозанятость), можете переключить флаг в приложении и работать по нему (тогда сами платите 4–6%, но получаете больше на руки). Выбор за вами.",
  },
  {
    q: "Откуда страховые взносы? Я ведь физлицо.",
    a: "По договору ГПХ Марафет является вашим страхователем. Платим за вас взносы на обязательное пенсионное (ОПС, 22%) и медицинское (ОМС, 5,1%) страхование. У вас идёт страховой стаж, копятся пенсионные баллы, действует полис ОМС.",
  },
  {
    q: "Какой минимум для вывода?",
    a: "Минимума нет. Любая сумма выводится по заявке. Заявки обрабатываем раз в месяц, выплаты идут на карту в течение нескольких рабочих дней.",
  },
  {
    q: "Есть ли лимит по сумме заработка?",
    a: "Лимита нет. В отличие от самозанятых, у которых потолок 2,4 млн ₽/год, по договору ГПХ можно зарабатывать сколько угодно. Все суммы корректно облагаются НДФЛ.",
  },
  {
    q: "Сколько раз начисляется % с одного клиента?",
    a: "Каждый раз, когда ваш реферал делает оплаченный визит. Через приложение Марафет, на всю жизнь. Не только за первый визит — пока он пользуется приложением, вы получаете %.",
  },
  {
    q: "Можно ли вывести бонусы оплатой услуг в приложении?",
    a: "Да. Если оплачивать визит из партнёрского кошелька, НДФЛ не удерживается (это бонусные баллы). Если выводить на карту — Марафет удерживает 13%.",
  },
  {
    q: "Срок действия рефералки и партнёрки?",
    a: "Пожизненный. Привязка реферала к вам не сбрасывается. Договор ГПХ действует бессрочно, пока вы пользуетесь Марафетом.",
  },
];

export function FAQSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section anchor="faq" tone="light">
      <Container size="md">
        <SectionHeading
          eyebrow="FAQ"
          title="Частые вопросы"
          subtitle="Если ответа нет — пишите в Telegram или на hello@marafet.app, отвечаем за 24 часа."
          align="center"
        />

        <div className="mt-12 flex flex-col gap-3 md:mt-16">
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl bg-white ring-1 ring-inset ring-ink-20 transition-shadow hover:shadow-[0_15px_40px_-20px_rgba(122,84,255,0.2)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                >
                  <span className="flex-1 font-display text-base font-bold tracking-tight text-ink-100 md:text-lg">
                    {f.q}
                  </span>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      open
                        ? "bg-accent-60 text-white rotate-180"
                        : "bg-accent-10 text-accent-60"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-70 md:px-6 md:pb-6 md:text-base">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
