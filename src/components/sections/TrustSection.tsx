import { AnimatedNumber } from "@/components/core/animated-number";
import styles from "./TrustSection.module.css";

const METRICS = [
  {
    value: 4051,
    suffix: "+",
    label: "Researchers supported",
    note: "Across engineering, medicine, management, and social sciences.",
  },
  {
    value: 200,
    suffix: "+",
    label: "Journal acceptances",
    note: "Support across SCI and Scopus indexed journals.",
  },
  {
    value: 15,
    suffix: "+",
    label: "Years of editorial experience",
    note: "Combined expert experience in publication workflows.",
  },
  {
    value: 95,
    suffix: "%",
    label: "Client satisfaction",
    note: "Based on feedback from completed engagements.",
  },
];

const ASSURANCES = [
  "COPE-aligned ethics",
  "ICMJE-aware editorial standards",
  "Reporting guideline alignment",
  "No ghostwriting",
];

export function TrustSection() {
  return (
    <section
      id="sec-trustband"
      className="section-pad"
      style={{
        background:
          "radial-gradient(1100px 520px at 20% -10%, rgba(168,199,230,.20), transparent 60%), radial-gradient(900px 520px at 90% -10%, rgba(63,127,114,.16), transparent 55%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.45))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-[#A8C7E6]/45 bg-[#1F3A5F] p-5 text-white shadow-xl sm:p-6">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#A8C7E6]">
            TRUSTED WORLDWIDE FOR ETHICAL PUBLICATION SUPPORT.
          </p>
          <h2 className="m-0 text-3xl font-bold tracking-[-0.02em] text-white md:text-[34px]">
            Trusted partner from first draft to final submission.
          </h2>
          <div className={`mt-3 rounded-full border border-white/20 bg-white/10 ${styles.offerMarqueeWrap}`}>
            <div className={`${styles.offerMarquee} px-6 py-2 text-sm font-semibold text-white/90`}>
              Expert academic editing for publication success &mdash; enjoy up to 50% OFF for a limited time
              &#128218;&#10024; Book Now!
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {METRICS.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-white/20 bg-white/10 p-3"
              >
                <p className="m-0 text-2xl font-bold leading-none">
                  <AnimatedNumber
                    value={item.value}
                    className="inline-block"
                    springOptions={{ bounce: 0, duration: 1800 }}
                  />
                  <span className="text-xl">{item.suffix}</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#A8C7E6]">{item.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {ASSURANCES.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
