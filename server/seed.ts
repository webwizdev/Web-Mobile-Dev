import { db } from "./db";
import {
  heroContent, stats, services, projects,
  teamMembers, testimonials, blogPosts,
  footerContent, footerLinks,
} from "@shared/schema";

export async function seedDatabase() {
  const [existingHero] = await db.select().from(heroContent);
  if (existingHero) {
    console.log("Database already seeded, skipping.");
    return;
  }

  console.log("Seeding database with default content...");

  await db.insert(heroContent).values({
    badgeText: "Award-Winning Digital Agency",
    titleLine1: "We Craft Digital",
    titleHighlight: "Experiences",
    titleLine3: "That Matter",
    subtitle: "FIO Creatives transforms bold ideas into stunning web and mobile applications. We blend design excellence with cutting-edge technology to deliver products that users love.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "View Our Work",
  });

  await db.insert(stats).values([
    { value: "150+", label: "Projects Delivered", sortOrder: 0 },
    { value: "50+", label: "Happy Clients", sortOrder: 1 },
    { value: "8+", label: "Years Experience", sortOrder: 2 },
    { value: "15+", label: "Team Members", sortOrder: 3 },
  ]);

  await db.insert(services).values([
    { icon: "Globe", title: "Web Development", description: "Custom web applications built with modern frameworks like React, Next.js, and Vue. Scalable, performant, and beautifully crafted.", features: ["Progressive Web Apps", "E-commerce Solutions", "SaaS Platforms"], sortOrder: 0 },
    { icon: "Smartphone", title: "Mobile Development", description: "Native and cross-platform mobile apps for iOS and Android. Seamless experiences that users love to interact with daily.", features: ["React Native", "Flutter", "Native iOS & Android"], sortOrder: 1 },
    { icon: "Palette", title: "UI/UX Design", description: "User-centered design that balances aesthetics with usability. From wireframes to polished interfaces that convert.", features: ["User Research", "Prototyping", "Design Systems"], sortOrder: 2 },
    { icon: "TrendingUp", title: "Digital Strategy", description: "Data-driven strategies to grow your digital presence. We help you reach the right audience with the right message.", features: ["SEO Optimization", "Analytics", "Growth Hacking"], sortOrder: 3 },
    { icon: "Code2", title: "API Development", description: "Robust and scalable APIs that power your applications. RESTful and GraphQL solutions designed for performance.", features: ["REST APIs", "GraphQL", "Microservices"], sortOrder: 4 },
    { icon: "Cloud", title: "Cloud Solutions", description: "Cloud infrastructure setup, migration, and optimization. Reliable hosting that scales with your business needs.", features: ["AWS & GCP", "DevOps", "CI/CD Pipelines"], sortOrder: 5 },
  ]);

  await db.insert(projects).values([
    { title: "Finova Banking", category: "web", description: "A modern fintech platform with real-time dashboards and secure payment processing.", tags: ["React", "Node.js", "PostgreSQL"], gradient: "from-blue-600 to-cyan-500", sortOrder: 0 },
    { title: "HealthPulse", category: "mobile", description: "Health tracking app with AI-powered insights and wearable device integration.", tags: ["React Native", "Python", "ML"], gradient: "from-emerald-500 to-teal-600", sortOrder: 1 },
    { title: "Artisan Marketplace", category: "web", description: "E-commerce platform connecting local artisans with global buyers.", tags: ["Next.js", "Stripe", "AWS"], gradient: "from-orange-500 to-rose-500", sortOrder: 2 },
    { title: "TravelMate", category: "mobile", description: "Travel companion app with smart itinerary planning and offline maps.", tags: ["Flutter", "Firebase", "Google Maps"], gradient: "from-violet-600 to-purple-500", sortOrder: 3 },
    { title: "EduSphere", category: "design", description: "Complete design system and UI/UX overhaul for an online learning platform.", tags: ["Figma", "Design System", "Accessibility"], gradient: "from-pink-500 to-rose-600", sortOrder: 4 },
    { title: "GreenGrid Energy", category: "web", description: "IoT dashboard for monitoring renewable energy installations across facilities.", tags: ["Vue.js", "D3.js", "IoT"], gradient: "from-green-500 to-emerald-600", sortOrder: 5 },
  ]);

  await db.insert(teamMembers).values([
    { name: "Alex Chen", role: "Founder & CEO", initials: "AC", color: "from-blue-500 to-indigo-600", sortOrder: 0 },
    { name: "Sarah Okonkwo", role: "Creative Director", initials: "SO", color: "from-rose-500 to-pink-600", sortOrder: 1 },
    { name: "James Rivera", role: "Lead Developer", initials: "JR", color: "from-emerald-500 to-teal-600", sortOrder: 2 },
    { name: "Maya Patel", role: "UX Lead", initials: "MP", color: "from-violet-500 to-purple-600", sortOrder: 3 },
  ]);

  await db.insert(testimonials).values([
    { quote: "FIO Creatives transformed our outdated platform into a modern, user-friendly experience. Our customer engagement increased by 40% within the first quarter after launch.", name: "Rebecca Torres", role: "CTO", company: "Finova Technologies", initials: "RT", color: "from-blue-500 to-cyan-500", sortOrder: 0 },
    { quote: "Working with FIO was a game-changer for our startup. They didn't just build an app - they became partners in our vision. The quality of their work speaks for itself.", name: "David Kim", role: "Founder", company: "HealthPulse", initials: "DK", color: "from-emerald-500 to-green-600", sortOrder: 1 },
    { quote: "The design system FIO created for us has been transformative. It brought consistency to our product suite and cut our design-to-development time in half.", name: "Amara Osei", role: "VP of Product", company: "EduSphere", initials: "AO", color: "from-violet-500 to-purple-600", sortOrder: 2 },
    { quote: "From day one, the FIO team demonstrated exceptional professionalism and technical expertise. They delivered our IoT dashboard on time and under budget.", name: "Marcus Chen", role: "Director of Engineering", company: "GreenGrid Energy", initials: "MC", color: "from-orange-500 to-red-500", sortOrder: 3 },
  ]);

  await db.insert(blogPosts).values([
    { title: "The Future of Progressive Web Apps in 2025", excerpt: "PWAs are evolving rapidly. Here's how they're changing the way we build for the web and why your next project should consider one.", category: "Engineering", readTime: "5 min read", date: "Feb 20, 2026", gradient: "from-blue-600 to-indigo-600", sortOrder: 0 },
    { title: "Design Systems That Scale: Lessons from 50+ Projects", excerpt: "Building a design system that works across teams and products requires careful planning. We share our approach and key takeaways.", category: "Design", readTime: "8 min read", date: "Feb 12, 2026", gradient: "from-rose-500 to-pink-600", sortOrder: 1 },
    { title: "Why We Switched to React Native for Cross-Platform", excerpt: "After years of native development, our shift to React Native transformed our mobile workflow. Here's the full story.", category: "Mobile", readTime: "6 min read", date: "Jan 28, 2026", gradient: "from-emerald-500 to-teal-600", sortOrder: 2 },
  ]);

  await db.insert(footerContent).values({
    tagline: "Crafting exceptional digital experiences through innovative design and cutting-edge development.",
    copyrightText: "2026 FIO Creatives. All rights reserved.",
    locationText: "Made with passion in San Francisco",
    twitterUrl: "#",
    linkedinUrl: "#",
    instagramUrl: "#",
    githubUrl: "#",
    dribbbleUrl: "#",
  });

  await db.insert(footerLinks).values([
    { section: "services", label: "Web Development", href: "#services", sortOrder: 0 },
    { section: "services", label: "Mobile Development", href: "#services", sortOrder: 1 },
    { section: "services", label: "UI/UX Design", href: "#services", sortOrder: 2 },
    { section: "services", label: "Digital Strategy", href: "#services", sortOrder: 3 },
    { section: "company", label: "About Us", href: "#about", sortOrder: 0 },
    { section: "company", label: "Our Team", href: "#about", sortOrder: 1 },
    { section: "company", label: "Blog", href: "#blog", sortOrder: 2 },
    { section: "company", label: "Careers", href: "#", sortOrder: 3 },
    { section: "support", label: "Contact", href: "#contact", sortOrder: 0 },
    { section: "support", label: "Privacy Policy", href: "#", sortOrder: 1 },
    { section: "support", label: "Terms of Service", href: "#", sortOrder: 2 },
    { section: "support", label: "FAQ", href: "#", sortOrder: 3 },
  ]);

  console.log("Database seeded successfully.");
}
