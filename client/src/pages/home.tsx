import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { AboutSection } from "@/components/about-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { SectionVisibility } from "@shared/schema";

const sectionComponents: Record<string, () => JSX.Element> = {
  hero: HeroSection,
  services: ServicesSection,
  portfolio: PortfolioSection,
  about: AboutSection,
  testimonials: TestimonialsSection,
  blog: BlogSection,
  contact: ContactSection,
};

export default function Home() {
  const { data: sections } = useQuery<SectionVisibility[]>({ queryKey: ["/api/section-visibility"] });

  const visibleSet = new Set(
    sections?.filter((s) => s.visible).map((s) => s.sectionKey) ?? Object.keys(sectionComponents)
  );

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Navigation />
      <main>
        {Object.entries(sectionComponents).map(([key, Component]) =>
          visibleSet.has(key) ? <Component key={key} /> : null
        )}
      </main>
      <Footer />
    </div>
  );
}
