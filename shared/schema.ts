import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export const heroContentSchema = z.object({
  id: z.string(),
  badgeText: z.string(),
  titleLine1: z.string(),
  titleHighlight: z.string(),
  titleLine3: z.string(),
  subtitle: z.string(),
  ctaPrimary: z.string(),
  ctaSecondary: z.string(),
});
export const insertHeroContentSchema = heroContentSchema.omit({ id: true });
export type HeroContent = z.infer<typeof heroContentSchema>;
export type InsertHeroContent = z.infer<typeof insertHeroContentSchema>;

export const statSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  sortOrder: z.number(),
});
export const insertStatSchema = statSchema.omit({ id: true });
export type Stat = z.infer<typeof statSchema>;
export type InsertStat = z.infer<typeof insertStatSchema>;

export const serviceSchema = z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  sortOrder: z.number(),
});
export const insertServiceSchema = serviceSchema.omit({ id: true });
export type Service = z.infer<typeof serviceSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  gradient: z.string(),
  sortOrder: z.number(),
});
export const insertProjectSchema = projectSchema.omit({ id: true });
export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  initials: z.string(),
  color: z.string(),
  sortOrder: z.number(),
});
export const insertTeamMemberSchema = teamMemberSchema.omit({ id: true });
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export const testimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string(),
  initials: z.string(),
  color: z.string(),
  sortOrder: z.number(),
});
export const insertTestimonialSchema = testimonialSchema.omit({ id: true });
export type Testimonial = z.infer<typeof testimonialSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  readTime: z.string(),
  date: z.string(),
  gradient: z.string(),
  sortOrder: z.number(),
});
export const insertBlogPostSchema = blogPostSchema.omit({ id: true });
export type BlogPost = z.infer<typeof blogPostSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
