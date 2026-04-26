"use client";

import { useMemo, useRef, useState } from "react";

const STEPS = [
  {
    short: "Submit",
    name: "Submit requirement",
    title: "Submit requirement",
    body: "Share your manuscript, target journal, and any reviewer comments or deadlines.",
    note: "Clear intake",
  },
  {
    short: "Review",
    name: "Expert review",
    title: "Expert review",
    body: "We match your work with a PhD-level specialist in your field for an initial review.",
    note: "PhD matched",
  },
  {
    short: "Quote",
    name: "Quote and confirmation",
    title: "Quote and confirmation",
    body: "Receive a transparent quote, timeline, and scope breakdown before we start.",
    note: "Transparent quote",
  },
  {
    short: "Edit and QC",
    name: "Editing and QC",
    title: "Editing and QC",
    body: "Your editor works on the file, followed by an internal quality check to ensure consistency.",
    note: "Two-layer QC",
  },
  {
    short: "Delivery",
    name: "Final delivery",
    title: "Final delivery",
    body: "Get clean and tracked-changes files, plus support for queries until submission.",
    note: "Submission ready",
  },
];

const TOTAL_STEPS = STEPS.length;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function buildDeckIndices(activeIndex: number) {
  const idxs: number[] = [];
  if (activeIndex - 1 >= 0) idxs.push(activeIndex - 1);
  idxs.push(activeIndex);
  if (activeIndex + 1 < TOTAL_STEPS) idxs.push(activeIndex + 1);

  while (idxs.length < 3) {
    const candidate = idxs[0] === 0 ? idxs[idxs.length - 1] + 1 : idxs[0] - 1;
    if (candidate >= 0 && candidate < TOTAL_STEPS && !idxs.includes(candidate)) {
      if (idxs[0] === 0) {
        idxs.push(candidate);
      } else {
        idxs.unshift(candidate);
      }
    } else {
      break;
    }
  }

  return idxs.slice(0, 3);
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const touchActive = useRef(false);

  const deckIndices = useMemo(() => buildDeckIndices(activeStep), [activeStep]);
  const trackFill = TOTAL_STEPS > 1 ? (activeStep / (TOTAL_STEPS - 1)) * 100 : 0;

  function setActive(index: number) {
    setActiveStep(clamp(index, 0, TOTAL_STEPS - 1));
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    if (event.touches.length !== 1) return;
    touchActive.current = true;
    touchStartX.current = event.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (!touchActive.current || event.touches.length !== 1) return;
    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (!touchActive.current) return;
    touchActive.current = false;
    const threshold = 45;
    if (touchDeltaX.current > threshold) {
      setActive(activeStep - 1);
    } else if (touchDeltaX.current < -threshold) {
      setActive(activeStep + 1);
    }
    touchDeltaX.current = 0;
  }

  return (
    <section id="sec-process" className="section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-[#A8C7E6]/55 bg-white/85 shadow-[0_10px_30px_rgba(13,28,56,.08)]">
          <div className="px-5 pb-5 pt-6 sm:px-6">
            <div className="grid gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#2A2E35]/70">
                  A SIMPLE PROCESS WITH POWERFUL RESULT
                </div>
                <h2 className="mt-2 text-[22px] font-bold leading-[1.15] text-[#1F3A5F] md:text-[34px]">
                  From upload to submission-ready in five clear steps.
                </h2>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#A8C7E6]/55 bg-white/90 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#2A2E35]/70">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#A8C7E6]/55 bg-white/80 px-3 py-1.5">
                    <b className="text-[#1F3A5F]">Step {activeStep + 1}</b>
                    <span aria-hidden> - </span>
                    <span>{STEPS[activeStep].name}</span>
                  </span>
                  <span className="hidden text-[12.5px] sm:inline">
                    Click a step to jump.
                  </span>
                  <span className="text-[12.5px] sm:hidden">
                    Swipe the card to change steps.
                  </span>
                </div>
                <div className="hidden text-[12.5px] text-[#2A2E35]/70 md:block">
                  Step {activeStep + 1} of {TOTAL_STEPS}
                </div>
              </div>

              <div className="relative mt-4 px-2 pb-2 pt-4">
                <div className="absolute left-4 right-4 top-[28px] hidden h-[2px] rounded-full bg-[#A8C7E6]/45 md:block" />
                <div
                  className="absolute left-4 top-[28px] hidden h-[2px] rounded-full bg-[#3F7F72] transition-[width] duration-300 md:block"
                  style={{ width: `calc(${trackFill}% - 0px)` }}
                />

                <div className="relative z-10 -mx-2 flex gap-3 overflow-x-auto px-2 pb-1 md:mx-0 md:grid md:grid-cols-5 md:gap-2 md:overflow-visible md:px-0 md:pb-0">
                  {STEPS.map((step, index) => (
                    <button
                      key={step.short}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-current={index === activeStep}
                      className="group flex min-w-[68px] flex-col items-center text-center md:min-w-0"
                    >
                      <span
                        className={`mb-2 grid h-9 w-9 place-items-center rounded-full border text-sm font-bold transition ${
                          index === activeStep
                            ? "border-[#3F7F72]/45 bg-[#A8C7E6]/25 text-[#1F3A5F] shadow-md"
                          : "border-[#A8C7E6]/60 bg-white/90 text-[#1F3A5F]"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`text-[11px] sm:text-[12.5px] ${
                          index === activeStep ? "font-bold text-[#1F3A5F]" : "text-[#2A2E35]/70"
                        }`}
                      >
                        {step.short}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                  <div className="text-sm font-extrabold text-[#1F3A5F]">What happens in this step</div>
                  <div className="text-xs text-[#2A2E35]/70">
                    <span className="rounded-xl border border-[#A8C7E6]/60 bg-white/85 px-2.5 py-1">
                      {STEPS[activeStep].note}
                    </span>
                  </div>
                </div>

                <div className="mt-3 hidden grid-cols-1 gap-3 md:grid md:grid-cols-3">
                  {deckIndices.map((index) => {
                    const step = STEPS[index];
                    return (
                      <article
                        key={step.title}
                        className="relative overflow-hidden rounded-2xl border border-[#A8C7E6]/55 bg-white p-4 shadow-md"
                      >
                        <div className="absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(63,127,114,.20),transparent_60%),radial-gradient(circle_at_60%_55%,rgba(168,199,230,.26),transparent_62%)] opacity-80" />
                        <div className="relative z-10">
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-[#E9E3D5]/35 px-2.5 py-1 text-xs text-[#2A2E35]/70">
                              <b className="text-[#1F3A5F]">{index + 1}</b>
                              <span aria-hidden> - </span>
                              {step.name}
                            </span>
                            <span className="text-xs text-[#2A2E35]/70">Step {index + 1} of {TOTAL_STEPS}</span>
                          </div>
                          <h3 className="text-[15.5px] font-semibold text-[#1F3A5F]">{step.title}</h3>
                          <p className="mt-1 text-[13.5px] leading-relaxed text-[#2A2E35]/70">
                            {step.body}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-3 block md:hidden">
                  <div
                    className="overflow-hidden rounded-2xl"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: "pan-y" }}
                  >
                    <div
                      className="flex transition-transform duration-300"
                      style={{ transform: `translateX(${-activeStep * 100}%)` }}
                    >
                      {STEPS.map((step, index) => (
                        <div key={step.title} className="w-full flex-shrink-0 px-1.5">
                          <article className="relative overflow-hidden rounded-2xl border border-[#A8C7E6]/55 bg-white p-4 shadow-md">
                            <div className="absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(63,127,114,.20),transparent_60%),radial-gradient(circle_at_60%_55%,rgba(168,199,230,.26),transparent_62%)] opacity-80" />
                            <div className="relative z-10">
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-[#E9E3D5]/35 px-2.5 py-1 text-xs text-[#2A2E35]/70">
                                  <b className="text-[#1F3A5F]">{index + 1}</b>
                                  <span aria-hidden> - </span>
                                  {step.name}
                                </span>
                                <span className="text-xs text-[#2A2E35]/70">Step {index + 1} of {TOTAL_STEPS}</span>
                              </div>
                              <h3 className="text-[15.5px] font-semibold text-[#1F3A5F]">{step.title}</h3>
                              <p className="mt-1 text-[13.5px] leading-relaxed text-[#2A2E35]/70">
                                {step.body}
                              </p>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    {STEPS.map((_, index) => (
                      <span
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === activeStep
                            ? "bg-[#3F7F72]"
                            : "bg-[#A8C7E6]/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
