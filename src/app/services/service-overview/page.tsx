import type { Metadata } from "next";
import ServiceOverviewExperience from "./ServiceOverviewExperience";

export const metadata: Metadata = {
  title: "Service Overview | Researchedit4u",
  description:
    "Stage-based service overview for planning, data analysis, editing, publication, and presentation support, with clear scope, pricing, proof samples, and FAQs.",
};

export default function ServiceOverviewPage() {
  return <ServiceOverviewExperience fontClassName="" />;
}
