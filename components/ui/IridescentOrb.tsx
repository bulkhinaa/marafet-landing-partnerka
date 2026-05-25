/**
 * Большой иридесцентный диск — CSS-art замена R3F-объекту.
 * Conic-gradient с переливами + двойная тень → glass/holographic feel.
 * Только transform: rotate, никакого blur, никакого WebGL.
 */
interface IridescentOrbProps {
  size?: number;
  className?: string;
}

export function IridescentOrb({ size = 380, className }: IridescentOrbProps) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ width: size, height: size }}
    >
      <div
        className="relative h-full w-full animate-[blobFloat_8s_ease-in-out_infinite]"
        style={{ willChange: "transform" }}
      >
        {/* Главный диск */}
        <div
          className="absolute inset-0 rounded-full animate-[orbSpin_22s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, #FFD1FF 0deg, #B6A1FF 40deg, #7A54FF 90deg, #AB5CE9 140deg, #FFFFFF 180deg, #CABBFF 230deg, #7A54FF 290deg, #FFD1FF 360deg)",
            boxShadow:
              "0 30px 80px -20px rgba(122,84,255,0.55), inset 0 0 60px rgba(255,255,255,0.4)",
            willChange: "transform",
          }}
        />
        {/* Inner glass overlay */}
        <div
          className="absolute inset-[18%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.15) 30%, transparent 70%)",
          }}
        />
        {/* Highlight blob */}
        <div
          className="absolute left-[20%] top-[15%] h-[28%] w-[28%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
      </div>
    </div>
  );
}
