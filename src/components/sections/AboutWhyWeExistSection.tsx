"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutWhyWeExistSection.module.css";

type PeakInfo = {
  title: string;
  body: string;
  looks: string;
  costs: string;
  weDo: string;
};

type Peak = {
  label: string;
  color: "sky" | "green";
  info: PeakInfo;
};

const PEAKS: Peak[] = [
  {
    label: "Hidden expectations",
    color: "sky",
    info: {
      title: "Hidden expectations",
      body:
        "Rules are often implicit. Good work can be dismissed because expectations were never made visible or teachable.",
      looks: 'unclear structure, mismatched framing, "why does this matter?"',
      costs: "time, confidence, and avoidable rework",
      weDo: "make expectations visible with templates and teach-back",
    },
  },
  {
    label: "Uneven mentoring",
    color: "sky",
    info: {
      title: "Uneven mentoring",
      body:
        "Guidance depends on access to supervisors and networks. The same work receives different outcomes based on who helps shape it.",
      looks: "inconsistent feedback, unclear priorities, last-minute rewrites",
      costs: "slow learning and dependence on gatekeepers",
      weDo: "structure feedback so it transfers across future projects",
    },
  },
  {
    label: "Language disadvantage",
    color: "sky",
    info: {
      title: "Language disadvantage",
      body:
        "Clarity becomes gatekeeping when language support is unequal - even when the underlying thinking is strong.",
      looks: "strong ideas hidden by phrasing and reader friction",
      costs: "misunderstanding, lower confidence, reduced reach",
      weDo: "optimize clarity without changing your research claims",
    },
  },
  {
    label: "Fragmented guidance",
    color: "sky",
    info: {
      title: "Fragmented guidance",
      body:
        "Feedback is piecemeal and inconsistent. Researchers fix symptoms, but rarely gain transferable skill.",
      looks: "patchy edits, conflicting advice, no teach-back",
      costs: "repeat mistakes and slow progress",
      weDo: "build a repeatable approach: structure to clarity to teach-back",
    },
  },
  {
    label: "Speed over standards",
    color: "green",
    info: {
      title: "Speed over standards",
      body:
        "Time pressure rewards fast output. Careful communication is penalized, and low-integrity shortcuts look tempting.",
      looks: "rushed submissions and unclear claims",
      costs: "higher risk and lower trust",
      weDo: "keep boundaries explicit and protect integrity under pressure",
    },
  },
];

const PEAK_POSITIONS = [0.12, 0.34, 0.56, 0.74, 0.9];

