# FIO Creatives - Portfolio Website

## Overview
A professional portfolio/showcase website for FIO Creatives, a web and mobile app development agency. Single-page scrolling design with smooth animations and dark mode support. Includes a full admin panel for managing all site content.

## Architecture
- **Frontend**: React SPA with Vite, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Express.js API server with session-based admin auth
- **Routing**: wouter for frontend, Express for API routes
- **Styling**: Tailwind CSS with CSS variables for theming, Plus Jakarta Sans font
- **Animations**: Framer Motion for scroll-triggered animations
- **Storage**: In-memory (MemStorage) with seed data

## Key Sections (Public Site)
1. **Navigation** - Sticky nav with logo, links, dark mode toggle, mobile hamburger
2. **Hero** - Full-viewport with gradient background, stats, CTAs (API-driven)
3. **Services** - Service cards with icons and features (API-driven)
4. **Portfolio** - Filterable project gallery with gradient cards (API-driven)
5. **About/Team** - Agency story, stats grid, team member cards (API-driven)
6. **Testimonials** - Client testimonial cards (API-driven)
7. **Blog** - Blog post preview cards (API-driven)
8. **Contact** - Form with validation + contact info cards
9. **Footer** - Links, social icons, copyright

## Admin Panel (/admin)
- **Login**: admin / fio2026
- **Sections**: Hero, Stats, Services, Portfolio, Team, Testimonials, Blog, Messages
- **Features**: Full CRUD (create, read, update, delete) for all content types
- **UI**: Tabbed interface with dialog-based editing forms

## API Routes
### Public
- `GET /api/hero` - Get hero content
- `GET /api/stats` - Get hero stats
- `GET /api/services` - Get services
- `GET /api/projects` - Get portfolio projects
- `GET /api/team` - Get team members
- `GET /api/testimonials` - Get testimonials
- `GET /api/blog` - Get blog posts
- `POST /api/contact` - Submit contact form

### Admin (requires session auth)
- `POST /api/admin/login` - Login
- `POST /api/admin/logout` - Logout
- `GET /api/admin/me` - Check auth status
- `PUT /api/hero` - Update hero
- `POST/PATCH/DELETE /api/stats/:id` - CRUD stats
- `POST/PATCH/DELETE /api/services/:id` - CRUD services
- `POST/PATCH/DELETE /api/projects/:id` - CRUD projects
- `POST/PATCH/DELETE /api/team/:id` - CRUD team members
- `POST/PATCH/DELETE /api/testimonials/:id` - CRUD testimonials
- `POST/PATCH/DELETE /api/blog/:id` - CRUD blog posts
- `GET/DELETE /api/messages/:id` - View/delete contact messages

## Data Types (shared/schema.ts)
- HeroContent, Stat, Service, Project, TeamMember, Testimonial, BlogPost, ContactMessage

## File Structure
- `client/src/pages/home.tsx` - Main landing page
- `client/src/pages/admin.tsx` - Admin panel (login + dashboard)
- `client/src/components/navigation.tsx` - Sticky navigation
- `client/src/components/hero-section.tsx` - Hero section (API-driven)
- `client/src/components/services-section.tsx` - Services grid (API-driven)
- `client/src/components/portfolio-section.tsx` - Filterable portfolio (API-driven)
- `client/src/components/about-section.tsx` - About + team (API-driven)
- `client/src/components/testimonials-section.tsx` - Testimonials (API-driven)
- `client/src/components/blog-section.tsx` - Blog posts (API-driven)
- `client/src/components/contact-section.tsx` - Contact form
- `client/src/components/footer.tsx` - Footer
- `server/routes.ts` - All API endpoints + admin auth middleware
- `server/storage.ts` - In-memory storage with CRUD + seed data
- `shared/schema.ts` - Zod schemas and TypeScript types

## Running
- `npm run dev` starts both frontend (Vite) and backend (Express) on the same port
