"use client";

import { Baby, Smartphone, Sparkles, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

interface Audience {
  icon: typeof Baby;
  badge: string;
  title: string;
  utp: string;
  scenario: string;
  anchor: string;
  accent: boolean;
}

const AUDIENCES: Audience[] = [
  {
    icon: Baby,
    badge: "Обычные люди",
    title: "Соседский пассивный доход",
    utp: "Привели маникюршу маме, бабушке, подруге — потенциально получаете годами. Без отрыва от ребёнка и работы.",
    scenario: "Скинула ссылку в семейный чат и районный чат мам",
    anchor: "потенциально ~1 800 ₽/мес с 10 рефералов",
    accent: false,
  },
  {
    icon: Smartphone,
    badge: "Блогеры · инфлюенсеры",
    title: "Один пост — потенциальный доход на годы",
    utp: "В отличие от обычных рекламных интеграций, не один разовый платёж, а % с каждого визита всех, кто перешёл по ссылке.",
    scenario: "Поставила ссылку в bio, периодически рекомендует в сторис",
    anchor: "потенциально ~48 000 ₽/мес с 200 переходов",
    accent: true,
  },
  {
    icon: Sparkles,
    badge: "Действующие мастера",
    title: "Зовите коллег и клиентов",
    utp: "Дополнительный 1% с каждого визита коллег. Без потолка 2,4 млн как у самозанятых. Страховой стаж копится автоматически.",
    scenario: "Привёл коллег из соседнего салона и постоянных клиентов",
    anchor: "потенциально ~8 100 ₽/мес с 30 рефералов",
    accent: true,
  },
  {
    icon: Building2,
    badge: "Владельцы коворкингов",
    title: "Привели площадку — % с её записей",
    utp: "Параллельно с программой Марафет Пространства. Привели коллеге другой коворкинг — получаете % с каждой записи в нём.",
    scenario: "Рекомендует Марафет коллеге-владельцу из другого города",
    anchor: "потенциально ~16 200 ₽/мес с 3 точек",
    accent: false,
  },
];

export function AudienceSection() {
  return (
    <Section anchor="audience" tone="light" className="bg-surface-soft">
      <Container size="xl">
        <SectionHeading
          eyebrow="Кому подойдёт"
          title={
            <>
              Партнёрка{" "}
              <span className="bg-gradient-to-br from-accent-60 via-magenta-60 to-rose-60 bg-clip-text text-transparent">
                под каждого
              </span>
            </>
          }
          subtitle="Один и тот же механизм работает по-разному для разных людей. Числа — расчётные примеры при заложенном в платформе среднем чеке 3 000 ₽."
          align="center"
        />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:gap-7 [transform-style:preserve-3d]">
          {AUDIENCES.map((a) => {
            const Icon = a.icon;
            return (
              <TiltCard
                key={a.badge}
                maxTilt={5}
                className={`group flex flex-col gap-5 rounded-3xl p-7 md:p-9 ${
                  a.accent
                    ? "bg-gradient-to-br from-ink-100 via-accent-100 to-ink-100 text-white ring-1 ring-inset ring-accent-60/40"
                    : "bg-white ring-1 ring-inset ring-ink-20"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                      a.accent
                        ? "bg-white/10 text-accent-30 ring-1 ring-inset ring-white/15"
                        : "bg-gradient-to-br from-accent-60 to-magenta-60 text-white shadow-[0_10px_30px_-8px_rgba(122,84,255,0.5)]"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                      a.accent
                        ? "bg-white/10 text-accent-30 ring-1 ring-inset ring-white/15"
                        : "bg-accent-10 text-accent-70"
                    }`}
                  >
                    {a.badge}
                  </span>
                </div>

                <h3
                  className={`font-display text-2xl font-bold leading-tight tracking-tight md:text-[28px] ${
                    a.accent ? "text-white" : "text-ink-100"
                  }`}
                >
                  {a.title}
                </h3>

                <p
                  className={`text-base leading-relaxed ${
                    a.accent ? "text-white/75" : "text-ink-70"
                  }`}
                >
                  {a.utp}
                </p>

                <p
                  className={`text-xs italic ${
                    a.accent ? "text-white/55" : "text-ink-60"
                  }`}
                >
                  {a.scenario}
                </p>

                <div
                  className={`mt-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                    a.accent
                      ? "bg-success/25 text-success ring-1 ring-inset ring-success/30"
                      : "bg-success/15 text-success ring-1 ring-inset ring-success/30"
                  }`}
                >
                  {a.anchor}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
