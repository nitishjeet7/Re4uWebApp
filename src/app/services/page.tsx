import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { ServicesCatalog } from "@/components/sections/ServicesCatalog";
import { BookNowModal } from "@/components/sections/BookNowModal";
import {
  PublicPageContainer,
  PublicPageFrame,
  PublicPageHero,
} from "@/components/layout/PublicPageFrame";

export const metadata: Metadata = {
  title: "Services - Researchedit4u",
  description:
    "Academic editing services built for research clarity and submission success.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <PublicPageFrame>
      <PublicPageHero
        kicker="Services"
        title="Choose focused support for every publication stage."
        description="From research planning and editing to data reporting and submission support, select the service that matches your immediate need."
        actions={[
          { href: "/contact", label: "Get Quote" },
          { href: "/case-studies", label: "See Case Stories", variant: "outline" },
        ]}
      />

      <ServicesCatalog services={services} />

      <PublicPageContainer>
        <section className="mt-6">
          <Card className="rounded-[20px] border border-[#d7e0ee] bg-white p-6 text-center shadow-[0_12px_28px_rgba(11,18,32,.08)]">
            <h2 className="mb-3 text-2xl font-bold text-[#0b1220]">Ready to get started?</h2>
            <p className="mb-5 text-sm text-[#5a6980] sm:text-base">
              Share your manuscript context and get a transparent scope recommendation.
            </p>
            <BookNowModal
              source="services-cta"
              triggerLabel="Book 1:1 Expert Call"
              triggerClassName="inline-flex h-11 items-center justify-center rounded-full bg-[#1d4ed8] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0b3c71]"
            />
          </Card>
        </section>
      </PublicPageContainer>
    </PublicPageFrame>
  );
}
