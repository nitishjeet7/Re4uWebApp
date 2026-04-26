import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

export function CaseStudiesPreview({ studies }: { studies: CaseStudy[] }) {
  return (
    <section
      className="section-pad"
      style={{
        background:
          "radial-gradient(1100px 520px at 20% -10%, rgba(168,199,230,.25), transparent 60%), radial-gradient(900px 520px at 90% -10%, rgba(63,127,114,.14), transparent 55%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.45))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2.5 text-xs uppercase tracking-[0.18em] text-[#2A2E35]/70">
              Success Stories
            </div>
            <h2 className="m-0 text-3xl font-bold leading-[1.12] tracking-[-0.02em] text-[#1F3A5F] md:text-[34px]">
              Case Stories
            </h2>
            <p className="mt-2.5 text-[15.5px] leading-relaxed text-[#2A2E35]/80">
              Real anonymised outcomes from researchers we&apos;ve supported.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="whitespace-nowrap text-sm font-semibold text-[#1F3A5F] hover:text-[#3F7F72] hover:underline"
          >
            View all stories &rarr;
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((study) => (
            <Card
              key={study.id}
              className="overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3F7F72]/40 hover:shadow-xl"
            >
              <CardContent className="p-5">
                <h3 className="mb-2 text-lg font-bold text-[#1F3A5F]">
                  {study.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#2A2E35]/80">
                  {study.summary}
                </p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#1F3A5F] hover:text-[#3F7F72] hover:underline"
                >
                  View story
                  <span>&rarr;</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
