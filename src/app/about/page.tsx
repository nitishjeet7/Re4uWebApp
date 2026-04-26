import type { Metadata } from "next";
import { PublicPageContainer } from "@/components/layout/PublicPageFrame";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMissionSection } from "@/components/sections/AboutMissionSection";
import { AboutWhyWeExistSection } from "@/components/sections/AboutWhyWeExistSection";
import { AboutPrinciplesSection } from "@/components/sections/AboutPrinciplesSection";
import { AboutWhoWeServeSection } from "@/components/sections/AboutWhoWeServeSection";
import { AboutWhatWeDoSection } from "@/components/sections/AboutWhatWeDoSection";
import { AboutHowWeWorkSection } from "@/components/sections/AboutHowWeWorkSection";
import { AboutPromiseSection } from "@/components/sections/AboutPromiseSection";
import { AboutInvitationSection } from "@/components/sections/AboutInvitationSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About - Researchedit4u",
  description: "Learn about our mission, process, and ethical standards.",
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.heroBlock}>
        <AboutHero />
      </div>

      <PublicPageContainer>
        <div className={styles.stack}>
          <div className={styles.sectionShell}>
            <AboutMissionSection />
          </div>
          <div className={styles.sectionShell}>
            <AboutWhyWeExistSection />
          </div>
          <div className={styles.sectionShell}>
            <AboutPrinciplesSection />
          </div>
          <div className={styles.sectionShell}>
            <AboutWhoWeServeSection />
          </div>
          <div className={styles.sectionShell}>
            <AboutWhatWeDoSection />
          </div>
          <div className={styles.sectionShell}>
            <AboutHowWeWorkSection />
          </div>
          <div className={styles.sectionShell}>
            <AboutPromiseSection />
          </div>
          <div className={styles.sectionShell}>
            <AboutInvitationSection />
          </div>
        </div>
      </PublicPageContainer>
    </div>
  );
}
