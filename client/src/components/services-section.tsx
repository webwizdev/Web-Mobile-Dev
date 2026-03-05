import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Code2,
  Cloud,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom web applications built with modern frameworks like React, Next.js, and Vue. Scalable, performant, and beautifully crafted.",
    features: ["Progressive Web Apps", "E-commerce Solutions", "SaaS Platforms"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android. Seamless experiences that users love to interact with daily.",
    features: ["React Native", "Flutter", "Native iOS & Android"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that balances aesthetics with usability. From wireframes to polished interfaces that convert.",
    features: ["User Research", "Prototyping", "Design Systems"],
  },
  {
    icon: TrendingUp,
    title: "Digital Strategy",
    description:
      "Data-driven strategies to grow your digital presence. We help you reach the right audience with the right message.",
    features: ["SEO Optimization", "Analytics", "Growth Hacking"],
  },
  {
    icon: Code2,
    title: "API Development",
    description:
      "Robust and scalable APIs that power your applications. RESTful and GraphQL solutions designed for performance.",
    features: ["REST APIs", "GraphQL", "Microservices"],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Cloud infrastructure setup, migration, and optimization. Reliable hosting that scales with your business needs.",
    features: ["AWS & GCP", "DevOps", "CI/CD Pipelines"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-primary tracking-wide uppercase">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Services We Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From concept to launch, we provide end-to-end digital solutions
            tailored to your business goals.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card
                className="p-6 h-full border-border/50 hover-elevate transition-all duration-300 group"
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
