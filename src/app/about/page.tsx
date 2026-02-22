import type { Metadata } from "next";
import { PublicPageContainer, PublicPageFrame } from "@/components/layout/PublicPageFrame";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMissionSection } from "@/components/sections/AboutMissionSection";
import { AboutWhyWeExistSection } from "@/components/sections/AboutWhyWeExistSection";
import { AboutPrinciplesSection } from "@/components/sections/AboutPrinciplesSection";
import { AboutWhoWeServeSection } from "@/components/sections/AboutWhoWeServeSection";
import { AboutWhatWeDoSection } from "@/components/sections/AboutWhatWeDoSection";
import { AboutHowWeWorkSection } from "@/components/sections/AboutHowWeWorkSection";
import { AboutPromiseSection } from "@/components/sections/AboutPromiseSection";
import { AboutInvitationSection } from "@/components/sections/AboutInvitationSection";

export const metadata: Metadata = {
  title: "About - Researchedit4u",
  description: "Learn about our mission, process, and ethical standards.",
};

export default function AboutPage() {
  return (
    <PublicPageFrame>
      <div className="about-page">
        <div className="about-hero-block">
          <AboutHero />
        </div>

        <PublicPageContainer>
          <div className="about-stack">
            <div className="about-section-shell">
              <AboutMissionSection />
            </div>
            <div className="about-section-shell">
              <AboutWhyWeExistSection />
            </div>
            <div className="about-section-shell">
              <AboutPrinciplesSection />
            </div>
            <div className="about-section-shell">
              <AboutWhoWeServeSection />
            </div>
            <div className="about-section-shell">
              <AboutWhatWeDoSection />
            </div>
            <div className="about-section-shell">
              <AboutHowWeWorkSection />
            </div>
            <div className="about-section-shell">
              <AboutPromiseSection />
            </div>
            <div className="about-section-shell">
              <AboutInvitationSection />
            </div>
          </div>
        </PublicPageContainer>
      </div>
    </PublicPageFrame>
  );
}
