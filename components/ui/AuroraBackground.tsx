/**
 * Aurora Background — теперь ЯВНО ВИДИМЫЙ.
 * Базовый layer: насыщенные conic-gradients без сильной маски.
 * Dot grid поверх — opacity 0.35.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F4F0FF 0%, #FFFFFF 50%, #F8F4FF 100%)",
      }}
    >
      {/* Большая иридесцентная аурора — сверху */}
      <div
        className="absolute -top-1/3 left-1/2 h-[140%] w-[140%] -translate-x-1/2 will-change-transform animate-[auroraSpin_45s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(122,84,255,0.55) 50deg, transparent 120deg, rgba(171,92,233,0.5) 200deg, transparent 280deg, rgba(202,187,255,0.55) 330deg, transparent 360deg)",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 30%, black 0%, transparent 75%)",
        }}
      />
      {/* Встречная аурора снизу */}
      <div
        className="absolute -bottom-1/3 left-1/2 h-[140%] w-[140%] -translate-x-1/2 will-change-transform animate-[auroraSpinReverse_60s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(171,92,233,0.45) 70deg, transparent 160deg, rgba(122,84,255,0.5) 240deg, transparent 320deg)",
          maskImage:
            "radial-gradient(ellipse 65% 50% at 50% 70%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 50% at 50% 70%, black 0%, transparent 75%)",
        }}
      />
      {/* Dot grid pattern — заметный */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(30,22,57,0.5) 1.2px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 90%)",
        }}
      />
    </div>
  );
}
