"use client";

import { useEffect, useRef } from "react";

/**
 * Большой radial spotlight, который следует за курсором мыши.
 * Только на десктопе (на мобиле скрыт через `hidden md:block`).
 * Использует CSS custom properties + transform — чисто GPU, без re-render React.
 */
export function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Используем requestAnimationFrame чтобы батчить обновления
    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;

    function flush() {
      rafId = 0;
      if (node) {
        node.style.setProperty("--x", `${pendingX}px`);
        node.style.setProperty("--y", `${pendingY}px`);
      }
    }

    function onMove(e: MouseEvent) {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(flush);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block opacity-60 mix-blend-screen"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50vw) var(--y, 50vh), rgba(122, 84, 255, 0.18), transparent 50%)",
      }}
    />
  );
}
