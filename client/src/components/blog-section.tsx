import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function BlogSection() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({ queryKey: ["/api/blog"] });

  return (
    <section id="blog" className="py-16 md:py-24 lg:py-32" data-testid="section-blog">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-primary tracking-wide uppercase">
            Blog & Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Latest from Our Blog
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Thoughts, case studies, and insights from our team on design,
            development, and digital strategy.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-border/50 rounded-2xl overflow-hidden">
                <Skeleton className="h-44" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogPosts?.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card
                  className="group cursor-pointer border-border/50 rounded-2xl overflow-visible transition-all duration-300 h-full flex flex-col hover-elevate"
                  data-testid={`card-blog-${post.id}`}
                >
                  <div className="relative rounded-t-2xl overflow-hidden">
                    <div
                      className={`h-44 bg-gradient-to-br ${post.gradient} transition-transform duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-gradient-to-r from-primary/90 to-chart-2/90 text-white backdrop-blur-sm border-0 no-default-hover-elevate no-default-active-elevate"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70 mb-3 flex-wrap">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-all duration-300">
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
