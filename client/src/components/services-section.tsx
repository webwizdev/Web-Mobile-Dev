import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Code2,
  Cloud,
  Layers,
  Monitor,
  Cpu,
  Database,
  Shield,
  Zap,
  Target,
  BarChart,
  Settings,
  Search,
  Users,
  Mail,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Globe, Smartphone, Palette, TrendingUp, Code2, Cloud,
  Layers, Monitor, Cpu, Database, Shield, Zap,
  Target, BarChart, Settings, Search, Users, Mail,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  const { data: services, isLoading } = useQuery<Service[]>({ queryKey: ["/api/services"] });

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

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6 border-border/50">
                <Skeleton className="w-12 h-12 rounded-md mb-5" />
                <Skeleton className="h-6 w-40 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services?.map((service) => {
              const IconComp = iconMap[service.icon] || Globe;
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Card
                    className="p-6 h-full border-border/50 hover-elevate transition-all duration-300 group"
                    data-testid={`card-service-${service.id}`}
                  >
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                      <IconComp className="w-6 h-6 text-primary" />
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
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
