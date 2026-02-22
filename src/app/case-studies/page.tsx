import type { Metadata } from "next";
import { CaseStoriesExperience } from "@/components/sections/CaseStoriesExperience";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";

export const metadata: Metadata = {
  title: "Case Stories - Researchedit4u",
  description:
    "Anonymised case stories showing outcomes across editing, journal selection, integrity, data support, and rebuttal planning.",
};

export default function CaseStudiesPage() {
  return (
    <PublicPageFrame>
      <CaseStoriesExperience />
    </PublicPageFrame>
  );
}
