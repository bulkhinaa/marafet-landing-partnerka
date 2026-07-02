"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Baby,
  Smartphone,
  Sparkles,
  Building2,
  TrendingUp,
  Plus,
  Minus,
  Info,
  AlertTriangle,
  Calculator as CalcIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { cn } from "@/lib/cn";

type PresetId = "mom" | "blogger" | "master" | "owner";

interface Preset {
  id: PresetId;
  label: string;
  description: string;
  icon: typeof Baby;
  // Defaults
  defaultReferrals: number;
  visitsPerMonth: number;
  l2Multiplier: number;
  // Slider config
  referralsRange: [number, number];
  step: number;
  bigStep: number;
  utp: string;
}

// Фиксированный средний бьюти-чек заложен в платформу
const AVG_CHECK = 3000;
const RATE_L1 = 0.01; // 1% с визитов уровня 1
const RATE_L2 = 0.01; // 1% с визитов уровня 2

const PRESETS: Preset[] = [
  {
    id: "mom",
    label: "Мама в декрете",
    description: "Рекомендую соседкам и подругам",
    icon: Baby,
    defaultReferrals: 10,
    visitsPerMonth: 2,
    l2Multiplier: 2,
    referralsRange: [1, 50],
    step: 1,
    bigStep: 5,
    utp: "Пассивный доход без отрыва от ребёнка. Скинули ссылку в чат мам — потенциально получаете годами.",
  },
  {
    id: "blogger",
    label: "Блогер · инфлюенсер",
    description: "Ссылка в bio + сторис",
    icon: Smartphone,
    defaultReferrals: 200,
    visitsPerMonth: 2,
    l2Multiplier: 3,
    referralsRange: [10, 2000],
    step: 10,
    bigStep: 100,
    utp: "В отличие от обычных рекламных интеграций — не один разовый платёж, а потенциальный % с каждого визита перешедших по ссылке.",
  },
  {
    id: "master",
    label: "Действующий мастер",
    description: "Зову коллег и клиентов",
    icon: Sparkles,
    defaultReferrals: 30,
    visitsPerMonth: 3,
    l2Multiplier: 2,
    referralsRange: [1, 200],
    step: 1,
    bigStep: 10,
    utp: "Потенциально +1% к доходу с каждого визита коллег. Без потолка 2,4 млн как у самозанятых, страховой стаж копится.",
  },
  {
    id: "owner",
    label: "Владелец коворкинга",
    description: "Привожу другие площадки",
    icon: Building2,
    defaultReferrals: 3,
    visitsPerMonth: 30,
    l2Multiplier: 5,
    referralsRange: [1, 20],
    step: 1,
    bigStep: 1,
    utp: "Параллельно с программой Марафет Пространства. % с записей каждой приведённой площадки.",
  },
];