export function AboutWhyWeExistSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const pulsePhaseRef = useRef(0);
  const timeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeInfo = useMemo(() => PEAKS[activeIndex].info, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = {
      lapisSoft: "rgba(31,58,95,0.16)",
      lapisMid: "rgba(31,58,95,0.18)",
      sky: "rgba(168,199,230,0.95)",
      green: "rgba(63,127,114,0.55)",
    } as const;

    const speed = 0.006;
    const ampBase = 22;
    const ampBreath = 3;
    const freq = (2 * Math.PI) / 520;

    const setActive = (idx: number) => {
      activeIndexRef.current = idx;
      setActiveIndex(idx);
      pulsePhaseRef.current = 0;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const waveY = (x: number, w: number, h: number, time: number, withBoost: boolean) => {
      const mid = h * 0.55;
      const amp = ampBase + ampBreath * Math.sin(time * 0.8);
      let y = mid + Math.sin(x * freq + time) * amp;

      if (withBoost) {
        for (let i = 0; i < PEAK_POSITIONS.length; i += 1) {
          const px = PEAK_POSITIONS[i] * w;
          const dist = Math.abs(x - px);
          const influence = Math.max(0, 1 - dist / 110);
          const boost = (i === 4 ? 16 : 12) * influence;
          y -= boost * influence;
        }
      }
      return y;
    };

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    };

    const getPeakHit = (mx: number, my: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = mx - rect.left;
      const y = my - rect.top;
      const w = rect.width;
      const h = rect.height;

      for (let i = 0; i < PEAK_POSITIONS.length; i += 1) {
        const px = PEAK_POSITIONS[i] * w;
        const py = waveY(px, w, h, timeRef.current, true);
        const r = 16;
        const dx = x - px;
        const dy = y - py;
        if (dx * dx + dy * dy <= r * r) return i;
      }
      return -1;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(255,255,255,0.18)");
      grad.addColorStop(1, "rgba(255,255,255,0.10)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(31,58,95,0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        const yy = h * 0.25 + i * 42;
        for (let x = 0; x <= w; x += 8) {
          const y = yy + Math.sin(x * 0.008 + timeRef.current * 0.5 + i) * 6;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.lineWidth = 3;
      ctx.strokeStyle = colors.lapisSoft;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const y = waveY(x, w, h, timeRef.current, true);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.lineWidth = 2;
      ctx.strokeStyle = colors.lapisMid;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const y = waveY(x, w, h, timeRef.current, true);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      for (let i = 0; i < PEAK_POSITIONS.length; i += 1) {
        const px = PEAK_POSITIONS[i] * w;
        const py = waveY(px, w, h, timeRef.current, true);
        const isActive = i === activeIndexRef.current;
        const pulse =
          1 + (isActive ? 0.08 * Math.sin(pulsePhaseRef.current) : 0.04 * Math.sin(timeRef.current * 0.6 + i));
        const baseR = (isActive ? 8.5 : 7.2) * pulse;

        ctx.beginPath();
        ctx.arc(px, py, baseR + 6, 0, Math.PI * 2);
        ctx.fillStyle = i === 4 ? "rgba(63,127,114,0.10)" : "rgba(168,199,230,0.12)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, baseR, 0, Math.PI * 2);
        ctx.fillStyle = i === 4 ? colors.green : colors.sky;
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(31,58,95,0.18)";
        ctx.stroke();

        ctx.font = "700 12px Inter, system-ui, sans-serif";
        const txt = PEAKS[i].label;
        const padX = 10;
        const chipH = 26;
        const tw = ctx.measureText(txt).width;
        const chipW = tw + padX * 2;

        let lx = px;
        const ly = py - 34;
        if (i === 2) lx = px + 12;
        if (i === 3) lx = px - 12;
        if (i === 4) lx = px - 18;

        roundRect(lx - chipW / 2, ly - chipH / 2, chipW, chipH, 13);
        ctx.fillStyle = "rgba(255,255,255,0.62)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(31,58,95,0.12)";
        ctx.stroke();

        ctx.fillStyle = "rgba(31,58,95,0.85)";
        ctx.fillText(txt, lx - tw / 2, ly + 4);
      }

      timeRef.current += speed;
      pulsePhaseRef.current += 0.18;
      animationRef.current = window.requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const hit = getPeakHit(event.clientX, event.clientY);
      canvas.style.cursor = hit >= 0 ? "pointer" : "default";
    };

    const handleClick = (event: MouseEvent) => {
      const hit = getPeakHit(event.clientX, event.clientY);
      if (hit >= 0) setActive(hit);
    };

    const handleTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const hit = getPeakHit(touch.clientX, touch.clientY);
      if (hit >= 0) setActive(hit);
    };

    resizeCanvas();
    setActive(0);
    draw();

    const onboardingTimer = window.setTimeout(() => setActive(1), 1400);
    const onboardingTimer2 = window.setTimeout(() => setActive(0), 2600);

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouch);
      window.clearTimeout(onboardingTimer);
      window.clearTimeout(onboardingTimer2);
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section} aria-label="Why we exist">
      <svg className={styles.contours} viewBox="0 0 1200 520" aria-hidden="true">
        <g fill="none" stroke="rgba(31,58,95,.10)" strokeWidth="2">
          <path d="M120 360 C240 260, 410 240, 560 260 C720 282, 860 332, 1040 392" />
          <path d="M80 392 C220 292, 400 272, 560 295 C740 320, 900 370, 1120 440" />
          <path d="M150 430 C300 340, 460 320, 620 342 C800 368, 940 412, 1100 480" />
          <path d="M90 330 C220 230, 390 205, 540 226 C730 252, 880 312, 1080 386" />
        </g>
        <g fill="rgba(255,255,255,.22)" stroke="rgba(31,58,95,.07)" strokeWidth="1">
          <circle cx="280" cy="300" r="10" />
          <circle cx="560" cy="260" r="12" />
          <circle cx="840" cy="332" r="10" />
          <circle cx="980" cy="420" r="12" />
        </g>
      </svg>

      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Why we exist</h2>
          <p className={styles.sub}>
            Centered declaration plus a slow wave of barriers. Tap a peak to read what it looks like,
            costs, and what we do.
          </p>
        </div>
        <div className={styles.note}>Wave peaks - click to pop info</div>
      </div>

      <div className={styles.center}>
        <div className={styles.decl} role="region" aria-label="Why we exist statement">
          <p className={styles.lede}>The research world runs on ideas - but it moves on communication.</p>
          <p className={styles.p}>
            Across disciplines, researchers face barriers that have nothing to do with the quality of their
            work: unclear expectations, uneven mentoring, language disadvantage, fragmented guidance, and a
            system that often rewards speed over standards.
          </p>
          <div className={styles.pull}>
            When communication becomes a privilege, knowledge becomes unequal.
            <br />
            We exist to change that - by building capability, not dependence.
          </div>
        </div>
      </div>

      <div className={styles.waveWrap}>
        <div className={styles.waveCard} aria-label="Wave of barriers">
          <div className={styles.waveHead}>
            <div>
              <div className={styles.kicker}>Barrier wave</div>
              <div className={styles.hint}>
                <span className={styles.dot} aria-hidden="true" /> Clickable peaks (tap to explore)
              </div>
            </div>
            <div className={styles.note}>Slow, readable animation</div>
          </div>

          <div className={styles.stage}>
            <div className={styles.ctaTip}>Tap a peak</div>
            <canvas ref={canvasRef} className={styles.canvas} aria-label="Interactive wave canvas" />
          </div>

          <div className={styles.legend} aria-label="Legend">
            <div className={styles.lg}>
              <span className={styles.legendDot} aria-hidden="true" /> barrier peak
            </div>
            <div className={styles.lg}>
              <span className={`${styles.legendDot} ${styles.legendDotGreen}`} aria-hidden="true" /> where
              shortcuts thrive
            </div>
          </div>

          <div className={styles.info} aria-live="polite">
            <p className={styles.ititle}>{activeInfo.title}</p>
            <p className={styles.ibody}>{activeInfo.body}</p>
            <div className={styles.metaRow}>
              <div className={styles.meta}>
                <strong>Looks like:</strong> <span>{activeInfo.looks}</span>
              </div>
              <div className={styles.meta}>
                <strong>Costs:</strong> <span>{activeInfo.costs}</span>
              </div>
              <div className={styles.meta}>
                <strong>We do:</strong> <span>{activeInfo.weDo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
