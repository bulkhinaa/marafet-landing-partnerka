"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Baby,
  Smartphone,
  Sparkles,
  Building2,
  TrendingUp,
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
  defaultCheck: number; // средний чек
  visitsPerMonth: number;
  l2Multiplier: number; // сколько в среднем рефералов приведёт каждый ваш реферал
  // Slider config
  referralsRange: [number, number];
  checkRange: [number, number];
  utp: string;
}

const PRESETS: Preset[] = [
  {
    id: "mom",
    label: "Мама в декрете",
    description: "Рекомендую соседкам и подругам",
    icon: Baby,
    defaultReferrals: 12,
    defaultCheck: 4500,
    visitsPerMonth: 2,
    l2Multiplier: 2,
    referralsRange: [3, 60],
    checkRange: [2000, 8000],
    utp: "Пассивный доход без отрыва от ребёнка. Скинула ссылку в чат мам — получаете годами.",
  },
  {
    id: "blogger",
    label: "Блогер · инфлюенсер",
    description: "Ссылка в bio + сторис",
    icon: Smartphone,
    defaultReferrals: 200,
    defaultCheck: 5500,
    visitsPerMonth: 2,
    l2Multiplier: 3,
    referralsRange: [50, 2000],
    checkRange: [3000, 12000],
    utp: "Один пост — доход на годы. В отличие от обычных интеграций, тут вы получаете не один платёж, а % с каждого визита.",
  },
  {
    id: "master",
    label: "Действующий мастер",
    description: "Зову коллег и клиентов",
    icon: Sparkles,
    defaultReferrals: 35,
    defaultCheck: 6000,
    visitsPerMonth: 3,
    l2Multiplier: 2,
    referralsRange: [10, 200],
    checkRange: [3000, 12000],
    utp: "+1% к зарплате с каждого визита коллег. Без потолка 2,4 млн как у самозанятых, страховой стаж копится.",
  },
  {
    id: "owner",
    label: "Владелец коворкинга",
    description: "Привожу другие площадки",
    icon: Building2,
    defaultReferrals: 5,
    defaultCheck: 5500,
    visitsPerMonth: 30, // одна площадка = много визитов
    l2Multiplier: 5,
    referralsRange: [1, 30],
    checkRange: [3000, 10000],
    utp: "Параллельно с программой Марафет Пространства. % с записей каждой приведённой площадки.",
  },
];

export function CalculatorSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<PresetId>("blogger");
  const preset = PRESETS.find((p) => p.id === activeId)!;

  const [referrals, setReferrals] = useState(preset.defaultReferrals);
  const [check, setCheck] = useState(preset.defaultCheck);

  // При смене пресета — сбрасываем слайдеры в дефолты
  function selectPreset(id: PresetId) {
    const p = PRESETS.find((x) => x.id === id)!;
    setActiveId(id);
    setReferrals(p.defaultReferrals);
    setCheck(p.defaultCheck);
  }

  const { l1, l2, total, perYear } = useMemo(() => {
    const l1 = Math.round(referrals * check * preset.visitsPerMonth * 0.01);
    const l2 = Math.round(
      referrals * preset.l2Multiplier * check * preset.visitsPerMonth * 0.01
    );
    const total = l1 + l2;
    const perYear = total * 12;
    return { l1, l2, total, perYear };
  }, [referrals, check, preset]);

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
          eyebrow="Калькулятор дохода"
          title={
            <>
              Посмотрите{" "}
              <span className="bg-gradient-to-br from-accent-40 via-magenta-50 to-rose-50 bg-clip-text text-transparent">
                свой доход
              </span>{" "}
              в моменте
            </>
          }
          subtitle="Выберите свой профиль, подвиньте слайдеры. Цифры пересчитываются мгновенно."
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
                    "flex flex-col items-start gap-2 rounded-2xl p-4 text-left transition-all md:p-5",
                    active
                      ? "bg-gradient-to-br from-accent-60 to-magenta-60 text-white shadow-[0_15px_40px_-10px_rgba(122,84,255,0.5)] ring-1 ring-inset ring-white/20"
                      : "bg-white/[0.05] text-white/85 ring-1 ring-inset ring-white/12 hover:bg-white/[0.09]"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-xl",
                      active ? "bg-white/20" : "bg-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-col gap-0.5">
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
            {/* Sliders */}
            <div className="flex flex-col gap-7">
              <SliderField
                label="Сколько человек вы приведёте"
                value={referrals}
                onChange={setReferrals}
                min={preset.referralsRange[0]}
                max={preset.referralsRange[1]}
                step={1}
                suffix="чел."
                hint={`Это L1. У них в среднем по ${preset.l2Multiplier} своих рефералов (L2).`}
              />
              <SliderField
                label="Средний чек их визита"
                value={check}
                onChange={setCheck}
                min={preset.checkRange[0]}
                max={preset.checkRange[1]}
                step={100}
                suffix="₽"
                hint={`Средний бьюти-чек в Москве ${preset.checkRange[0].toLocaleString("ru-RU")}–${preset.checkRange[1].toLocaleString("ru-RU")} ₽.`}
              />

              <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/10">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-40">
                  <Sparkles className="h-3 w-3" />
                  Фиксированные параметры
                </div>
                <p className="mt-2 text-xs text-white/65">
                  Визитов в месяц у каждого реферала: <strong className="text-white">{preset.visitsPerMonth}</strong>
                </p>
                <p className="text-xs text-white/65">
                  Среднее число L2 рефералов у каждого: <strong className="text-white">{preset.l2Multiplier}</strong>
                </p>
                <p className="text-xs text-white/65">
                  Ставки: <strong className="text-white">1% (L1) + 1% (L2)</strong>
                </p>
              </div>
            </div>

            {/* Result */}
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
                  Ваш доход
                </span>
                <span className="text-[10px] text-white/65">
                  на карту, чистыми
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
                      duration={0.8}
                      delay={0}
                      variant="slot"
                    />
                  </span>
                  <span className="font-display text-2xl font-bold md:text-3xl">
                    ₽
                  </span>
                </div>
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
                    L2 · 1% с {referrals * preset.l2Multiplier} друзей друзей
                  </p>
                  <p className="font-display text-xl font-bold leading-none">
                    {l2.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-inset ring-white/15">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/75">
                  За год
                </p>
                <p className="font-display text-3xl font-bold leading-none md:text-4xl">
                  {perYear.toLocaleString("ru-RU")} ₽
                </p>
                <p className="mt-2 text-[11px] text-white/75">
                  Плюс пенсионный стаж и медицинская страховка
                </p>
              </div>

              <p className="text-xs italic text-white/65">{preset.utp}</p>
            </motion.div>
          </div>

          <p className="mt-6 text-center text-xs text-white/50">
            Расчёт ориентировочный. Реальные суммы зависят от активности рефералов
            и среднего чека их визитов. НДФЛ 13% удерживается автоматически до
            выплаты на карту, в калькуляторе показаны чистые суммы к получению.
          </p>
        </div>
      </Container>
    </section>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
  hint?: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">
          {label}
        </label>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-bold text-white">
            {value.toLocaleString("ru-RU")}
          </span>
          <span className="text-xs font-bold text-white/70">{suffix}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="custom-slider"
        style={
          {
            "--slider-percent": `${percent}%`,
          } as React.CSSProperties
        }
      />
      {hint && (
        <p className="text-[10px] leading-relaxed text-white/45">{hint}</p>
      )}
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