export function CalculatorSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<PresetId>("blogger");
  const preset = PRESETS.find((p) => p.id === activeId)!;
  const [referrals, setReferrals] = useState(preset.defaultReferrals);

  function selectPreset(id: PresetId) {
    const p = PRESETS.find((x) => x.id === id)!;
    setActiveId(id);
    setReferrals(p.defaultReferrals);
  }

  function clamp(v: number) {
    return Math.max(preset.referralsRange[0], Math.min(preset.referralsRange[1], v));
  }

  const { l1Visits, l2People, l2Visits, l1, l2, total, perYear } = useMemo(() => {
    const l1Visits = referrals * preset.visitsPerMonth;
    const l1 = Math.round(l1Visits * AVG_CHECK * RATE_L1);
    const l2People = referrals * preset.l2Multiplier;
    const l2Visits = l2People * preset.visitsPerMonth;
    const l2 = Math.round(l2Visits * AVG_CHECK * RATE_L2);
    const total = l1 + l2;
    const perYear = total * 12;
    return { l1Visits, l2People, l2Visits, l1, l2, total, perYear };
  }, [referrals, preset]);

  return (
    <section
      id="calculator"
      className="relative isolate overflow-hidden bg-ink-100 py-24 md:py-32 lg:py-40"
    >
      {/* Декоративные orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 -z-0 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(122,84,255,0.65) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-1/4 -z-0 h-[500px] w-[500px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(171,92,233,0.6) 0%, transparent 70%)",
        }}
      />

      <Container size="xl" className="relative">
        <SectionHeading
          eyebrow="Калькулятор · только пример"
          title={
            <>
              Посмотрите{" "}
              <span className="bg-gradient-to-br from-accent-40 via-magenta-50 to-rose-50 bg-clip-text text-transparent">
                потенциальный доход
              </span>{" "}
              в моменте
            </>
          }
          subtitle="Выберите свой профиль и подвиньте слайдер — число рефералов влияет на результат. Калькулятор расчётный и иллюстративный."
          align="center"
          className="[&_h2]:!text-white [&_p]:!text-white/75 mx-auto"
        />

        <div className="mx-auto mt-14 max-w-6xl md:mt-20">
          {/* Preset tabs */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {PRESETS.map((p) => {
              const Icon = p.icon;
              const active = p.id === activeId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectPreset(p.id)}
                  className={cn(
                    "relative flex flex-col items-start gap-2 overflow-hidden rounded-2xl p-4 text-left transition-all md:p-5",
                    active
                      ? "bg-gradient-to-br from-accent-60 to-magenta-60 text-white shadow-[0_15px_40px_-10px_rgba(122,84,255,0.5)] ring-1 ring-inset ring-white/20"
                      : "bg-white/[0.05] text-white/85 ring-1 ring-inset ring-white/12 hover:bg-white/[0.09] hover:scale-[1.02]"
                  )}
                >
                  {/* Soft inset shine на активном пресете — чистый CSS, без motion */}
                  {active && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.22) 0%, transparent 65%)",
                      }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative inline-flex h-9 w-9 items-center justify-center rounded-xl",
                      active ? "bg-white/20" : "bg-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="relative flex flex-col gap-0.5">
                    <span className="font-display text-sm font-bold leading-tight md:text-base">
                      {p.label}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] leading-tight md:text-xs",
                        active ? "text-white/85" : "text-white/55"
                      )}
                    >
                      {p.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Calc body */}
          <div className="mt-6 grid gap-6 rounded-[32px] bg-white/[0.04] p-6 ring-1 ring-inset ring-white/12 backdrop-blur-sm md:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
            {/* LEFT — стейпер числа рефералов */}
            <div className="flex flex-col gap-6">
              <ReferralStepper
                preset={preset}
                value={referrals}
                onChange={(v) => setReferrals(clamp(v))}
              />

              {/* Что мы зафиксировали */}
              <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/10">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-40">
                  <Info className="h-3 w-3" />
                  Что заложено в расчёт
                </div>
                <dl className="mt-2 grid gap-1.5 text-xs text-white/65">
                  <FixedRow
                    label="Средний чек визита"
                    value={`${AVG_CHECK.toLocaleString("ru-RU")} ₽`}
                    note="среднерыночный бьюти-чек, заложен в платформе"
                  />
                  <FixedRow
                    label="Визитов в месяц у каждого реферала"
                    value={String(preset.visitsPerMonth)}
                    note="зависит от профиля"
                  />
                  <FixedRow
                    label="Среднее число L2-рефералов у каждого"
                    value={String(preset.l2Multiplier)}
                    note="«друзья друзей»"
                  />
                  <FixedRow
                    label="Ставки выплат"
                    value="1% (L1) + 1% (L2)"
                    note="из оферты партнёрской программы"
                  />
                </dl>
              </div>
            </div>

            {/* RIGHT — результат */}
            <motion.div
              key={activeId}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col gap-5 rounded-3xl bg-gradient-to-br from-accent-60 via-accent-70 to-magenta-70 p-7 text-white shadow-[0_30px_80px_-25px_rgba(122,84,255,0.55)] md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                  <TrendingUp className="h-3 w-3" />
                  Потенциально
                </span>
                <span className="text-[10px] text-white/75">
                  чистыми, на карту
                </span>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-white/75">
                  В месяц
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold leading-none md:text-6xl lg:text-7xl">
                    <NumberTicker
                      value={total}
                      duration={0.6}
                      delay={0}
                      variant="slot"
                    />
                  </span>
                  <span className="font-display text-2xl font-bold md:text-3xl">
                    ₽
                  </span>
                </div>
                <p className="mt-2 text-[11px] italic text-white/65">
                  расчётный пример, не является гарантией дохода
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/65">
                    L1 · 1% с {referrals} рефералов
                  </p>
                  <p className="font-display text-xl font-bold leading-none">
                    {l1.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/65">
                    L2 · 1% с {l2People} друзей друзей
                  </p>
                  <p className="font-display text-xl font-bold leading-none">
                    {l2.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-inset ring-white/15">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/75">
                  За год · потенциально
                </p>
                <p className="font-display text-3xl font-bold leading-none md:text-4xl">
                  {perYear.toLocaleString("ru-RU")} ₽
                </p>
                <p className="mt-2 text-[11px] text-white/75">
                  Плюс страховой стаж для пенсии и взносы на медицинское
                  страхование
                </p>
              </div>

              <p className="text-xs italic text-white/75">{preset.utp}</p>
            </motion.div>
          </div>

          {/* Как мы считаем — раскрытие формулы */}
          <HowWeCalculate
            referrals={referrals}
            preset={preset}
            l1Visits={l1Visits}
            l2People={l2People}
            l2Visits={l2Visits}
            l1={l1}
            l2={l2}
            total={total}
          />

          {/* Большой видимый дисклеймер */}
          <div className="mt-6 rounded-2xl bg-warning/[0.08] p-5 ring-1 ring-inset ring-warning/30 md:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
              <div className="flex flex-col gap-2 text-sm text-white/80">
                <p className="font-display text-base font-bold text-white">
                  Это расчётный пример, не оферта и не обещание дохода
                </p>
                <p>
                  Калькулятор показывает <strong>потенциальный</strong> доход
                  при выбранных параметрах. Реальные суммы зависят от того,
                  насколько активно ваши рефералы пользуются Марафетом, какие
                  у них реальные чеки и сколько визитов они совершают.
                </p>
                <p>
                  Марафет не гарантирует достижение указанных в калькуляторе
                  значений. Окончательные условия программы — в оферте партнёрской
                  программы внутри приложения.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Тактильный stepper для числа рефералов:
 * - Большое число посередине
 * - Кнопки -big / -1 / +1 / +big
 * - Слайдер под ними
 * - Визуальная сетка человечков (для пресетов с малыми числами)
 */
function ReferralStepper({
  preset,
  value,
  onChange,
}: {
  preset: Preset;
  value: number;
  onChange: (v: number) => void;
}) {
  const { referralsRange, step, bigStep } = preset;
  const percent = ((value - referralsRange[0]) / (referralsRange[1] - referralsRange[0])) * 100;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">
          Сколько человек вы приведёте
        </label>
        <span className="text-[10px] text-white/45">
          от {referralsRange[0]} до {referralsRange[1].toLocaleString("ru-RU")}
        </span>
      </div>

      {/* Big number + steppers */}
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-inset ring-white/12">
        <div className="flex gap-1">
          <StepBtn onClick={() => onChange(value - bigStep)} label={`-${bigStep}`} />
          <StepBtn onClick={() => onChange(value - step)} icon={<Minus className="h-4 w-4" />} />
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-4xl font-bold tabular-nums text-white md:text-5xl">
            {value.toLocaleString("ru-RU")}
          </span>
          <span className="text-xs font-bold text-white/70">чел.</span>
        </div>

        <div className="flex gap-1">
          <StepBtn onClick={() => onChange(value + step)} icon={<Plus className="h-4 w-4" />} />
          <StepBtn onClick={() => onChange(value + bigStep)} label={`+${bigStep}`} />
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={referralsRange[0]}
        max={referralsRange[1]}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="custom-slider"
        style={{ "--slider-percent": `${percent}%` } as React.CSSProperties}
      />

      {/* Live people grid */}
      <PeopleGrid value={value} max={referralsRange[1]} />

      <style jsx>{`
        .custom-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            rgb(122, 84, 255) 0%,
            rgb(171, 92, 233) var(--slider-percent),
            rgba(255, 255, 255, 0.12) var(--slider-percent),
            rgba(255, 255, 255, 0.12) 100%
          );
          outline: none;
          cursor: pointer;
        }
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          border: 3px solid rgb(122, 84, 255);
          box-shadow: 0 8px 20px -6px rgba(122, 84, 255, 0.6);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .custom-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          border: 3px solid rgb(122, 84, 255);
          box-shadow: 0 8px 20px -6px rgba(122, 84, 255, 0.6);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function StepBtn({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 min-w-[36px] items-center justify-center rounded-xl bg-white/10 px-2.5 text-xs font-bold text-white ring-1 ring-inset ring-white/15 transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
    >
      {icon ?? label}
    </button>
  );
}

/**
 * Визуальная сетка человечков. До 50 — точные. От 50 до 200 — каждая точка = 5 чел. От 200+ — каждая = 50.
 */
function PeopleGrid({ value, max }: { value: number; max: number }) {
  const scale = max <= 50 ? 1 : max <= 200 ? 5 : 50;
  const dotsFilled = Math.ceil(value / scale);
  const totalDots = Math.min(50, Math.ceil(max / scale));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: totalDots }).map((_, i) => {
          const filled = i < dotsFilled;
          return (
            <span
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-200",
                filled
                  ? "bg-gradient-to-br from-accent-40 to-magenta-50 shadow-[0_0_8px_-1px_rgba(171,92,233,0.6)]"
                  : "bg-white/12"
              )}
            />
          );
        })}
      </div>
      {scale > 1 && (
        <p className="text-[10px] text-white/40">
          1 точка ≈ {scale.toLocaleString("ru-RU")} {scale === 5 ? "чел." : "чел."}
        </p>
      )}
    </div>
  );
}

function FixedRow({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="flex-1 truncate">
        {label}{" "}
        <span className="text-[10px] text-white/40">· {note}</span>
      </span>
      <strong className="shrink-0 text-white">{value}</strong>
    </div>
  );
}

/**
 * Прозрачное раскрытие формулы. Шаг за шагом, с реальными числами.
 */
function HowWeCalculate({
  referrals,
  preset,
  l1Visits,
  l2People,
  l2Visits,
  l1,
  l2,
  total,
}: {
  referrals: number;
  preset: Preset;
  l1Visits: number;
  l2People: number;
  l2Visits: number;
  l1: number;
  l2: number;
  total: number;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-inset ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 md:px-7 md:py-4">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent-60/25 text-accent-40">
          <CalcIcon className="h-4 w-4" />
        </span>
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
          Как мы считаем
        </h3>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-3 md:gap-4 md:p-7">
        <FormulaStep
          step="1"
          title="Уровень 1"
          formula={`${referrals} × ${preset.visitsPerMonth} визита × ${AVG_CHECK.toLocaleString("ru-RU")} ₽ × 1%`}
          result={`= ${l1.toLocaleString("ru-RU")} ₽/мес`}
          hint={`${l1Visits.toLocaleString("ru-RU")} визитов от ваших рефералов в месяц`}
        />
        <FormulaStep
          step="2"
          title="Уровень 2"
          formula={`${l2People.toLocaleString("ru-RU")} × ${preset.visitsPerMonth} × ${AVG_CHECK.toLocaleString("ru-RU")} ₽ × 1%`}
          result={`= ${l2.toLocaleString("ru-RU")} ₽/мес`}
          hint={`${referrals} ваших × ${preset.l2Multiplier} их рефералов = ${l2People.toLocaleString("ru-RU")} чел.`}
        />
        <FormulaStep
          step="3"
          title="Итого"
          formula={`${l1.toLocaleString("ru-RU")} ₽ + ${l2.toLocaleString("ru-RU")} ₽`}
          result={`= ${total.toLocaleString("ru-RU")} ₽/мес`}
          hint="Чистыми, на карту. НДФЛ удержали мы."
          highlight
        />
      </div>
      <p className="border-t border-white/10 px-5 py-3 text-[11px] text-white/55 md:px-7">
        Средний чек <strong className="text-white/80">{AVG_CHECK.toLocaleString("ru-RU")} ₽</strong>{" "}
        — это заложенное в платформе среднерыночное значение. Реальный чек ваших
        рефералов может быть выше или ниже.
      </p>
    </div>
  );
}

function FormulaStep({
  step,
  title,
  formula,
  result,
  hint,
  highlight,
}: {
  step: string;
  title: string;
  formula: string;
  result: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl p-4 ring-1 ring-inset",
        highlight
          ? "bg-gradient-to-br from-accent-60/30 to-magenta-60/30 ring-accent-40/40"
          : "bg-white/[0.03] ring-white/10"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/15 font-display text-[10px] font-bold text-white">
          {step}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/75">
          {title}
        </span>
      </div>
      <p className="font-mono text-xs text-white/65 break-words">{formula}</p>
      <p
        className={cn(
          "font-display text-base font-bold leading-tight",
          highlight ? "text-white" : "text-white/90"
        )}
      >
        {result}
      </p>
      {hint && <p className="text-[10px] text-white/45">{hint}</p>}
    </div>
  );
}
