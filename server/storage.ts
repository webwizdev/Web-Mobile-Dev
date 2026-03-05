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
  type FooterContent, type InsertFooterContent,
  type FooterLink, type InsertFooterLink,
  users, contactMessages, heroContent, stats, services, projects,
  teamMembers, testimonials, blogPosts, footerContent, footerLinks,
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, desc } from "drizzle-orm";

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

  getFooterContent(): Promise<FooterContent>;
  updateFooterContent(data: InsertFooterContent): Promise<FooterContent>;

  getFooterLinks(): Promise<FooterLink[]>;
  createFooterLink(data: InsertFooterLink): Promise<FooterLink>;
  updateFooterLink(id: string, data: Partial<InsertFooterLink>): Promise<FooterLink | undefined>;
  deleteFooterLink(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id)).returning();
    return result.length > 0;
  }

  async getHeroContent(): Promise<HeroContent> {
    const [hero] = await db.select().from(heroContent);
    if (!hero) {
      const [created] = await db.insert(heroContent).values({
        badgeText: "Award-Winning Digital Agency",
        titleLine1: "We Craft Digital",
        titleHighlight: "Experiences",
        titleLine3: "That Matter",
        subtitle: "FIO Creatives transforms bold ideas into stunning web and mobile applications. We blend design excellence with cutting-edge technology to deliver products that users love.",
        ctaPrimary: "Start a Project",
        ctaSecondary: "View Our Work",
      }).returning();
      return created;
    }
    return hero;
  }

  async updateHeroContent(data: InsertHeroContent): Promise<HeroContent> {
    const existing = await this.getHeroContent();
    const [updated] = await db.update(heroContent).set(data).where(eq(heroContent.id, existing.id)).returning();
    return updated;
  }

  async getStats(): Promise<Stat[]> {
    return db.select().from(stats).orderBy(asc(stats.sortOrder));
  }

  async createStat(data: InsertStat): Promise<Stat> {
    const [stat] = await db.insert(stats).values(data).returning();
    return stat;
  }

  async updateStat(id: string, data: Partial<InsertStat>): Promise<Stat | undefined> {
    const [updated] = await db.update(stats).set(data).where(eq(stats.id, id)).returning();
    return updated;
  }

  async deleteStat(id: string): Promise<boolean> {
    const result = await db.delete(stats).where(eq(stats.id, id)).returning();
    return result.length > 0;
  }

  async getServices(): Promise<Service[]> {
    return db.select().from(services).orderBy(asc(services.sortOrder));
  }

  async createService(data: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(data).returning();
    return service;
  }

  async updateService(id: string, data: Partial<InsertService>): Promise<Service | undefined> {
    const [updated] = await db.update(services).set(data).where(eq(services.id, id)).returning();
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }

  async getProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(asc(projects.sortOrder));
  }

  async createProject(data: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(data).returning();
    return project;
  }

  async updateProject(id: string, data: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder));
  }

  async createTeamMember(data: InsertTeamMember): Promise<TeamMember> {
    const [member] = await db.insert(teamMembers).values(data).returning();
    return member;
  }

  async updateTeamMember(id: string, data: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const [updated] = await db.update(teamMembers).set(data).where(eq(teamMembers.id, id)).returning();
    return updated;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    const result = await db.delete(teamMembers).where(eq(teamMembers.id, id)).returning();
    return result.length > 0;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  }

  async createTestimonial(data: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(data).returning();
    return testimonial;
  }

  async updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db.update(testimonials).set(data).where(eq(testimonials.id, id)).returning();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    return result.length > 0;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(asc(blogPosts.sortOrder));
  }

  async createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(data).returning();
    return post;
  }

  async updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts).set(data).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getFooterContent(): Promise<FooterContent> {
    const [footer] = await db.select().from(footerContent);
    if (!footer) {
      const [created] = await db.insert(footerContent).values({
        tagline: "Crafting exceptional digital experiences through innovative design and cutting-edge development.",
        copyrightText: "2026 FIO Creatives. All rights reserved.",
        locationText: "Made with passion in San Francisco",
        twitterUrl: "#",
        linkedinUrl: "#",
        instagramUrl: "#",
        githubUrl: "#",
        dribbbleUrl: "#",
      }).returning();
      return created;
    }
    return footer;
  }

  async updateFooterContent(data: InsertFooterContent): Promise<FooterContent> {
    const existing = await this.getFooterContent();
    const [updated] = await db.update(footerContent).set(data).where(eq(footerContent.id, existing.id)).returning();
    return updated;
  }

  async getFooterLinks(): Promise<FooterLink[]> {
    return db.select().from(footerLinks).orderBy(asc(footerLinks.section), asc(footerLinks.sortOrder));
  }

  async createFooterLink(data: InsertFooterLink): Promise<FooterLink> {
    const [link] = await db.insert(footerLinks).values(data).returning();
    return link;
  }

  async updateFooterLink(id: string, data: Partial<InsertFooterLink>): Promise<FooterLink | undefined> {
    const [updated] = await db.update(footerLinks).set(data).where(eq(footerLinks.id, id)).returning();
    return updated;
  }

  async deleteFooterLink(id: string): Promise<boolean> {
    const result = await db.delete(footerLinks).where(eq(footerLinks.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
