import Link from "next/link";
import { ShieldCheck, Target, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const RISK_ITEMS = [
  {
    title: "Desk rejection from scope mismatch",
    description: "Journal-fit checks reduce avoidable first-round rejection.",
  },
  {
    title: "Methods and reporting clarity gaps",
    description: "Cleaner method-result communication for faster reviewer understanding.",
  },
  {
    title: "Unstable or risky target journals",
    description: "Safer shortlist logic with indexing and scope validation.",
  },
];

const CONTROL_ITEMS = [
  {
    title: "Editorial competence",
    badge: "PhD-qualified",
    description: "Clarity and structure upgrades without changing scientific meaning.",
    icon: Target,
  },
  {
    title: "Journal safety",
    badge: "SCI / Scopus",
    description: "Scope-fit and publication-signal checks to reduce resubmission cycles.",
    icon: ShieldCheck,
  },
  {
    title: "Process accountability",
    badge: "Clear timelines",
    description: "Defined ownership with transparent handoffs from intake to delivery.",
    icon: TriangleAlert,
  },
];

export function TrustControlsSection() {
  return (
    <section id="sec-trust" className="section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-[#A8C7E6]/60 bg-white p-5 shadow-md sm:p-6">
          <div className="mb-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#2A2E35]/75">
              WHY RESEARCHERS TRUST RESEARCHEDIT4U
            </p>
            <h2 className="m-0 text-left text-3xl font-bold tracking-[-0.02em] text-[#1F3A5F] md:text-[34px]">
              Risk-to-control publication support built for real submissions.
            </h2>
            <p className="mt-2.5 max-w-[760px] text-[15px] leading-relaxed text-[#2A2E35]/75">
              We identify common rejection risks, then apply practical controls to
              keep manuscripts reviewer-ready.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1F3A5F]">
                What we help you avoid
              </p>
              <div className="space-y-3">
                {RISK_ITEMS.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl border border-[#A8C7E6]/60 bg-white p-3"
                  >
                    <p className="m-0 text-sm font-bold text-[#2A2E35]">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#2A2E35]/75">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </Card>

            <div className="grid gap-3">
              <p className="mb-0 text-xs font-bold uppercase tracking-[0.12em] text-[#1F3A5F]">
                How we control for quality
              </p>
              {CONTROL_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="rounded-xl border border-[#A8C7E6]/60 bg-white p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-[#2A2E35]">
                        <Icon className="h-4 w-4 text-[#1F3A5F]" aria-hidden />
                        <span>{item.title}</span>
                      </div>
                      <span className="rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-2.5 py-1 text-xs text-[#1F3A5F]">
                        {item.badge}
                      </span>
                    </div>
                    <p className="m-0 text-sm leading-relaxed text-[#2A2E35]/75">
                      {item.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-3.5">
            <p className="m-0 text-xs text-[#2A2E35]/75">
              <span className="font-semibold text-[#1F3A5F]">COPE-aligned</span> ethics |
              transparent scope | reviewer-ready delivery
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" className="rounded-full border-[#A8C7E6]/60">
                <Link href="/case-studies">See editing samples</Link>
              </Button>
              <Button asChild className="rounded-full bg-[#1F3A5F] text-white hover:bg-[#3F7F72]">
                <Link href="/contact">Book 1:1 expert call</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
