"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import {
  categoryLabels,
  categoryModules,
  faqCategories,
  faqItems,
  heroSlides,
  heroTrustStrip,
  modulesByStage,
  pricingPlans,
  sampleAssets,
  stageHints,
  stressReliefCards,
  stressTags,
  testimonials,
  workflowSteps,
  type CategoryKey,
  type FaqItem,
  type SampleAsset,
  type StageKey,
} from "./content";

type ServiceOverviewExperienceProps = {
  fontClassName: string;
};

type HeroQueryForm = {
  email: string;
  stage: string;
  subject: string;
  query: string;
};

type ModuleLeadForm = {
  name: string;
  email: string;
  phone: string;
  query: string;
};

type SampleLeadForm = {
  name: string;
  email: string;
  region: string;
  note: string;
};

type TestimonialLeadForm = {
  name: string;
  email: string;
  stage: string;
  blocker: string;
  query: string;
};

type TabMode = "preview" | "inside" | "download";

function buildContactHref(params: {
  source?: string;
  need?: string;
  deadline?: string;
  plan?: string;
  notes?: string;
  name?: string;
  email?: string;
}) {
  const query = new URLSearchParams({
    service: "service-overview",
    source: params.source ?? "service-overview-page",
  });

  if (params.need) query.set("need", params.need);
  if (params.deadline) query.set("deadline", params.deadline);
  if (params.plan) query.set("plan", params.plan);
  if (params.notes) query.set("notes", params.notes);
  if (params.name) query.set("name", params.name);
  if (params.email) query.set("email", params.email);

  return `/contact?${query.toString()}`;
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function getHeroArtTone(slideId: number) {
  if (slideId === 1) return "proposal";
  if (slideId === 2) return "methods";
  if (slideId === 3) return "data";
  if (slideId === 4) return "editing";
  return "journal";
}

export default function ServiceOverviewExperience({
  fontClassName,
}: ServiceOverviewExperienceProps) {
  const router = useRouter();

  const [activeHero, setActiveHero] = useState(0);
  const [heroAutoPlay, setHeroAutoPlay] = useState(true);
  const [heroModalOpen, setHeroModalOpen] = useState(false);
  const [heroFormError, setHeroFormError] = useState("");
  const [heroForm, setHeroForm] = useState<HeroQueryForm>({
    email: "",
    stage: "",
    subject: "",
    query: "",
  });

  const [activeStage, setActiveStage] = useState<StageKey>("planning");
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [openModuleDetails, setOpenModuleDetails] = useState<string[]>([]);
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [moduleLeadError, setModuleLeadError] = useState("");
  const [moduleLeadForm, setModuleLeadForm] = useState<ModuleLeadForm>({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const [workflowReveal, setWorkflowReveal] = useState<number[]>([]);

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("planning");
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceModalContent, setServiceModalContent] = useState({
    title: "",
    meta: "",
  });

  const [sampleTabById, setSampleTabById] = useState<Record<string, TabMode>>({});
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleLeadAsset, setSampleLeadAsset] = useState<SampleAsset | null>(null);
  const [sampleLeadError, setSampleLeadError] = useState("");
  const [sampleLeadForm, setSampleLeadForm] = useState<SampleLeadForm>({
    name: "",
    email: "",
    region: "",
    note: "",
  });

  const [expandedTestimonials, setExpandedTestimonials] = useState<string[]>([
    testimonials[0]?.id ?? "",
  ]);
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [testimonialLeadError, setTestimonialLeadError] = useState("");
  const [testimonialLeadForm, setTestimonialLeadForm] =
    useState<TestimonialLeadForm>({
      name: "",
      email: "",
      stage: "",
      blocker: "",
      query: "",
    });

  const [activeFaqCategory, setActiveFaqCategory] = useState<(typeof faqCategories)[number]["key"]>("all");
  const [openFaqIds, setOpenFaqIds] = useState<string[]>([]);
  const [faqOpenAll, setFaqOpenAll] = useState(false);
  const [faqCopyId, setFaqCopyId] = useState("");

  const hero = heroSlides[activeHero] ?? heroSlides[0];
  const stageModules = modulesByStage[activeStage] ?? modulesByStage.planning;
  const activeCategoryItems = categoryModules[activeCategory] ?? [];

  const visibleFaqs = useMemo(() => {
    if (activeFaqCategory === "all") return faqItems;
    return faqItems.filter((item) => item.category === activeFaqCategory);
  }, [activeFaqCategory]);

  useEffect(() => {
    if (!heroAutoPlay) return;

    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [heroAutoPlay]);

  useEffect(() => {
    if (!moduleModalOpen && !heroModalOpen && !serviceModalOpen && !sampleModalOpen && !testimonialModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [heroModalOpen, moduleModalOpen, serviceModalOpen, sampleModalOpen, testimonialModalOpen]);

  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (testimonialModalOpen) {
        setTestimonialModalOpen(false);
        return;
      }
      if (sampleModalOpen) {
        setSampleModalOpen(false);
        return;
      }
      if (serviceModalOpen) {
        setServiceModalOpen(false);
        return;
      }
      if (moduleModalOpen) {
        setModuleModalOpen(false);
        return;
      }
      if (heroModalOpen) {
        setHeroModalOpen(false);
      }
    }

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [heroModalOpen, moduleModalOpen, serviceModalOpen, sampleModalOpen, testimonialModalOpen]);

  const activeModuleHint = selectedModule
    ? `Stage: ${activeStage} | Module: ${selectedModule}`
    : `Stage: ${activeStage} | Module: choose one`;

  function openHeroModal(context?: string) {
    setHeroModalOpen(true);
    setHeroFormError("");
    setHeroForm((prev) => ({
      ...prev,
      stage: hero.stageLabel,
      query: context ? `${context}: ` : "",
    }));
  }

  function submitHeroLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = heroForm.email.trim();
    const query = heroForm.query.trim();

    if (!email || !query || query.length < 12) {
      setHeroFormError("Please add a valid email and a short query.");
      return;
    }

    setHeroFormError("");
    router.push(
      buildContactHref({
        source: "service-overview-hero",
        email,
        notes: [
          "Service overview lead",
          `Stage: ${heroForm.stage || hero.stageLabel}`,
          `Subject: ${heroForm.subject || "Not provided"}`,
          `Query: ${query}`,
        ].join("\n"),
      }),
    );
  }

  function toggleModuleDetails(moduleKey: string) {
    setOpenModuleDetails((current) =>
      current.includes(moduleKey)
        ? current.filter((key) => key !== moduleKey)
        : [...current, moduleKey],
    );
  }

  function selectModule(moduleKey: string) {
    setSelectedModule(moduleKey);
  }

  function submitModuleLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = moduleLeadForm.name.trim();
    const email = moduleLeadForm.email.trim();
    const phone = moduleLeadForm.phone.trim();
    const query = moduleLeadForm.query.trim();

    if (!name || !email || !phone || !query) {
      setModuleLeadError("Please complete all required fields.");
      return;
    }

    setModuleLeadError("");
    router.push(
      buildContactHref({
        source: "service-overview-module",
        name,
        email,
        need: activeStage,
        notes: [
          "Module lead",
          `Stage: ${activeStage}`,
          `Module: ${selectedModule}`,
          `Phone: ${phone}`,
          `Query: ${query}`,
        ].join("\n"),
      }),
    );
  }

  function toggleWorkflowReveal(stepId: number) {
    setWorkflowReveal((current) =>
      current.includes(stepId)
        ? current.filter((id) => id !== stepId)
        : [...current, stepId],
    );
  }

  function openServiceModal(title: string, meta: string) {
    setServiceModalContent({ title, meta });
    setServiceModalOpen(true);
  }

  function onBookCategoryModule(moduleTitle: string, moduleMeta: string) {
    openServiceModal(moduleTitle, moduleMeta);
  }

  function onDownloadCategorySample(fileName: string, fileText: string) {
    downloadTextFile(fileName, fileText);
  }

  function setAssetTab(assetId: string, tab: TabMode) {
    setSampleTabById((current) => ({ ...current, [assetId]: tab }));
  }

  function getAssetTab(assetId: string): TabMode {
    return sampleTabById[assetId] ?? "preview";
  }

  function openSampleLead(asset: SampleAsset) {
    setSampleLeadAsset(asset);
    setSampleLeadError("");
    setSampleModalOpen(true);
  }

  function submitSampleLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sampleLeadAsset) return;

    const email = sampleLeadForm.email.trim();
    const region = sampleLeadForm.region.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setSampleLeadError("Please enter a valid email.");
      return;
    }

    setSampleLeadError("");
    router.push(
      buildContactHref({
        source: "service-overview-samples",
        name: sampleLeadForm.name.trim(),
        email,
        notes: [
          "Sample asset request",
          `Asset: ${sampleLeadAsset.title}`,
          `Region: ${region || "Not provided"}`,
          `Note: ${sampleLeadForm.note.trim() || "None"}`,
        ].join("\n"),
      }),
    );
  }

  function toggleTestimonial(testimonialId: string) {
    setExpandedTestimonials((current) =>
      current.includes(testimonialId)
        ? current.filter((id) => id !== testimonialId)
        : [...current, testimonialId],
    );
  }

  function openTestimonialLead(stage: string, blocker: string) {
    setTestimonialLeadForm((prev) => ({ ...prev, stage, blocker }));
    setTestimonialLeadError("");
    setTestimonialModalOpen(true);
  }

  function submitTestimonialLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = testimonialLeadForm.name.trim();
    const email = testimonialLeadForm.email.trim();
    const stage = testimonialLeadForm.stage.trim();
    const blocker = testimonialLeadForm.blocker.trim();
    const query = testimonialLeadForm.query.trim();

    if (!name || !email || !stage || !blocker || !query) {
      setTestimonialLeadError("Please complete all required fields.");
      return;
    }

    setTestimonialLeadError("");
    router.push(
      buildContactHref({
        source: "service-overview-testimonials",
        name,
        email,
        need: stage,
        notes: [
          "Testimonial section lead",
          `Stage: ${stage}`,
          `Blocker: ${blocker}`,
          `Query: ${query}`,
        ].join("\n"),
      }),
    );
  }

  function toggleFaqOpen(item: FaqItem) {
    if (faqOpenAll) {
      setOpenFaqIds((current) =>
        current.includes(item.id)
          ? current.filter((id) => id !== item.id)
          : [...current, item.id],
      );
      return;
    }

    setOpenFaqIds((current) => (current.includes(item.id) ? [] : [item.id]));
  }

  function toggleFaqOpenAll() {
    setFaqOpenAll((current) => {
      const next = !current;
      if (next) {
        setOpenFaqIds(visibleFaqs.map((item) => item.id));
      } else {
        setOpenFaqIds([]);
      }
      return next;
    });
  }

  async function copyFaqAnswer(item: FaqItem) {
    const payload = `${item.q}\n\n${item.a}\n${item.bullets
      .map((bullet) => `- ${bullet}`)
      .join("\n")}`;

    try {
      await navigator.clipboard.writeText(payload);
      setFaqCopyId(item.id);
      window.setTimeout(() => setFaqCopyId(""), 1200);
    } catch {
      setFaqCopyId("");
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroShell}>
            <div className={styles.heroHead}>
              <div className={styles.kicker}>SERVICE OVERVIEW</div>
              <div className={styles.trustStrip}>
                {heroTrustStrip.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.heroBody}>
              <div className={styles.heroCopy}>
                <div className={styles.heroTags}>
                  <span className={`${styles.chip} ${styles.chipSoft}`}>
                    {hero.stageLabel}
                  </span>
                  {hero.tags.map((tag) => (
                    <span key={`${hero.id}-${tag}`} className={styles.chip}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className={`${styles.heroTitle} ${fontClassName}`}>{hero.title}</h1>
                <h2 className={styles.heroSubtitle}>{hero.subtitle}</h2>
                <p className={styles.heroText}>{hero.summary}</p>

                <div className={styles.heroActions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => openHeroModal(hero.queryContext)}
                  >
                    Drop a Query
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnGhost}`}
                    onClick={() =>
                      downloadTextFile(
                        `${hero.toolkit.replace(/\s+/g, "_")}.txt`,
                        `${hero.toolkit}: quick reference\n\n${hero.summary}`,
                      )
                    }
                  >
                    Download Toolkit
                  </button>
                </div>

                <div className={styles.heroMeta}>
                  {hero.trust.map((item) => (
                    <span key={`${hero.id}-trust-${item}`} className={styles.pill}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.heroArtWrap}>
                <div
                  className={`${styles.heroArt} ${
                    styles[`heroArt${getHeroArtTone(hero.id)}` as keyof typeof styles]
                  }`}
                >
                  <div className={styles.artOrbit} />
                  <div className={styles.artCardLine} />
                  <div className={styles.artCardLine} />
                  <div className={styles.artCardLine} />
                  <div className={styles.artNodes}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroControls}>
              <div className={styles.heroControlGroup}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost} ${styles.iconBtn}`}
                  onClick={() =>
                    setActiveHero(
                      (current) => (current - 1 + heroSlides.length) % heroSlides.length,
                    )
                  }
                  aria-label="Previous slide"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost} ${styles.iconBtn}`}
                  onClick={() => setActiveHero((current) => (current + 1) % heroSlides.length)}
                  aria-label="Next slide"
                >
                  &gt;
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => setHeroAutoPlay((value) => !value)}
                >
                  {heroAutoPlay ? "Pause" : "Play"}
                </button>
              </div>
              <div className={styles.heroDots}>
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`${styles.dot} ${index === activeHero ? styles.dotActive : ""}`}
                    onClick={() => setActiveHero(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
                <span className={styles.heroCount}>
                  Slide {activeHero + 1}/{heroSlides.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.stressShell}>
            <div className={styles.sectionKicker}>RELIEF, NOT A BROCHURE</div>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              From stress to clarity without overthinking.
            </h2>
            <p className={styles.sectionSub}>
              Keep it human. Show the stress in one line, then show relief in calm cards.
            </p>

            <div className={styles.tagRow}>
              {stressTags.map((tag) => (
                <span key={tag} className={styles.pill}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.reliefGrid}>
              {stressReliefCards.map((card) => (
                <article
                  key={card.id}
                  className={`${styles.reliefCard} ${styles[`relief${card.tone}` as keyof typeof styles]}`}
                >
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>

            <p className={styles.quoteLine}>
              I stopped guessing. I had a clear plan and felt confident again.
            </p>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionSoft} ${styles.sectionModules}`}
        id="overview-modules"
      >
        <div className={styles.container}>
          <div className={styles.sectionKicker}>MODULES</div>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
            Pick your stage then choose one module
          </h2>
          <p className={styles.sectionSub}>
            Select a module to see outputs. Send one form and get pricing, timeline, and scope.
          </p>

          <div className={styles.stageTabs} role="tablist" aria-label="Stage tabs">
            {(["planning", "mid-stage", "submitting"] as StageKey[]).map((stage) => {
              const isActive = stage === activeStage;
              const label =
                stage === "planning"
                  ? "Planning"
                  : stage === "mid-stage"
                    ? "Mid-stage"
                    : "Submitting";
              return (
                <button
                  key={stage}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.stageTab} ${isActive ? styles.stageTabActive : ""}`}
                  onClick={() => {
                    setActiveStage(stage);
                    setSelectedModule("");
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <p className={styles.stageHint}>{stageHints[activeStage]}</p>

          <div className={styles.moduleGrid}>
            {stageModules.map((module) => {
              const isSelected = module.key === selectedModule;
              const detailOpen = openModuleDetails.includes(module.key);

              return (
                <article
                  key={module.key}
                  className={`${styles.moduleCard} ${isSelected ? styles.moduleCardSelected : ""}`}
                >
                  <div className={styles.moduleHead}>
                    <h3>{module.key}</h3>
                    <span className={styles.moduleDepth}>{module.depth}</span>
                  </div>
                  <p>{module.desc}</p>

                  {detailOpen ? (
                    <ul>
                      {module.outputs.map((point) => (
                        <li key={`${module.key}-${point}`}>{point}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnGhost}`}
                      onClick={() => toggleModuleDetails(module.key)}
                    >
                      {detailOpen ? "Hide outputs" : "What you get"}
                    </button>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={() => selectModule(module.key)}
                    >
                      Select
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.selectionBar}>
            <div>
              <p className={styles.selectionTitle}>Selected</p>
              <p className={styles.selectionValue}>{activeModuleHint}</p>
            </div>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={!selectedModule}
              onClick={() => setModuleModalOpen(true)}
            >
              Request pricing and scope
            </button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionKicker}>HOW IT WORKS</div>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>Clear steps. One calm flow.</h2>
          <p className={styles.sectionSub}>
            Share context, pick module, receive deliverables, and close revisions with a
            clear handoff.
          </p>

          <div className={styles.workflowGrid}>
            {workflowSteps.map((step) => {
              const reveal = workflowReveal.includes(step.id);
              return (
                <article key={step.id} className={styles.workflowCard}>
                  <div className={styles.workflowHead}>
                    <span>{step.id}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>

                  <div className={styles.workflowCols}>
                    <div>
                      <h4>You</h4>
                      <ul>
                        {step.you.map((item) => (
                          <li key={`${step.id}-you-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className={styles.workflowWeHead}>
                        <h4>We</h4>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost}`}
                          onClick={() => toggleWorkflowReveal(step.id)}
                        >
                          {reveal ? "Hide" : "Reveal"}
                        </button>
                      </div>
                      {reveal ? (
                        <ul>
                          {step.we.map((item) => (
                            <li key={`${step.id}-we-${item}`}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.workflowPlaceholder}>Tap Reveal to see exact support.</p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.ctaRow}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => setModuleModalOpen(true)}
            >
              Request pricing and scope
            </button>
            <a href="#overview-samples" className={`${styles.btn} ${styles.btnGhost}`}>
              See samples
            </a>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`} id="overview-categories">
        <div className={styles.container}>
          <div className={styles.categoryShell}>
            <header className={styles.categoryHeader}>
              <div>
                <div className={styles.sectionKicker}>SERVICE OVERVIEW</div>
                <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
                  Pick a category - see what you need, what you get, and starting price.
                </h2>
                <p className={styles.sectionSub}>
                  Clean like your older layout, but tighter. Each module includes a
                  <strong> Download sample</strong> button and a clear Starts at price line.
                </p>
              </div>
            </header>

            <div className={styles.categoryTabsBar} role="tablist" aria-label="Service categories">
              {(Object.keys(categoryLabels) as CategoryKey[]).map((key) => {
                const isActive = key === activeCategory;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    id={`category-tab-${key}`}
                    aria-selected={isActive}
                    aria-controls={`category-panel-${key}`}
                    className={`${styles.categoryTab} ${isActive ? styles.categoryTabActive : ""}`}
                    onClick={() => setActiveCategory(key)}
                  >
                    {categoryLabels[key]}
                  </button>
                );
              })}
            </div>

            <div
              className={styles.categoryGrid}
              id={`category-panel-${activeCategory}`}
              role="tabpanel"
              aria-labelledby={`category-tab-${activeCategory}`}
            >
              {activeCategoryItems.map((item) => {
                const meta = `Category: ${categoryLabels[activeCategory]} | Starts at: ${item.price}`;

                return (
                  <article key={`${activeCategory}-${item.title}`} className={styles.categoryCard}>
                    <div className={styles.categoryTop}>
                      <span className={styles.categoryIcon} aria-hidden="true">
                        {item.icon}
                      </span>
                      <h3 className={styles.categoryTitle}>{item.title}</h3>
                    </div>

                    <div className={styles.categoryListWrap}>
                      <p className={styles.categoryBlockLabel}>What we need</p>
                      <ul>
                        {item.need.map((point) => (
                          <li key={`${item.title}-need-${point}`}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.categoryListWrap}>
                      <p className={styles.categoryBlockLabel}>What you get</p>
                      <ul>
                        {item.get.map((point) => (
                          <li key={`${item.title}-get-${point}`}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.categoryPriceRow}>
                      <div className={styles.categoryPrice}>
                        <p>
                          Starts at <strong>{item.price}</strong>
                        </p>
                        <small>Exact quote depends on scope and deadline.</small>
                      </div>
                      <div className={styles.categoryActions}>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnPrimary}`}
                          onClick={() => onBookCategoryModule(item.title, meta)}
                        >
                          Book now
                        </button>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost}`}
                          onClick={() =>
                            onDownloadCategorySample(item.sampleName, item.sampleText)
                          }
                        >
                          Download sample
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className={styles.categoryFoot}>
              <div className={styles.categoryFootChips}>
                <span className={styles.categoryChip}>
                  <span className={styles.chipDot} />
                  Confidential
                </span>
                <span className={styles.categoryChip}>
                  <span className={styles.chipDot} />
                  Integrity-first
                </span>
                <span className={styles.categoryChip}>
                  <span className={styles.chipDot} />
                  Privacy-first
                </span>
                <span className={styles.categoryChip}>
                  <span className={styles.chipDot} />
                  Supervisor-ready clarity
                </span>
              </div>
              <p className={styles.categoryFootText}>
                Wire Book now to your quote form and prefill module plus category.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="overview-pricing">
        <div className={styles.container}>
          <div className={styles.sectionKicker}>PRICING</div>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
            Starter anchor plus scope ranges with no confusing bands
          </h2>
          <p className={styles.sectionSub}>
            Start with a clear entry point. We confirm exact scope after quick review.
          </p>

          <div className={styles.pricingGrid}>
            {pricingPlans.map((plan) => (
              <article
                key={plan.id}
                className={`${styles.pricingCard} ${plan.featured ? styles.pricingCardFeatured : ""}`}
              >
                <h3>{plan.title}</h3>
                <p className={styles.priceLine}>{plan.priceLine}</p>
                <p>{plan.subtitle}</p>
                <ul>
                  {plan.points.map((point) => (
                    <li key={`${plan.id}-${point}`}>{point}</li>
                  ))}
                </ul>
                <div className={styles.cardActions}>
                  <Link
                    href={buildContactHref({
                      source: "service-overview-pricing",
                      plan: plan.id,
                    })}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    Request scope
                  </Link>
                  <a href="#overview-samples" className={`${styles.btn} ${styles.btnGhost}`}>
                    See proof assets
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.footNote}>
            Pricing depends on scope and deadline. We support ethical academic work only.
            You remain the author.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`} id="overview-samples">
        <div className={styles.container}>
          <div className={styles.sampleShell}>
            <div className={styles.sampleHeader}>
              <div className={styles.sectionKicker}>SAMPLES / DOWNLOADS</div>
              <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
                Proof assets that feel like &quot;next steps&quot; - not marketing.
              </h2>
              <p className={styles.sectionSub}>
                Each asset includes a before and after snippet so stressed scholars can
                see the value instantly. Download now or optionally send to email for later.
              </p>
            </div>

            <div className={styles.samplePillRow} aria-label="Highlights">
              <span className={styles.sampleHighlightPill}>
                <span className={styles.sampleHighlightDot} />
                <strong>Non-technical</strong> language
              </span>
              <span className={styles.sampleHighlightPill}>
                <span className={styles.sampleHighlightDot} />
                <strong>Supervisor-ready</strong> formats
              </span>
              <span className={styles.sampleHighlightPill}>
                <span className={styles.sampleHighlightDot} />
                <strong>Confidential</strong> and integrity-first
              </span>
              <span className={styles.sampleHighlightPill}>
                <span className={styles.sampleHighlightDot} />
                <strong>International</strong> terminology aligned
              </span>
            </div>

            <div className={styles.sampleGrid}>
              {sampleAssets.map((asset) => {
                const tab = getAssetTab(asset.id);

                return (
                  <article key={asset.id} className={`${styles.sampleCard} ${styles.sampleAsset}`}>
                    <div className={styles.sampleAssetHead}>
                      <div className={styles.sampleBadgeRow}>
                        <span className={styles.sampleTag}>
                          <span className={styles.sampleTagIcon} aria-hidden="true">
                            -
                          </span>
                          {asset.badgeA}
                        </span>
                        <span className={styles.sampleTag}>
                          <span className={styles.sampleTagIcon} aria-hidden="true">
                            +
                          </span>
                          {asset.badgeB}
                        </span>
                      </div>
                      <h3 className={styles.sampleAssetTitle}>{asset.title}</h3>
                      <p className={styles.sampleAssetDesc}>{asset.desc}</p>
                    </div>

                    <div className={styles.sampleTabs} role="tablist" aria-label={`${asset.title} tabs`}>
                      {(["preview", "inside", "download"] as TabMode[]).map((mode) => (
                        <button
                          key={`${asset.id}-${mode}`}
                          type="button"
                          role="tab"
                          aria-selected={tab === mode}
                          className={`${styles.sampleTab} ${tab === mode ? styles.sampleTabActive : ""}`}
                          onClick={() => setAssetTab(asset.id, mode)}
                        >
                          <span className={styles.sampleTabDot} />
                          {mode === "preview"
                            ? "Preview"
                            : mode === "inside"
                              ? "What is inside"
                              : "Download"}
                        </button>
                      ))}
                    </div>

                    {tab === "preview" ? (
                      <div className={styles.samplePreview}>
                        <div className={styles.sampleSplit}>
                          <p className={styles.sampleSplitLabel}>
                            <span className={styles.sampleSplitDot} />
                            Before
                          </p>
                          <p>{asset.beforeText}</p>
                        </div>
                        <div className={styles.sampleSplit}>
                          <p className={styles.sampleSplitLabel}>
                            <span className={styles.sampleSplitDot} />
                            After
                          </p>
                          <p>{asset.afterText}</p>
                        </div>
                      </div>
                    ) : null}

                    {tab === "inside" ? (
                      <ul className={styles.sampleInsideList}>
                        {asset.inside.map((point) => (
                          <li key={`${asset.id}-inside-${point}`}>{point}</li>
                        ))}
                      </ul>
                    ) : null}

                    {tab === "download" ? (
                      <div className={styles.samplePanel}>
                        <div className={styles.cardActions}>
                          <button
                            type="button"
                            className={`${styles.btn} ${styles.btnPrimary}`}
                            onClick={() => downloadTextFile(asset.fileName, asset.fileText)}
                          >
                            <span className={styles.sampleCtaIcon} aria-hidden="true">
                              v
                            </span>
                            Download now
                          </button>
                          <button
                            type="button"
                            className={`${styles.btn} ${styles.btnGhost}`}
                            onClick={() => openSampleLead(asset)}
                          >
                            <span className={styles.sampleCtaIcon} aria-hidden="true">
                              @
                            </span>
                            Email me this
                          </button>
                        </div>
                        <p className={styles.sampleMicro}>{asset.downloadHint}</p>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>

            <div className={styles.sampleTrustRow} aria-label="Trust strip">
              <span className={styles.sampleHighlightPill}>
                <span className={styles.sampleHighlightDot} />
                <strong>No obligation</strong> - download anytime
              </span>
              <span className={styles.sampleHighlightPill}>
                <span className={styles.sampleHighlightDot} />
                <strong>Integrity-first</strong> - you remain the author
              </span>
              <span className={styles.sampleHighlightPill}>
                <span className={styles.sampleHighlightDot} />
                <strong>Confidential</strong> - handled securely
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="overview-trust">
        <div className={styles.container}>
          <div className={styles.sectionKicker}>WHY RESEARCHERS TRUST US</div>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
            Trusted because we reduce confusion, not because we sell packages
          </h2>
          <p className={styles.sectionSub}>
            Real blockers, real outcomes, and the exact change made after support.
          </p>

          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialList}>
              {testimonials.map((item) => {
                const expanded = expandedTestimonials.includes(item.id);

                return (
                  <article key={item.id} className={`${styles.testimonialCard} ${expanded ? styles.expanded : ""}`}>
                    <div className={styles.testimonialTop}>
                      <div className={styles.avatar}>{item.initials}</div>
                      <div>
                        <h3>{item.author}</h3>
                        <p>{item.stage}</p>
                        <div className={styles.badgeRow}>
                          <span>{item.country}</span>
                          <span>{item.category}</span>
                          <span>{item.service}</span>
                        </div>
                      </div>
                    </div>

                    <blockquote>{item.quote}</blockquote>

                    <div className={styles.cardActions}>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnGhost}`}
                        onClick={() => toggleTestimonial(item.id)}
                        aria-expanded={expanded}
                      >
                        {expanded ? "Hide details" : "Show details"}
                      </button>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={() => openTestimonialLead(item.stage, item.category)}
                      >
                        Request scope
                      </button>
                    </div>

                    <p className={styles.outcomeLine}>Outcome: {item.outcome}</p>

                    {expanded ? (
                      <div className={styles.detailBox}>
                        <p>
                          <strong>Before:</strong> {item.before}
                        </p>
                        <p>
                          <strong>After:</strong> {item.after}
                        </p>
                        <ul>
                          {item.details.map((detail) => (
                            <li key={`${item.id}-${detail}`}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>

            <aside className={styles.trustRail}>
              <h3>Fast scan</h3>
              <div className={styles.tagRow}>
                <span className={styles.pill}>Confidential</span>
                <span className={styles.pill}>Integrity-first</span>
                <span className={styles.pill}>No misconduct support</span>
                <span className={styles.pill}>IRB/HREC/REC aware</span>
              </div>

              <ul>
                <li>
                  <strong>Clear research gap</strong>
                  <span>So supervisors see novelty quickly.</span>
                </li>
                <li>
                  <strong>Feasible methods</strong>
                  <span>Defendable design without overcomplication.</span>
                </li>
                <li>
                  <strong>Submission readiness</strong>
                  <span>Cleaner packs with fewer preventable rejections.</span>
                </li>
              </ul>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => openTestimonialLead("", "")}
                >
                  Request pricing and scope
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`} id="overview-faq">
        <div className={styles.container}>
          <div className={styles.sectionKicker}>FAQ</div>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
            Smart accordion: scan fast, then open only what you need
          </h2>
          <p className={styles.sectionSub}>
            Category filters, open-all control, and copy-ready answers for supervisor sharing.
          </p>

          <div className={styles.faqBar}>
            <div className={styles.faqChips} role="tablist" aria-label="FAQ categories">
              {faqCategories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  role="tab"
                  aria-selected={activeFaqCategory === category.key}
                  className={`${styles.faqChip} ${
                    activeFaqCategory === category.key ? styles.faqChipActive : ""
                  }`}
                  onClick={() => {
                    setActiveFaqCategory(category.key);
                    setFaqOpenAll(false);
                    setOpenFaqIds([]);
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className={styles.faqActions}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={toggleFaqOpenAll}
              >
                {faqOpenAll ? "Collapse all" : "Open all"}
              </button>
              <Link
                href={buildContactHref({ source: "service-overview-faq" })}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Request pricing
              </Link>
            </div>
          </div>

          <div className={styles.faqList}>
            {visibleFaqs.map((item) => {
              const isOpen = openFaqIds.includes(item.id);
              return (
                <article key={item.id} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    aria-expanded={isOpen}
                    onClick={() => toggleFaqOpen(item)}
                  >
                    <h3>{item.q}</h3>
                    <span>{isOpen ? "-" : "+"}</span>
                  </button>

                  {isOpen ? (
                    <div className={styles.faqAnswer}>
                      <p>{item.a}</p>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={`${item.id}-${bullet}`}>{bullet}</li>
                        ))}
                      </ul>
                      <div className={styles.faqFoot}>
                        <span>{item.tip}</span>
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost}`}
                          onClick={() => copyFaqAnswer(item)}
                        >
                          {faqCopyId === item.id ? "Copied" : "Copy answer"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>

          <p className={styles.footNote}>
            Still unsure? Share your stage and one blocker. We reply with a calm, practical plan.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <article className={styles.finalCta}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              Ready to move from confusion to a clear plan?
            </h2>
            <p className={styles.sectionSub}>
              Send your stage, blocker, and deadline. We will return module-fit guidance,
              scope, and timeline.
            </p>
            <div className={styles.ctaRow}>
              <Link
                href={buildContactHref({ source: "service-overview-final" })}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Drop a Query
              </Link>
              <a href="#overview-modules" className={`${styles.btn} ${styles.btnGhost}`}>
                Pick a module
              </a>
            </div>
          </article>
        </div>
      </section>
      {heroModalOpen ? (
        <div className={styles.modalBackdrop} role="presentation" onClick={() => setHeroModalOpen(false)}>
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="overview-hero-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <h3 id="overview-hero-modal-title">Drop a Query</h3>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setHeroModalOpen(false)}
              >
                Close
              </button>
            </div>

            <form className={styles.modalForm} onSubmit={submitHeroLead}>
              <label className={styles.field}>
                <span>Email *</span>
                <input
                  type="email"
                  value={heroForm.email}
                  onChange={(event) =>
                    setHeroForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="you@university.edu"
                />
              </label>
              <label className={styles.field}>
                <span>Subject area *</span>
                <input
                  type="text"
                  value={heroForm.subject}
                  onChange={(event) =>
                    setHeroForm((prev) => ({ ...prev, subject: event.target.value }))
                  }
                  placeholder="Medicine, Engineering, Social Sciences"
                />
              </label>
              <label className={styles.field}>
                <span>Stage *</span>
                <input
                  type="text"
                  value={heroForm.stage}
                  onChange={(event) =>
                    setHeroForm((prev) => ({ ...prev, stage: event.target.value }))
                  }
                  placeholder="Planning / Mid-stage / Submitting"
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Your query *</span>
                <textarea
                  rows={4}
                  value={heroForm.query}
                  onChange={(event) =>
                    setHeroForm((prev) => ({ ...prev, query: event.target.value }))
                  }
                  placeholder="Topic + stage + blocker + deadline"
                />
              </label>

              {heroFormError ? <p className={styles.error}>{heroFormError}</p> : null}

              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {moduleModalOpen ? (
        <div className={styles.modalBackdrop} role="presentation" onClick={() => setModuleModalOpen(false)}>
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="overview-module-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <h3 id="overview-module-modal-title">Request pricing and scope</h3>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setModuleModalOpen(false)}
              >
                Close
              </button>
            </div>

            <p className={styles.modalMeta}>{activeModuleHint}</p>

            <form className={styles.modalForm} onSubmit={submitModuleLead}>
              <label className={styles.field}>
                <span>Name *</span>
                <input
                  type="text"
                  value={moduleLeadForm.name}
                  onChange={(event) =>
                    setModuleLeadForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Your name"
                />
              </label>
              <label className={styles.field}>
                <span>Email *</span>
                <input
                  type="email"
                  value={moduleLeadForm.email}
                  onChange={(event) =>
                    setModuleLeadForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="name@email.com"
                />
              </label>
              <label className={styles.field}>
                <span>Phone *</span>
                <input
                  type="tel"
                  value={moduleLeadForm.phone}
                  onChange={(event) =>
                    setModuleLeadForm((prev) => ({ ...prev, phone: event.target.value }))
                  }
                  placeholder="+91..."
                />
              </label>
              <label className={styles.fieldWide}>
                <span>What help do you need? *</span>
                <textarea
                  rows={4}
                  value={moduleLeadForm.query}
                  onChange={(event) =>
                    setModuleLeadForm((prev) => ({ ...prev, query: event.target.value }))
                  }
                  placeholder="One to three lines are enough"
                />
              </label>

              {moduleLeadError ? <p className={styles.error}>{moduleLeadError}</p> : null}

              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {serviceModalOpen ? (
        <div className={styles.modalBackdrop} role="presentation" onClick={() => setServiceModalOpen(false)}>
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="overview-service-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <h3 id="overview-service-modal-title">{serviceModalContent.title || "Module"}</h3>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setServiceModalOpen(false)}
              >
                Close
              </button>
            </div>

            <p className={styles.modalMeta}>{serviceModalContent.meta}</p>
            <p className={styles.sectionSub}>
              Next step: open enquiry form with module and category prefilled.
            </p>

            <Link
              href={buildContactHref({
                source: "service-overview-category",
                notes: serviceModalContent.meta,
              })}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Continue to contact
            </Link>
          </div>
        </div>
      ) : null}

      {sampleModalOpen && sampleLeadAsset ? (
        <div className={styles.modalBackdrop} role="presentation" onClick={() => setSampleModalOpen(false)}>
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="overview-sample-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <h3 id="overview-sample-modal-title">Email asset: {sampleLeadAsset.title}</h3>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setSampleModalOpen(false)}
              >
                Close
              </button>
            </div>

            <div className={styles.sampleModalBody}>
              <div className={styles.sampleModalGrid}>
                <form className={styles.sampleLeadForm} onSubmit={submitSampleLead}>
                  <label className={styles.field}>
                    <span>Name</span>
                    <input
                      type="text"
                      value={sampleLeadForm.name}
                      onChange={(event) =>
                        setSampleLeadForm((prev) => ({ ...prev, name: event.target.value }))
                      }
                      placeholder="Your name"
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Email *</span>
                    <input
                      type="email"
                      value={sampleLeadForm.email}
                      onChange={(event) =>
                        setSampleLeadForm((prev) => ({ ...prev, email: event.target.value }))
                      }
                      placeholder="you@university.edu"
                    />
                    <small className={styles.sampleHelper}>
                      We only use this to send the asset and reply if needed.
                    </small>
                  </label>
                  <label className={styles.fieldWide}>
                    <span>Country / region (optional)</span>
                    <select
                      value={sampleLeadForm.region}
                      onChange={(event) =>
                        setSampleLeadForm((prev) => ({ ...prev, region: event.target.value }))
                      }
                    >
                      <option value="">Select...</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                    <small className={styles.sampleHelper}>
                      Used only to align terminology (IRB, HREC, REC).
                    </small>
                  </label>
                  <label className={styles.fieldWide}>
                    <span>Optional note (1-2 lines)</span>
                    <textarea
                      rows={3}
                      value={sampleLeadForm.note}
                      onChange={(event) =>
                        setSampleLeadForm((prev) => ({ ...prev, note: event.target.value }))
                      }
                      placeholder="Example: supervisor says the gap is unclear; need defensible methodology."
                    />
                    <small className={styles.sampleHelper}>
                      Keep it short. We ask follow-ups only if needed.
                    </small>
                  </label>

                  {sampleLeadError ? <p className={styles.error}>{sampleLeadError}</p> : null}

                  <div className={styles.cardActions}>
                    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                      Send to my email
                    </button>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnGhost}`}
                      onClick={() =>
                        downloadTextFile(sampleLeadAsset.fileName, sampleLeadAsset.fileText)
                      }
                    >
                      Download instead
                    </button>
                  </div>
                </form>

                <aside className={styles.sampleSideNote}>
                  <p>
                    <strong>What happens next</strong>
                  </p>
                  <p>- We send the asset link and a short guide for usage.</p>
                  <p>- If you add a note, we can suggest the best-fit module.</p>
                  <p>
                    <strong>Confidential and ethical</strong>
                  </p>
                  <p>
                    We support clarity, structure, and defensible methods. We do not
                    support misconduct.
                  </p>
                </aside>
              </div>
            </div>

            <div className={styles.sampleModalFoot}>
              <span className={styles.sampleStatus}>Asset: {sampleLeadAsset.title}</span>
              <span className={styles.sampleStatus}>Close with Esc or the Close button.</span>
            </div>
          </div>
        </div>
      ) : null}

      {testimonialModalOpen ? (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onClick={() => setTestimonialModalOpen(false)}
        >
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="overview-testimonial-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <h3 id="overview-testimonial-modal-title">Request pricing and scope</h3>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setTestimonialModalOpen(false)}
              >
                Close
              </button>
            </div>

            <form className={styles.modalForm} onSubmit={submitTestimonialLead}>
              <label className={styles.field}>
                <span>Name *</span>
                <input
                  type="text"
                  value={testimonialLeadForm.name}
                  onChange={(event) =>
                    setTestimonialLeadForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Your name"
                />
              </label>
              <label className={styles.field}>
                <span>Email *</span>
                <input
                  type="email"
                  value={testimonialLeadForm.email}
                  onChange={(event) =>
                    setTestimonialLeadForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="name@email.com"
                />
              </label>
              <label className={styles.field}>
                <span>Stage *</span>
                <select
                  value={testimonialLeadForm.stage}
                  onChange={(event) =>
                    setTestimonialLeadForm((prev) => ({ ...prev, stage: event.target.value }))
                  }
                >
                  <option value="">Select</option>
                  <option value="Planning">Planning</option>
                  <option value="Mid-stage">Mid-stage</option>
                  <option value="Submitting">Submitting</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>Blocker *</span>
                <input
                  type="text"
                  value={testimonialLeadForm.blocker}
                  onChange={(event) =>
                    setTestimonialLeadForm((prev) => ({ ...prev, blocker: event.target.value }))
                  }
                  placeholder="Gap unclear, methods mismatch, desk rejection"
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Query *</span>
                <textarea
                  rows={4}
                  value={testimonialLeadForm.query}
                  onChange={(event) =>
                    setTestimonialLeadForm((prev) => ({ ...prev, query: event.target.value }))
                  }
                  placeholder="Add one to two lines about your case"
                />
              </label>

              {testimonialLeadError ? <p className={styles.error}>{testimonialLeadError}</p> : null}

              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
