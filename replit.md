# replit.md

## Overview

This is a landing page application for **Arsa** — a fitness/health tech startup. The app features a futuristic HUD-themed single-page landing site with a waitlist signup form and a contact form. The project uses a full-stack TypeScript architecture with React on the frontend and Express on the backend, backed by PostgreSQL via Drizzle ORM. The visual design follows a techno-industrial aesthetic with Orbitron/Rajdhani fonts, Electric Cyan accents, and HUD-style UI elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (client/)
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) — currently only a Landing page and a 404 page
- **Styling**: Tailwind CSS with CSS variables for theming, using shadcn/ui component library (new-york style). Custom fonts: Orbitron (headings) and Rajdhani (body text)
- **State/Data**: TanStack React Query for server state management, React Hook Form with Zod resolvers for form handling
- **Animations**: Framer Motion for scroll-triggered animations and interactive UI effects
- **Component Structure**: 
  - `client/src/components/ui/` — shadcn/ui primitives (button, input, form, toast, etc.)
  - `client/src/components/` — custom components (HudButton, TechCard, WaitlistForm, Footer)
  - `client/src/pages/` — page-level components
  - `client/src/hooks/` — custom React hooks
  - `client/src/lib/` — utilities (queryClient, cn helper)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend (server/)
- **Framework**: Express 5 running on Node.js with TypeScript (executed via tsx)
- **API Pattern**: RESTful JSON API with routes defined in `server/routes.ts`. API route definitions and Zod validation schemas are shared between client and server via `shared/routes.ts`
- **Endpoints**:
  - `POST /api/waitlist` — email waitlist signup
  - `POST /api/contacts` — contact form submission (also writes to `contacts.json` file on disk)
- **Development**: Vite dev server is used as middleware in development mode (HMR via `server/vite.ts`). In production, pre-built static files are served from `dist/public/`

### Shared Code (shared/)
- `shared/schema.ts` — Drizzle ORM table definitions and Zod schemas for validation (waitlist, contacts tables)
- `shared/routes.ts` — API route contracts (paths, methods, input/output schemas) shared between frontend and backend

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: `node-postgres` (pg) Pool, configured via `DATABASE_URL` environment variable
- **Schema**: Two tables defined in `shared/schema.ts`:
  - `waitlist` — id, email (unique), name, createdAt
  - `contacts` — id, name, email, phone, topic, message, createdAt
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files). Config in `drizzle.config.ts`, migrations output to `./migrations/`

### Build System
- **Development**: `npm run dev` runs the Express server with tsx, which sets up Vite middleware for HMR
- **Production Build**: `npm run build` runs `script/build.ts` which:
  1. Builds the React client with Vite (output: `dist/public/`)
  2. Bundles the server with esbuild (output: `dist/index.cjs`), with an allowlist of dependencies to bundle for faster cold starts
- **Production Start**: `npm start` runs the bundled `dist/index.cjs`

### Storage Pattern
- `server/storage.ts` defines an `IStorage` interface and a `DatabaseStorage` implementation
- The storage layer is exported as a singleton instance, making it straightforward to swap implementations if needed
- Note: There are missing imports in `storage.ts` (`InsertContact`, `Contact`, `contacts` need to be imported from `@shared/schema`)

## External Dependencies

### Required Services
- **PostgreSQL Database**: Required. Connection string must be provided via `DATABASE_URL` environment variable. Used for storing waitlist entries and contact form submissions.

### Key NPM Packages
- **Frontend**: React, Vite, Wouter, TanStack React Query, React Hook Form, Framer Motion, shadcn/ui (Radix UI primitives), Tailwind CSS, Zod
- **Backend**: Express 5, Drizzle ORM, node-postgres (pg), connect-pg-simple (session store, though sessions don't appear actively used yet)
- **Shared**: Zod (validation), drizzle-zod (schema-to-validation bridge)

### Replit-specific Plugins
- `@replit/vite-plugin-runtime-error-modal` — error overlay in development
- `@replit/vite-plugin-cartographer` — dev tooling (conditionally loaded)
- `@replit/vite-plugin-dev-banner` — dev banner (conditionally loaded)

### Google Fonts
- Orbitron and Rajdhani loaded via Google Fonts CDN in `index.css`
- DM Sans, Fira Code, Geist Mono referenced in `index.html` (may not all be actively used)