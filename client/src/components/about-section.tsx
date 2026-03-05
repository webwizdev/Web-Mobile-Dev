import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Twitter } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@shared/schema";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function AboutSection() {
  const { data: team, isLoading } = useQuery<TeamMember[]>({ queryKey: ["/api/team"] });

  return (
    <section id="about" className="py-24 lg:py-32" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              Passionate About Building the Future
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2017, FIO Creatives started with a simple mission: to
                help businesses thrive in the digital age through exceptional
                design and engineering. What began as a small team of three has
                grown into a dynamic studio of 15+ talented professionals.
              </p>
              <p>
                We believe great software is born from the intersection of
                beautiful design, robust engineering, and deep understanding of
                user needs. Every project we take on is an opportunity to push
                boundaries and deliver something truly remarkable.
              </p>
              <p>
                Our collaborative approach means we work closely with our
                clients at every stage, ensuring that the final product not only
                meets expectations but exceeds them. From startups to
                enterprises, we bring the same level of dedication and craft.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "98%", label: "Client Satisfaction", desc: "Based on project feedback" },
              { value: "2x", label: "Faster Delivery", desc: "Compared to industry average" },
              { value: "24/7", label: "Support Available", desc: "For all active projects" },
              { value: "40+", label: "Technologies", desc: "In our tech stack" },
            ].map((item) => (
              <Card
                key={item.label}
                className="p-5 border-border/50 text-center"
                data-testid={`card-stat-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="text-2xl font-bold text-primary mb-1">{item.value}</div>
                <div className="text-sm font-semibold text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
              </Card>
            ))}
          </motion.div>
        </div>

        <div>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Meet Our Team
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The talented people behind FIO Creatives who make the magic happen.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-6 text-center border-border/50">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-5 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {team?.map((member) => (
                <motion.div key={member.id} variants={itemVariants}>
                  <Card
                    className="p-6 text-center border-border/50 hover-elevate transition-all duration-300 group"
                    data-testid={`card-team-${member.id}`}
                  >
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback
                        className={`bg-gradient-to-br ${member.color} text-white text-lg font-bold`}
                      >
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold text-foreground text-lg">{member.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">{member.role}</p>
                    <div className="flex justify-center gap-3">
                      <a href="#" className="text-muted-foreground transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="text-muted-foreground transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" className="text-muted-foreground transition-colors">
                        <SiGithub className="w-4 h-4" />
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
