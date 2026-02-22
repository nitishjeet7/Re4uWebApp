import type { Metadata } from "next";
import ServiceOverviewExperience from "./ServiceOverviewExperience";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";

export const metadata: Metadata = {
  title: "Service Overview | Researchedit4u",
  description:
    "Full academic service overview with stage-based modules, pricing scope, proof assets, and FAQ for planning, analysis, editing, publication, and presentation support.",
};

export default function ServiceOverviewPage() {
  return (
    <PublicPageFrame>
      <ServiceOverviewExperience fontClassName="" />
    </PublicPageFrame>
  );
}
