import type { Metadata } from "next";
import { CareersExperience } from "@/components/sections/CareersExperience";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";

export const metadata: Metadata = {
  title: "Careers - Researchedit4u",
  description:
    "Explore careers across editorial quality, integrity, data review, and research operations.",
};

export default function CareersPage() {
  return (
    <PublicPageFrame>
      <CareersExperience />
    </PublicPageFrame>
  );
}
