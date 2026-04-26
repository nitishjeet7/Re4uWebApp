"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  springOptions?: { bounce?: number; duration?: number };
}

export function AnimatedNumber({ value, className, springOptions }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const durationMs = springOptions?.duration ?? 1200;

  const target = useMemo(() => (Number.isFinite(value) ? value : 0), [value]);

  useEffect(() => {
    startRef.current = null;
    let rafId = 0;

    const step = (timestamp: number) => {
      if (startRef.current === null) {
        startRef.current = timestamp;
      }
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      setDisplay(Math.round(target * progress));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, durationMs]);

  return <span className={className}>{display.toLocaleString()}</span>;
}
