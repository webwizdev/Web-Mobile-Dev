import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const heroContent = pgTable("hero_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  badgeText: text("badge_text").notNull(),
  titleLine1: text("title_line_1").notNull(),
  titleHighlight: text("title_highlight").notNull(),
  titleLine3: text("title_line_3").notNull(),
  subtitle: text("subtitle").notNull(),
  ctaPrimary: text("cta_primary").notNull(),
  ctaSecondary: text("cta_secondary").notNull(),
});

export const stats = pgTable("stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  value: text("value").notNull(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  tags: text("tags").array().notNull(),
  gradient: text("gradient").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  initials: text("initials").notNull(),
  color: text("color").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  initials: text("initials").notNull(),
  color: text("color").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  readTime: text("read_time").notNull(),
  date: text("date").notNull(),
  gradient: text("gradient").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const footerContent = pgTable("footer_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tagline: text("tagline").notNull(),
  copyrightText: text("copyright_text").notNull(),
  locationText: text("location_text").notNull(),
  twitterUrl: text("twitter_url").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
  instagramUrl: text("instagram_url").notNull(),
  githubUrl: text("github_url").notNull(),
  dribbbleUrl: text("dribbble_url").notNull(),
});

export const footerLinks = pgTable("footer_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: text("section").notNull(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const contactInfo = pgTable("contact_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sectionLabel: text("section_label").notNull(),
  sectionTitle: text("section_title").notNull(),
  sectionSubtitle: text("section_subtitle").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  ctaTitle: text("cta_title").notNull(),
  ctaDescription: text("cta_description").notNull(),
  ctaButtonText: text("cta_button_text").notNull(),
  ctaButtonUrl: text("cta_button_url").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  company: true,
  service: true,
  message: true,
});

export const insertHeroContentSchema = createInsertSchema(heroContent).omit({ id: true });
export const insertStatSchema = createInsertSchema(stats).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });
export const insertFooterContentSchema = createInsertSchema(footerContent).omit({ id: true });
export const insertFooterLinkSchema = createInsertSchema(footerLinks).omit({ id: true });
export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type HeroContent = typeof heroContent.$inferSelect;
export type InsertHeroContent = z.infer<typeof insertHeroContentSchema>;
export type Stat = typeof stats.$inferSelect;
export type InsertStat = z.infer<typeof insertStatSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type FooterContent = typeof footerContent.$inferSelect;
export type InsertFooterContent = z.infer<typeof insertFooterContentSchema>;
export type FooterLink = typeof footerLinks.$inferSelect;
export type InsertFooterLink = z.infer<typeof insertFooterLinkSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;

export const sectionVisibility = pgTable("section_visibility", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sectionKey: text("section_key").notNull().unique(),
  label: text("label").notNull(),
  visible: boolean("visible").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertSectionVisibilitySchema = createInsertSchema(sectionVisibility).omit({ id: true });
export type SectionVisibility = typeof sectionVisibility.$inferSelect;
export type InsertSectionVisibility = z.infer<typeof insertSectionVisibilitySchema>;
