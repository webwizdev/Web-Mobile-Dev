# FIO Creatives - Portfolio Website

## Overview
A professional portfolio/showcase website for FIO Creatives, a web and mobile app development agency. Single-page scrolling design with smooth animations and dark mode support.

## Architecture
- **Frontend**: React SPA with Vite, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Express.js API server
- **Routing**: wouter for frontend, Express for API routes
- **Styling**: Tailwind CSS with CSS variables for theming, Plus Jakarta Sans font
- **Animations**: Framer Motion for scroll-triggered animations

## Key Sections
1. **Navigation** - Sticky nav with logo, links, dark mode toggle, mobile hamburger
2. **Hero** - Full-viewport with gradient background, stats, CTAs
3. **Services** - 6 service cards (Web, Mobile, UI/UX, Digital Strategy, API, Cloud)
4. **Portfolio** - Filterable project gallery (All/Web/Mobile/Design) with 6 placeholder projects
5. **About/Team** - Agency story, stats grid, 4 team member cards
6. **Testimonials** - 4 client testimonial cards
7. **Blog** - 3 blog post preview cards
8. **Contact** - Form with name, email, company, service select, message + contact info cards
9. **Footer** - Links, social icons, copyright

## API Routes
- `POST /api/contact` - Submit contact form message (validated with Zod)

## Data
- Contact form submissions stored in memory (MemStorage)
- All portfolio, team, testimonial, and blog content is hardcoded placeholder data

## File Structure
- `client/src/pages/home.tsx` - Main landing page
- `client/src/components/navigation.tsx` - Sticky navigation
- `client/src/components/hero-section.tsx` - Hero section
- `client/src/components/services-section.tsx` - Services grid
- `client/src/components/portfolio-section.tsx` - Filterable portfolio
- `client/src/components/about-section.tsx` - About + team
- `client/src/components/testimonials-section.tsx` - Testimonials
- `client/src/components/blog-section.tsx` - Blog posts
- `client/src/components/contact-section.tsx` - Contact form
- `client/src/components/footer.tsx` - Footer
- `server/routes.ts` - API endpoints
- `server/storage.ts` - In-memory storage
- `shared/schema.ts` - Zod schemas and types

## Running
- `npm run dev` starts both frontend (Vite) and backend (Express) on the same port
