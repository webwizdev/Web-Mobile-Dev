import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { HeroContent, Stat } from "@shared/schema";

export function HeroSection() {
  const { data: hero } = useQuery<HeroContent>({ queryKey: ["/api/hero"] });
  const { data: stats } = useQuery<Stat[]>({ queryKey: ["/api/stats"] });

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-testid="section-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10" />

      <div className="absolute top-10 right-5 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-5 w-[30rem] h-[30rem] bg-chart-3/8 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-chart-2/6 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />

      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-28 lg:py-40 xl:py-48">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-chart-2/20 to-chart-3/20 animate-gradient-shift" />
              <Sparkles className="w-4 h-4 text-primary relative z-10" />
              <span className="text-sm font-medium text-primary relative z-10" data-testid="text-hero-badge">
                {hero?.badgeText || "Award-Winning Digital Agency"}
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="text-hero-title"
          >
            {hero?.titleLine1 || "We Craft Digital"}
            <br />
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              {hero?.titleHighlight || "Experiences"}
            </span>{" "}
            {hero?.titleLine3 || "That Matter"}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="text-hero-subtitle"
          >
            {hero?.subtitle || "FIO Creatives transforms bold ideas into stunning web and mobile applications. We blend design excellence with cutting-edge technology to deliver products that users love."}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-chart-2 border-primary text-primary-foreground"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-hero-cta"
            >
              {hero?.ctaPrimary || "Start a Project"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-sm bg-background/40 border-border/50"
              onClick={() => scrollToSection("#portfolio")}
              data-testid="button-hero-portfolio"
            >
              {hero?.ctaSecondary || "View Our Work"}
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {stats ? stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-4 rounded-md backdrop-blur-sm bg-background/40 dark:bg-background/30 border border-border/40"
              >
                <div
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                  data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            )) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center space-y-2 p-4 rounded-md backdrop-blur-sm bg-background/40 border border-border/40">
                  <Skeleton className="h-8 w-16 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
