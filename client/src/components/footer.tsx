import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Linkedin, Twitter, Instagram } from "lucide-react";
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

  const renderLinkColumn = (title: string, items: FooterLink[]) => (
    <div>
      <h4 className="font-semibold text-foreground mb-4 text-sm">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollToSection(link.href)}
              className="text-sm text-muted-foreground transition-colors"
              data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer
      className="border-t border-border bg-background"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs tracking-tight">
                  FIO
                </span>
              </div>
              <span className="font-bold text-foreground">Creatives</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              {content?.tagline || "Crafting exceptional digital experiences through innovative design and cutting-edge development."}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover-elevate transition-all"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {renderLinkColumn("Services", serviceLinks)}
          {renderLinkColumn("Company", companyLinks)}
          {renderLinkColumn("Support", supportLinks)}
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-sm text-muted-foreground"
            data-testid="text-copyright"
          >
            {content?.copyrightText || "2026 FIO Creatives. All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy Policy
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            {content?.locationText || "Made with passion in San Francisco"}
          </p>
        </div>
      </div>
    </footer>
  );
}
