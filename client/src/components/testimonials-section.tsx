import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "FIO Creatives transformed our outdated platform into a modern, user-friendly experience. Our customer engagement increased by 40% within the first quarter after launch.",
    name: "Rebecca Torres",
    role: "CTO",
    company: "Finova Technologies",
    initials: "RT",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "Working with FIO was a game-changer for our startup. They didn't just build an app - they became partners in our vision. The quality of their work speaks for itself.",
    name: "David Kim",
    role: "Founder",
    company: "HealthPulse",
    initials: "DK",
    color: "from-emerald-500 to-green-600",
  },
  {
    quote:
      "The design system FIO created for us has been transformative. It brought consistency to our product suite and cut our design-to-development time in half.",
    name: "Amara Osei",
    role: "VP of Product",
    company: "EduSphere",
    initials: "AO",
    color: "from-violet-500 to-purple-600",
  },
  {
    quote:
      "From day one, the FIO team demonstrated exceptional professionalism and technical expertise. They delivered our IoT dashboard on time and under budget.",
    name: "Marcus Chen",
    role: "Director of Engineering",
    company: "GreenGrid Energy",
    initials: "MC",
    color: "from-orange-500 to-red-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TestimonialsSection() {
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

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card
                className="p-6 lg:p-8 h-full border-border/50"
                data-testid={`card-testimonial-${testimonial.name.toLowerCase().replace(/\s+/g, "-")}`}
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
      </div>
    </section>
  );
}
