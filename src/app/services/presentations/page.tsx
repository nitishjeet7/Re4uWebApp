import type { Metadata } from "next";
import PresentationsExperience from "./PresentationsExperience";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";

export const metadata: Metadata = {
  title: "Academic Presentation | Researchedit4u",
  description:
    "Academic presentation and research poster support for thesis defence, conferences, and proposal decks.",
};

export default function PresentationsPage() {
  return (
    <PublicPageFrame>
      <PresentationsExperience fontClassName="" />
    </PublicPageFrame>
  );
}
