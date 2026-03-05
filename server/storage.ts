import {
  type User, type InsertUser,
  type ContactMessage, type InsertContactMessage,
  type HeroContent, type InsertHeroContent,
  type Stat, type InsertStat,
  type Service, type InsertService,
  type Project, type InsertProject,
  type TeamMember, type InsertTeamMember,
  type Testimonial, type InsertTestimonial,
  type BlogPost, type InsertBlogPost,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  deleteContactMessage(id: string): Promise<boolean>;

  getHeroContent(): Promise<HeroContent>;
  updateHeroContent(data: InsertHeroContent): Promise<HeroContent>;

  getStats(): Promise<Stat[]>;
  createStat(data: InsertStat): Promise<Stat>;
  updateStat(id: string, data: Partial<InsertStat>): Promise<Stat | undefined>;
  deleteStat(id: string): Promise<boolean>;

  getServices(): Promise<Service[]>;
  createService(data: InsertService): Promise<Service>;
  updateService(id: string, data: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  getProjects(): Promise<Project[]>;
  createProject(data: InsertProject): Promise<Project>;
  updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(data: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, data: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;

  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(data: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  getBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(data: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private heroContent: HeroContent;
  private stats: Map<string, Stat>;
  private services: Map<string, Service>;
  private projects: Map<string, Project>;
  private teamMembers: Map<string, TeamMember>;
  private testimonials: Map<string, Testimonial>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.stats = new Map();
    this.services = new Map();
    this.projects = new Map();
    this.teamMembers = new Map();
    this.testimonials = new Map();
    this.blogPosts = new Map();

    this.heroContent = {
      id: "hero-1",
      badgeText: "Award-Winning Digital Agency",
      titleLine1: "We Craft Digital",
      titleHighlight: "Experiences",
      titleLine3: "That Matter",
      subtitle: "FIO Creatives transforms bold ideas into stunning web and mobile applications. We blend design excellence with cutting-edge technology to deliver products that users love.",
      ctaPrimary: "Start a Project",
      ctaSecondary: "View Our Work",
    };

    this.seed();
  }

  private seed() {
    const defaultStats: InsertStat[] = [
      { value: "150+", label: "Projects Delivered", sortOrder: 0 },
      { value: "50+", label: "Happy Clients", sortOrder: 1 },
      { value: "8+", label: "Years Experience", sortOrder: 2 },
      { value: "15+", label: "Team Members", sortOrder: 3 },
    ];
    defaultStats.forEach((s) => {
      const id = randomUUID();
      this.stats.set(id, { ...s, id });
    });

    const defaultServices: InsertService[] = [
      { icon: "Globe", title: "Web Development", description: "Custom web applications built with modern frameworks like React, Next.js, and Vue. Scalable, performant, and beautifully crafted.", features: ["Progressive Web Apps", "E-commerce Solutions", "SaaS Platforms"], sortOrder: 0 },
      { icon: "Smartphone", title: "Mobile Development", description: "Native and cross-platform mobile apps for iOS and Android. Seamless experiences that users love to interact with daily.", features: ["React Native", "Flutter", "Native iOS & Android"], sortOrder: 1 },
      { icon: "Palette", title: "UI/UX Design", description: "User-centered design that balances aesthetics with usability. From wireframes to polished interfaces that convert.", features: ["User Research", "Prototyping", "Design Systems"], sortOrder: 2 },
      { icon: "TrendingUp", title: "Digital Strategy", description: "Data-driven strategies to grow your digital presence. We help you reach the right audience with the right message.", features: ["SEO Optimization", "Analytics", "Growth Hacking"], sortOrder: 3 },
      { icon: "Code2", title: "API Development", description: "Robust and scalable APIs that power your applications. RESTful and GraphQL solutions designed for performance.", features: ["REST APIs", "GraphQL", "Microservices"], sortOrder: 4 },
      { icon: "Cloud", title: "Cloud Solutions", description: "Cloud infrastructure setup, migration, and optimization. Reliable hosting that scales with your business needs.", features: ["AWS & GCP", "DevOps", "CI/CD Pipelines"], sortOrder: 5 },
    ];
    defaultServices.forEach((s) => {
      const id = randomUUID();
      this.services.set(id, { ...s, id });
    });

    const defaultProjects: InsertProject[] = [
      { title: "Finova Banking", category: "web", description: "A modern fintech platform with real-time dashboards and secure payment processing.", tags: ["React", "Node.js", "PostgreSQL"], gradient: "from-blue-600 to-cyan-500", sortOrder: 0 },
      { title: "HealthPulse", category: "mobile", description: "Health tracking app with AI-powered insights and wearable device integration.", tags: ["React Native", "Python", "ML"], gradient: "from-emerald-500 to-teal-600", sortOrder: 1 },
      { title: "Artisan Marketplace", category: "web", description: "E-commerce platform connecting local artisans with global buyers.", tags: ["Next.js", "Stripe", "AWS"], gradient: "from-orange-500 to-rose-500", sortOrder: 2 },
      { title: "TravelMate", category: "mobile", description: "Travel companion app with smart itinerary planning and offline maps.", tags: ["Flutter", "Firebase", "Google Maps"], gradient: "from-violet-600 to-purple-500", sortOrder: 3 },
      { title: "EduSphere", category: "design", description: "Complete design system and UI/UX overhaul for an online learning platform.", tags: ["Figma", "Design System", "Accessibility"], gradient: "from-pink-500 to-rose-600", sortOrder: 4 },
      { title: "GreenGrid Energy", category: "web", description: "IoT dashboard for monitoring renewable energy installations across facilities.", tags: ["Vue.js", "D3.js", "IoT"], gradient: "from-green-500 to-emerald-600", sortOrder: 5 },
    ];
    defaultProjects.forEach((p) => {
      const id = randomUUID();
      this.projects.set(id, { ...p, id });
    });

    const defaultTeam: InsertTeamMember[] = [
      { name: "Alex Chen", role: "Founder & CEO", initials: "AC", color: "from-blue-500 to-indigo-600", sortOrder: 0 },
      { name: "Sarah Okonkwo", role: "Creative Director", initials: "SO", color: "from-rose-500 to-pink-600", sortOrder: 1 },
      { name: "James Rivera", role: "Lead Developer", initials: "JR", color: "from-emerald-500 to-teal-600", sortOrder: 2 },
      { name: "Maya Patel", role: "UX Lead", initials: "MP", color: "from-violet-500 to-purple-600", sortOrder: 3 },
    ];
    defaultTeam.forEach((t) => {
      const id = randomUUID();
      this.teamMembers.set(id, { ...t, id });
    });

    const defaultTestimonials: InsertTestimonial[] = [
      { quote: "FIO Creatives transformed our outdated platform into a modern, user-friendly experience. Our customer engagement increased by 40% within the first quarter after launch.", name: "Rebecca Torres", role: "CTO", company: "Finova Technologies", initials: "RT", color: "from-blue-500 to-cyan-500", sortOrder: 0 },
      { quote: "Working with FIO was a game-changer for our startup. They didn't just build an app - they became partners in our vision. The quality of their work speaks for itself.", name: "David Kim", role: "Founder", company: "HealthPulse", initials: "DK", color: "from-emerald-500 to-green-600", sortOrder: 1 },
      { quote: "The design system FIO created for us has been transformative. It brought consistency to our product suite and cut our design-to-development time in half.", name: "Amara Osei", role: "VP of Product", company: "EduSphere", initials: "AO", color: "from-violet-500 to-purple-600", sortOrder: 2 },
      { quote: "From day one, the FIO team demonstrated exceptional professionalism and technical expertise. They delivered our IoT dashboard on time and under budget.", name: "Marcus Chen", role: "Director of Engineering", company: "GreenGrid Energy", initials: "MC", color: "from-orange-500 to-red-500", sortOrder: 3 },
    ];
    defaultTestimonials.forEach((t) => {
      const id = randomUUID();
      this.testimonials.set(id, { ...t, id });
    });

    const defaultBlogPosts: InsertBlogPost[] = [
      { title: "The Future of Progressive Web Apps in 2025", excerpt: "PWAs are evolving rapidly. Here's how they're changing the way we build for the web and why your next project should consider one.", category: "Engineering", readTime: "5 min read", date: "Feb 20, 2026", gradient: "from-blue-600 to-indigo-600", sortOrder: 0 },
      { title: "Design Systems That Scale: Lessons from 50+ Projects", excerpt: "Building a design system that works across teams and products requires careful planning. We share our approach and key takeaways.", category: "Design", readTime: "8 min read", date: "Feb 12, 2026", gradient: "from-rose-500 to-pink-600", sortOrder: 1 },
      { title: "Why We Switched to React Native for Cross-Platform", excerpt: "After years of native development, our shift to React Native transformed our mobile workflow. Here's the full story.", category: "Mobile", readTime: "6 min read", date: "Jan 28, 2026", gradient: "from-emerald-500 to-teal-600", sortOrder: 2 },
    ];
    defaultBlogPosts.forEach((b) => {
      const id = randomUUID();
      this.blogPosts.set(id, { ...b, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id, company: insertMessage.company || null, service: insertMessage.service || null, createdAt: new Date() };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    return this.contactMessages.delete(id);
  }

  async getHeroContent(): Promise<HeroContent> {
    return this.heroContent;
  }

  async updateHeroContent(data: InsertHeroContent): Promise<HeroContent> {
    this.heroContent = { ...this.heroContent, ...data };
    return this.heroContent;
  }

  async getStats(): Promise<Stat[]> {
    return Array.from(this.stats.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async createStat(data: InsertStat): Promise<Stat> {
    const id = randomUUID();
    const stat: Stat = { ...data, id };
    this.stats.set(id, stat);
    return stat;
  }

  async updateStat(id: string, data: Partial<InsertStat>): Promise<Stat | undefined> {
    const existing = this.stats.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    this.stats.set(id, updated);
    return updated;
  }

  async deleteStat(id: string): Promise<boolean> {
    return this.stats.delete(id);
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async createService(data: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { ...data, id };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, data: Partial<InsertService>): Promise<Service | undefined> {
    const existing = this.services.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async createProject(data: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...data, id };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async createTeamMember(data: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = { ...data, id };
    this.teamMembers.set(id, member);
    return member;
  }

  async updateTeamMember(id: string, data: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existing = this.teamMembers.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    this.teamMembers.set(id, updated);
    return updated;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    return this.teamMembers.delete(id);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async createTestimonial(data: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...data, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const existing = this.testimonials.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { ...data, id };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
