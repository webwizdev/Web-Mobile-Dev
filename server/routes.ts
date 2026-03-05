import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import MemoryStore from "memorystore";
import { storage } from "./storage";
import {
  insertContactMessageSchema,
  insertHeroContentSchema,
  insertStatSchema,
  insertServiceSchema,
  insertProjectSchema,
  insertTeamMemberSchema,
  insertTestimonialSchema,
  insertBlogPostSchema,
} from "@shared/schema";
import { ZodError } from "zod";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "fio2026";

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const SessionStore = MemoryStore(session);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "fio-creatives-dev-key",
      resave: false,
      saveUninitialized: false,
      store: new SessionStore({ checkPeriod: 86400000 }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      },
    })
  );

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      return res.json({ success: true });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ isAdmin: !!req.session.isAdmin });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(parsed);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  app.get("/api/hero", async (_req, res) => {
    res.json(await storage.getHeroContent());
  });

  app.put("/api/hero", requireAdmin, async (req, res) => {
    try {
      const parsed = insertHeroContentSchema.parse(req.body);
      res.json(await storage.updateHeroContent(parsed));
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to update" });
    }
  });

  app.get("/api/stats", async (_req, res) => {
    res.json(await storage.getStats());
  });

  app.post("/api/stats", requireAdmin, async (req, res) => {
    try {
      const parsed = insertStatSchema.parse(req.body);
      res.status(201).json(await storage.createStat(parsed));
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to create" });
    }
  });

  app.patch("/api/stats/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertStatSchema.partial().parse(req.body);
      const result = await storage.updateStat(req.params.id, parsed);
      if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to update" });
    }
  });

  app.delete("/api/stats/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteStat(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  });

  app.get("/api/services", async (_req, res) => {
    res.json(await storage.getServices());
  });

  app.post("/api/services", requireAdmin, async (req, res) => {
    try {
      const parsed = insertServiceSchema.parse(req.body);
      res.status(201).json(await storage.createService(parsed));
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to create" });
    }
  });

  app.patch("/api/services/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertServiceSchema.partial().parse(req.body);
      const result = await storage.updateService(req.params.id, parsed);
      if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to update" });
    }
  });

  app.delete("/api/services/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteService(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  });

  app.get("/api/projects", async (_req, res) => {
    res.json(await storage.getProjects());
  });

  app.post("/api/projects", requireAdmin, async (req, res) => {
    try {
      const parsed = insertProjectSchema.parse(req.body);
      res.status(201).json(await storage.createProject(parsed));
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to create" });
    }
  });

  app.patch("/api/projects/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertProjectSchema.partial().parse(req.body);
      const result = await storage.updateProject(req.params.id, parsed);
      if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to update" });
    }
  });

  app.delete("/api/projects/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  });

  app.get("/api/team", async (_req, res) => {
    res.json(await storage.getTeamMembers());
  });

  app.post("/api/team", requireAdmin, async (req, res) => {
    try {
      const parsed = insertTeamMemberSchema.parse(req.body);
      res.status(201).json(await storage.createTeamMember(parsed));
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to create" });
    }
  });

  app.patch("/api/team/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertTeamMemberSchema.partial().parse(req.body);
      const result = await storage.updateTeamMember(req.params.id, parsed);
      if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to update" });
    }
  });

  app.delete("/api/team/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteTeamMember(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  });

  app.get("/api/testimonials", async (_req, res) => {
    res.json(await storage.getTestimonials());
  });

  app.post("/api/testimonials", requireAdmin, async (req, res) => {
    try {
      const parsed = insertTestimonialSchema.parse(req.body);
      res.status(201).json(await storage.createTestimonial(parsed));
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to create" });
    }
  });

  app.patch("/api/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertTestimonialSchema.partial().parse(req.body);
      const result = await storage.updateTestimonial(req.params.id, parsed);
      if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to update" });
    }
  });

  app.delete("/api/testimonials/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteTestimonial(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  });

  app.get("/api/blog", async (_req, res) => {
    res.json(await storage.getBlogPosts());
  });

  app.post("/api/blog", requireAdmin, async (req, res) => {
    try {
      const parsed = insertBlogPostSchema.parse(req.body);
      res.status(201).json(await storage.createBlogPost(parsed));
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to create" });
    }
  });

  app.patch("/api/blog/:id", requireAdmin, async (req, res) => {
    try {
      const parsed = insertBlogPostSchema.partial().parse(req.body);
      const result = await storage.updateBlogPost(req.params.id, parsed);
      if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) res.status(400).json({ message: "Invalid data" });
      else res.status(500).json({ message: "Failed to update" });
    }
  });

  app.delete("/api/blog/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteBlogPost(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  });

  app.get("/api/messages", requireAdmin, async (_req, res) => {
    res.json(await storage.getContactMessages());
  });

  app.delete("/api/messages/:id", requireAdmin, async (req, res) => {
    const deleted = await storage.deleteContactMessage(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  });

  return httpServer;
}
