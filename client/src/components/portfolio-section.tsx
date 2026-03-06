import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

type Category = "all" | "web" | "mobile" | "design";

const filters: { label: string; value: Category }[] = [
  { label: "All Projects", value: "all" },
  { label: "Web Apps", value: "web" },
  { label: "Mobile Apps", value: "mobile" },
  { label: "UI/UX Design", value: "design" },
];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const { data: projects, isLoading } = useQuery<Project[]>({ queryKey: ["/api/projects"] });

  const filtered =
    activeFilter === "all"
      ? projects || []
      : (projects || []).filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-24 lg:py-32 bg-muted/30"
      data-testid="section-portfolio"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-primary tracking-wide uppercase">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Featured Projects
          </h2>
          <div className="flex justify-center mt-2 mb-4">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chart-2" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of our recent work across web, mobile, and design disciplines.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.value
                  ? "bg-gradient-to-r from-primary to-chart-2 text-white shadow-md"
                  : "bg-muted text-muted-foreground hover-elevate"
              }`}
              data-testid={`button-filter-${filter.value}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-border/50">
                <Skeleton className="h-48 sm:h-52 rounded-t-md" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="group cursor-pointer border-border/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.03]"
                    data-testid={`card-project-${project.id}`}
                  >
                    <div
                      className={`h-52 sm:h-48 rounded-t-md bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-t-md flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white text-sm font-semibold tracking-wide">View Project</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-white/15 text-white backdrop-blur-md border-white/20 rounded-full">
                          {project.category === "web"
                            ? "Web App"
                            : project.category === "mobile"
                              ? "Mobile App"
                              : "Design"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
