import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({ queryKey: ["/api/testimonials"] });

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-muted/30"
      data-testid="section-testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-primary tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what the people we've worked
            with have to say.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6 lg:p-8 border-border/50">
                <Skeleton className="w-8 h-8 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials?.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <Card
                  className="p-6 lg:p-8 h-full border-border/50"
                  data-testid={`card-testimonial-${testimonial.id}`}
                >
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-foreground leading-relaxed mb-6 text-base">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback
                        className={`bg-gradient-to-br ${testimonial.color} text-white text-xs font-bold`}
                      >
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
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
