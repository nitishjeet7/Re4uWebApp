"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HeroSlide = {
  label: string;
  title: string;
  copy: string;
  tags: string[];
  cta: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    label: "AI and similarity safety",
    title: "Pass AI and plagiarism checks confidently.",
    copy:
      "Screen your manuscript for AI-like phrasing and high similarity, then use editor feedback to revise until similarity and AI scores are within safe limits.",
    tags: ["AI and similarity review", "Turnitin / iThenticate focus", "Editor feedback built-in"],
    cta: "Explore AI and plagiarism support",
    href: "/services/editing-support",
    imageSrc: "/presentation-hero.svg",
    imageAlt: "AI and plagiarism safety visual",
  },
  {
    label: "Abstract and section coaching",
    title: "Clarify your abstract, introduction and flow.",
    copy:
      "Get guided feedback on how clearly your aims, methods and key findings are presented so editors and reviewers can follow your story quickly.",
    tags: ["Section-by-section feedback", "Logical flow and structure", "Reviewer-style comments"],
    cta: "See abstract and manuscript support",
    href: "/services/editing-support",
    imageSrc: "/presentation-hero.svg",
    imageAlt: "Abstract and manuscript guidance visual",
  },
  {
    label: "Graphical abstracts and figures",
    title: "Graphical abstracts and figures that impress editors.",
    copy:
      "Translate complex results into clean, journal-ready visuals that highlight your key message without overloading reviewers.",
    tags: ["Journal-compliant layouts", "Infographics and visual summaries", "Conference-ready graphics"],
    cta: "View graphical abstract options",
    href: "/services/presentations",
    imageSrc: "/presentation-hero.svg",
    imageAlt: "Graphical abstracts service visual",
  },
  {
    label: "Editing and submission support",
    title: "End-to-end editing and\nsubmission support.",
    copy:
      "Align language, journal formatting, cover letters and submission packs so your manuscript reaches the right journal in the best possible shape.",
    tags: ["Language and formatting checks", "Journal selection guidance", "Submission pack review"],
    cta: "Explore editing and submission",
    href: "/services/service-overview",
    imageSrc: "/presentation-hero.svg",
    imageAlt: "Research paper editing and submission visual",
  },
];

const AUTO_ROTATE_MS = 9000;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, AUTO_ROTATE_MS);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  function stopAutoRotate() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const currentSlide = HERO_SLIDES[activeIndex];
  const slideLabel = `Slide ${activeIndex + 1} of ${HERO_SLIDES.length} - ${currentSlide.label}`;

  const goPrev = () => {
    stopAutoRotate();
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goNext = () => {
    stopAutoRotate();
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      id="sec-hero"
      className="section-pad"
      style={{
        background:
          "radial-gradient(circle at 12% 8%, rgba(168,199,230,0.24), transparent 42%), radial-gradient(circle at 88% 12%, rgba(63,127,114,0.18), transparent 48%), linear-gradient(135deg, rgba(255,255,255,0.98), rgba(233,227,213,0.52))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1.15fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(148,163,184,.5)] bg-white/90 px-3 py-1 text-xs font-medium text-[#1F3A5F]">
              <span className="h-2 w-2 rounded-full bg-[#3F7F72]" aria-hidden />
              <span>From draft to journal decision - in one partner</span>
            </div>

            <h1 className="mt-4 text-[36px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#2A2E35] md:text-[42px]">
              Research paper editing and <span className="text-[#3F7F72]">journal submission support</span> you can
              trust.
            </h1>

            <p className="mt-4 max-w-[34rem] text-[16px] leading-relaxed text-[#2A2E35]/80">
              Pass AI and plagiarism checks confidently, reduce hidden rejection risks, and move from rough
              draft to submission-ready manuscript with ethical, end-to-end support.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-[#1F3A5F] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:bg-[#3F7F72]"
              >
                Book Now
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-2xl border border-[#A8C7E6]/60 bg-white px-6 py-3 text-sm font-semibold text-[#1F3A5F] transition duration-300 hover:scale-105 hover:bg-[#E9E3D5]"
              >
                See Editing Samples
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-6 text-xs text-[#2A2E35]/80">
              <div>
                <strong className="block text-sm font-semibold text-[#2A2E35]">Fast turnarounds</strong>
                24-72 hours for most editing jobs.
              </div>
              <div>
                <strong className="block text-sm font-semibold text-[#2A2E35]">Ethical and transparent</strong>
                COPE-aligned support - no ghostwriting.
              </div>
              <div>
                <strong className="block text-sm font-semibold text-[#2A2E35]">Proven outcomes</strong>
                4,051+ researchers helped, 200+ acceptances.
              </div>
            </div>
          </div>

          <section
            className="relative rounded-2xl border border-[#A8C7E6]/60 bg-[radial-gradient(circle_at_top_left,#ffffff_0,#A8C7E6_45%,#E9E3D5_100%)] p-5 shadow-[0_20px_50px_rgba(15,23,42,.10)]"
            aria-label="Key services carousel"
          >
            <div className="mb-4 flex items-center justify-between gap-3 text-[11px] text-black">
              <div
                className="rounded-full border border-[rgba(148,163,184,.5)] bg-[#A8C7E6]/30 px-3 py-1"
                aria-live="polite"
              >
                {slideLabel}
              </div>
              <div className="flex items-center gap-1.5" aria-hidden>
                {HERO_SLIDES.map((_, index) => (
                  <span
                    key={index}
                    className={`h-[7px] rounded-full ${
                      index === activeIndex ? "w-4 bg-[#1F3A5F]" : "w-[7px] bg-[rgba(148,163,184,.8)]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {HERO_SLIDES.map((slide, index) => (
              <article
                key={slide.label}
                className={`grid gap-5 md:grid-cols-[1.05fr_1.15fr] md:items-center ${
                  index === activeIndex ? "" : "hidden"
                }`}
                aria-hidden={index === activeIndex ? "false" : "true"}
              >
                <div>
                  <h2
                    className={`${index === 0 ? "text-[14px]" : "text-lg"} font-semibold text-black ${
                      index === 3 ? "leading-[1.08] whitespace-pre-line" : "leading-[1.15]"
                    }`}
                  >
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-sm text-black">{slide.copy}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#A8C7E6]/25 px-2.5 py-1 text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={slide.href}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-black"
                  >
                    {slide.cta}
                    <span aria-hidden>{"->"}</span>
                  </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-[rgba(15,23,42,.4)] bg-[#1F3A5F]">
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    width={520}
                    height={360}
                    className="h-full w-full object-cover"
                    priority={index === 0}
                  />
                </div>
              </article>
            ))}

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  onMouseEnter={stopAutoRotate}
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#A8C7E6]/70 bg-white text-black shadow-sm hover:bg-[#E9E3D5]"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  onMouseEnter={stopAutoRotate}
                  className="grid h-8 w-8 place-items-center rounded-full border border-[#A8C7E6]/70 bg-white text-black shadow-sm hover:bg-[#E9E3D5]"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="rounded-full border border-[#A8C7E6]/60 bg-white px-3 py-1 text-[11px] text-black">
                Hover cards and buttons, or click arrows to explore.
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
