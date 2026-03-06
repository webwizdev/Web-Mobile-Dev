import { useQuery } from "@tanstack/react-query";
import { Linkedin, Twitter, Instagram, ArrowUpRight, Heart } from "lucide-react";
import { SiGithub, SiDribbble } from "react-icons/si";
import type { FooterContent, FooterLink } from "@shared/schema";

interface FooterData {
  content: FooterContent;
  links: FooterLink[];
}

export function Footer() {
  const { data } = useQuery<FooterData>({ queryKey: ["/api/footer"] });

  const content = data?.content;
  const links = data?.links || [];

  const serviceLinks = links.filter((l) => l.section === "services");
  const companyLinks = links.filter((l) => l.section === "company");
  const supportLinks = links.filter((l) => l.section === "support");

  const socialLinks = [
    { icon: Twitter, href: content?.twitterUrl || "#", label: "Twitter" },
    { icon: Linkedin, href: content?.linkedinUrl || "#", label: "LinkedIn" },
    { icon: Instagram, href: content?.instagramUrl || "#", label: "Instagram" },
    { icon: SiGithub, href: content?.githubUrl || "#", label: "GitHub" },
    { icon: SiDribbble, href: content?.dribbbleUrl || "#", label: "Dribbble" },
  ];

  const scrollToSection = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderLinkColumn = (title: string, items: FooterLink[]) => (
    <div>
      <h4 className="font-semibold text-foreground mb-5 text-xs uppercase tracking-widest">{title}</h4>
      <ul className="space-y-3">
        {items.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollToSection(link.href)}
              className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer
      className="relative overflow-hidden bg-muted/40 dark:bg-background"
      data-testid="footer"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-0 w-80 h-80 bg-chart-2/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              <div className="lg:col-span-4 space-y-6">
                <button onClick={scrollToTop} className="flex items-center gap-2.5 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                    <span className="text-white font-bold text-sm tracking-tight">FIO</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl tracking-tight text-foreground">
                      FIO Creatives
                    </span>
                  </div>
                </button>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  {content?.tagline || "Crafting exceptional digital experiences through innovative design and cutting-edge development."}
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href !== "#" ? "_blank" : undefined}
                      rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground bg-background dark:bg-muted/60 border border-border/60 hover:border-primary/40 hover:text-primary hover:shadow-sm transition-all duration-200"
                      data-testid={`link-social-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
                  {renderLinkColumn("Services", serviceLinks)}
                  {renderLinkColumn("Company", companyLinks)}
                  {renderLinkColumn("Support", supportLinks)}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-xs text-muted-foreground/70"
              data-testid="text-copyright"
            >
              © {content?.copyrightText || "2026 FIO Creatives. All rights reserved."}
            </p>
            <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
              {content?.locationText || "Made with"} <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
