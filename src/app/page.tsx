import { getPublishedPosts } from "@/actions/posts";
import { getServices } from "@/lib/api";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustSection } from "@/components/sections/TrustSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { SubjectExplorerSection } from "@/components/sections/SubjectExplorerSection";
import { QuickRoutesSection } from "@/components/sections/QuickRoutesSection";
import { TrustControlsSection } from "@/components/sections/TrustControlsSection";
import { ResourcesShelfSection } from "@/components/sections/ResourcesShelfSection";
import { PopularServicesSection } from "@/components/sections/PopularServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import styles from "./page.module.css";

// Cache for 60s to reduce CPU; revalidate in background (was force-dynamic)
export const revalidate = 60;

export default async function HomePage() {
  const [services, posts] = await Promise.all([getServices(), getPublishedPosts()]);

  return (
    <main className={styles.homePage}>
      <div className={styles.homeSection}>
        <Hero />
      </div>
      <div className={styles.homeSection}>
        <TrustSection />
      </div>
      <div className={styles.homeSection}>
        <SubjectExplorerSection />
      </div>
      <div className={styles.homeSection}>
        <PopularServicesSection />
      </div>
      <div className={styles.homeSection}>
        <QuickRoutesSection />
      </div>
      <div className={styles.homeSection}>
        <HowItWorks />
      </div>
      <div className={styles.homeSection}>
        <TrustControlsSection />
      </div>
      <div className={styles.homeSection}>
        <ServicesPreview services={services.slice(0, 6)} />
      </div>
      <div className={styles.homeSection}>
        <ResourcesShelfSection posts={posts.slice(0, 8)} />
      </div>
      <div className={styles.homeSection}>
        <TestimonialsSection />
      </div>
      <div className={styles.homeSection}>
        <FaqSection />
      </div>
    </main>
  );
}
