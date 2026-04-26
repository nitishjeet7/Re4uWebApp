"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ServicesFilter,
  type FilterOption,
} from "@/components/sections/ServicesFilter";
import type { Service } from "@/lib/types";

const serviceIdToFilter: Record<string, Exclude<FilterOption, "all">> = {
  "service-overview": "overview",
  "editing-support": "editing",
  "publication-support": "public",
  "data-services": "data",
  "research-planning": "planning",
  presentations: "presentations",
};

function getServiceDisplayTitle(service: Service) {
  if (service.id === "presentations") {
    return "Academic Presentation";
  }
  return service.title;
}

export function ServicesCatalog({ services }: { services: Service[] }) {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");

  const filteredServices = useMemo(() => {
    if (selectedFilter === "all") {
      return services;
    }

    return services.filter(
      (service) => serviceIdToFilter[service.id] === selectedFilter,
    );
  }, [services, selectedFilter]);

  return (
    <section className="py-8 sm:py-12" id="services-grid">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-[18px]">
        <div className="mb-6 sm:mb-8">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
                Choose a focused engagement or combine services
              </h2>
              <p className="text-sm text-[var(--muted-service)] sm:text-base">
                From quick AI and similarity checks to comprehensive editing and
                journal matching, pick the support that fits your timeline and
                goals.
              </p>
            </div>
            <ServicesFilter
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <Card className="rounded-[22px] border border-[var(--line)] bg-white p-8 text-center shadow-[0_10px_24px_rgba(20,35,45,.08)]">
            <h3 className="text-lg font-semibold text-[var(--ink)]">
              No services in this category yet
            </h3>
            <p className="mt-2 text-sm text-[var(--muted-service)]">
              Try switching the filter or check all services.
            </p>
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedFilter("all")}
                className="rounded-full"
              >
                View all services
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="rounded-[22px] border border-[var(--line)] bg-white p-6 shadow-[0_10px_24px_rgba(20,35,45,.08)] transition-all hover:shadow-[0_10px_24px_rgba(20,35,45,.10)]"
              >
                <div className="mb-4">
                  <Badge className="mb-2 text-xs">
                    {getServiceDisplayTitle(service).split(" ")[0]}
                  </Badge>
                  <h3 className="mb-2 text-xl font-semibold">
                    {getServiceDisplayTitle(service)}
                  </h3>
                  <p className="mb-4 text-sm text-[var(--muted-service)]">
                    {service.shortDescription}
                  </p>
                </div>

                <ul className="mb-4 space-y-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="text-sm text-[var(--muted-service)]">
                      - {feature}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full">
                  <Link href={`/services/${service.id}`}>Explore service</Link>
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
