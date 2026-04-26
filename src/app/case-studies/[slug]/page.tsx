import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/lib/api";
import {
  PublicPageContainer,
  PublicPageFrame,
} from "@/components/layout/PublicPageFrame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} - Researchedit4u`,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const metrics = Object.entries(study.metricsJson ?? {});

  return (
    <PublicPageFrame>
      <PublicPageContainer>
        <section className="rounded-[24px] border border-[#A8C7E6]/60 bg-white p-5 shadow-[0_14px_32px_rgba(31,58,95,.12)] sm:p-6">
          <Link
            href="/case-studies"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1F3A5F] hover:underline"
          >
            <span aria-hidden>&larr;</span>
            Back to case stories
          </Link>

          <Badge variant="outline" className="mb-3 border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#1F3A5F]">
            Case Story
          </Badge>

          <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1F3A5F] md:text-[40px]">
            {study.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#2A2E35]/76">{study.summary}</p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[18px] border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
              <h2 className="text-lg font-bold text-[#1F3A5F]">Problem</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/76">{study.problem}</p>

              <h2 className="mt-5 text-lg font-bold text-[#1F3A5F]">Approach</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/76">{study.approach}</p>

              <h2 className="mt-5 text-lg font-bold text-[#1F3A5F]">Outcome</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/76">{study.outcome}</p>
            </article>

            <aside className="rounded-[18px] border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
              <h2 className="text-lg font-bold text-[#1F3A5F]">Story Snapshot</h2>
              {metrics.length > 0 ? (
                <dl className="mt-3 space-y-2.5">
                  {metrics.map(([key, value]) => (
                    <div key={key} className="rounded-[12px] border border-[#A8C7E6]/60 bg-white p-3">
                      <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#1F3A5F]/82">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </dt>
                      <dd className="mt-1 text-sm text-[#1F3A5F]">
                        {Array.isArray(value) ? value.join(", ") : String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 text-sm text-[#2A2E35]/76">
                  Detailed metrics were not provided for this case story.
                </p>
              )}
            </aside>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild className="rounded-full bg-[#1F3A5F] text-white hover:bg-[#3F7F72]">
              <Link href="/contact">Discuss your manuscript</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-[#A8C7E6]/60 bg-white text-[#1F3A5F]">
              <Link href="/case-studies">View more case stories</Link>
            </Button>
          </div>
        </section>
      </PublicPageContainer>
    </PublicPageFrame>
  );
}
