import type { Metadata } from "next";
import { CareersExperience } from "@/components/sections/CareersExperience";

export const metadata: Metadata = {
  title: "Careers - Researchedit4u",
  description:
    "Explore careers across editorial quality, integrity, data review, and research operations.",
};

export default function CareersPage() {
  return <CareersExperience />;
}
