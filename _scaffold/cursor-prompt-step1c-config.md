# Cursor Prompt — Step 1c: Config, Content & Task Master

**Prerequisites:** Steps 1a and 1b are complete and merged.

**This is a Worktree Agent task.** Select **worktree** from the agent dropdown. When done, click **Apply** to merge back to main.

Create each file below with exact content shown.

---

## `src/config/site.ts`

```ts
export const siteConfig = {
  name: 'Parker Thomas',
  description: 'I build the web presence. Then I build what fills it.',
  url: 'https://parker-thomas.com',
  ogImage: '/og',
  location: 'Minneapolis, MN',
  social: {
    twitter: 'https://twitter.com/parkerjthomas',
    linkedin: 'https://linkedin.com/in/parkerjthomas',
    github: 'https://github.com/parkerjthomas',
  },
}
```

---

## `src/config/navigation.ts`

```ts
export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Templates', href: '/templates' },
  { label: 'Writing', href: '/writing' },
  { label: 'For Agencies', href: '/for-agencies' },
]

export const navCta: NavItem = {
  label: 'Get a site',
  href: '/templates',
}
```

---

## `src/content/home.ts`

```ts
export const homeContent = {
  hero: {
    headline: 'I build the web presence. Then I build what fills it.',
    typewriterItems: [
      "Built for the businesses that can't afford to look average.",
    ],
    primaryCta: { label: 'Get a site', href: '/templates' },
    secondaryCta: { label: 'Partner with me', href: '/for-agencies' },
  },
  about: {
    heading: 'What I do',
    body: 'I design and build celebrity-quality websites for high-margin local businesses — medspas, cosmetic dentistry, and boutique agencies. Every site is a showcase, not a landing page.',
    cta: { label: 'See templates', href: '/templates' },
  },
  services: {
    eyebrow: 'The offer',
    heading: 'A site worth showing off',
    subheading: 'Fast, beautiful, and ready to convert. Delivered in days, not months.',
    items: [
      {
        title: 'Design & Build',
        description: 'Custom site from a proven template. Configured for your brand, your city, your clients.',
      },
      {
        title: 'Launch & Host',
        description: 'Deployed on Vercel Pro. Global CDN, 99.99% uptime, zero server headaches.',
      },
      {
        title: 'RevOps Upsell',
        description: "Ready to fill that site with leads? Cleris handles the automation.",
      },
    ],
  },
  cta: {
    heading: "Your clients are Googling. Are they finding you?",
    subheading: "Let's build something worth showing off.",
    cta: { label: 'Get a site', href: '/templates' },
  },
}
```

---

## `src/content/templates.ts`

```ts
export interface TemplatePreview {
  slug: string
  title: string
  vertical: 'medspa' | 'dental' | 'agency'
  tagline: string
  imagePlaceholder: string
  priceRange: string
}

export const templates: TemplatePreview[] = [
  {
    slug: 'lumina',
    title: 'Lumina',
    vertical: 'medspa',
    tagline: 'Luxury medspa and esthetics',
    imagePlaceholder: '/templates/lumina-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'radiance',
    title: 'Radiance',
    vertical: 'medspa',
    tagline: 'Modern skincare and wellness',
    imagePlaceholder: '/templates/radiance-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'aurore',
    title: 'Aurore',
    vertical: 'medspa',
    tagline: 'Premium esthetic clinic',
    imagePlaceholder: '/templates/aurore-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'white-coat',
    title: 'White Coat',
    vertical: 'dental',
    tagline: 'Cosmetic and general dentistry',
    imagePlaceholder: '/templates/white-coat-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'apex-smile',
    title: 'Apex Smile',
    vertical: 'dental',
    tagline: 'High-end smile design',
    imagePlaceholder: '/templates/apex-smile-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'pearl',
    title: 'Pearl',
    vertical: 'dental',
    tagline: 'Boutique family dentistry',
    imagePlaceholder: '/templates/pearl-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'signal',
    title: 'Signal',
    vertical: 'agency',
    tagline: 'Boutique marketing agency',
    imagePlaceholder: '/templates/signal-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'meridian',
    title: 'Meridian',
    vertical: 'agency',
    tagline: 'Full-service creative agency',
    imagePlaceholder: '/templates/meridian-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'foundry',
    title: 'Foundry',
    vertical: 'agency',
    tagline: 'Growth and performance agency',
    imagePlaceholder: '/templates/foundry-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
]
```

---

## `components.json.example`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {
    "@aceternity": {
      "url": "https://ui.aceternity.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer YOUR_ACETERNITY_API_KEY"
      }
    }
  }
}
```

---

## Task Master setup

### `.cursor/mcp.json.example`

This is a template — never commit the real `.cursor/mcp.json` (it's gitignored). To activate Task Master:
1. Copy this file to `.cursor/mcp.json`
2. Replace `YOUR_ANTHROPIC_API_KEY` with your real key
3. Enable in Cursor Settings → MCP tab

```json
{
  "mcpServers": {
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY",
        "TASK_MASTER_TOOLS": "standard"
      }
    }
  }
}
```

---

### `.taskmaster/docs/prd.txt`

Create the directory and file:

```bash
mkdir -p .taskmaster/docs
```

Then create `.taskmaster/docs/prd.txt` with this content:

```
# Product Requirements Document — parker-thomas.com

## Project Overview

parker-thomas.com is Parker Thomas's personal brand site. It showcases
celebrity-quality website templates for high-margin local businesses
(medspas, cosmetic dentistry, boutique agencies) and positions Parker
as the builder behind them. Every site client is a warm lead for the
Cleris RevOps managed service ($2k/mo).

## Tech Stack

- Next.js 16.2.2, TypeScript, Tailwind v4 (no tailwind.config.ts)
- Shadcn Nova preset, Framer Motion, GSAP, Aceternity Pro
- Vercel Pro hosting, MDX blog, Resend forms
- Self-hosted fonts (Playfair Display + Inter .woff2)

## Critical Constraints

- Never hsl(var(--token)/opacity) — use color-mix(in oklch, ...)
- Never next/font/google — fonts are self-hosted via next/font/local
- Never Button asChild — use buttonVariants() on <Link>
- Never edit src/components/ui/ — extend via className only
- Never import Aceternity raw — wrap in src/components/aceternity/
- 'use client' only when needed — default server components
- All animation values from src/lib/motion.ts only
- All content from src/content/*.ts — no hardcoded strings in components
- All identity from src/config/site.ts — no hardcoded strings

## Routes

- / — Home (Hero, About, Services, CTA)
- /templates — Template gallery (9 templates, 3 verticals)
- /for-agencies — Agency partner page
- /writing — Blog index (MDX posts)
- /writing/[slug] — Individual blog post

## Locked Content

- Hero headline: "I build the web presence. Then I build what fills it."
- Hero typewriter sub: "Built for the businesses that can't afford to look average."
- Primary CTA: "Get a site" → /templates
- Secondary CTA: "Partner with me" → /for-agencies

## Build Sequence

### Task 1: Scaffold (COMPLETE)
Create repo, copy shared foundation from client-site-template,
scaffold all routes as stubs with metadata exports.
Acceptance: npm test passes, npm run dev starts, dark page loads.

### Task 2: Floating Navbar (Step 5)
Build the Floating Navbar using Aceternity's Floating Navbar component.
Wrapped in src/components/aceternity/FloatingNavbar.tsx.
Used in src/components/layout/Navbar.tsx.
Items from src/config/navigation.ts. CTA uses buttonVariants().
Dark/light mode toggle included. Mobile menu included.
Acceptance: Navbar visible on all routes, theme toggle works, mobile responsive.

### Task 3: Hero Section (Step 6)
Build the Hero using:
- Lamp Effect (primary background)
- Spotlight New (ambient accent)
- Text Generate Effect (headline reveal)
- Aurora Background (subtle ambient)
- Typewriter Effect (subheadline)
- Moving Border CTA buttons
All Aceternity components wrapped in src/components/aceternity/.
Content from src/content/home.ts hero object.
Acceptance: Animations play on load, headline matches locked copy, both CTAs present.

### Task 4: About Section (Step 7)
Build the About section using:
- Bento Grid (primary layout)
- Tracing Beam (scroll reveal wrapper)
Content from src/content/home.ts about object.
Acceptance: Section renders, tracing beam animates on scroll.

### Task 5: Templates Gallery (Step 8)
Build the Templates gallery using:
- Focus Cards (primary)
- Tabs (vertical filter by medspa/dental/agency)
Data from src/content/templates.ts (9 templates).
Placeholder images for now — static images added later.
Acceptance: All 9 templates shown, tab filter works, Focus Cards animate.

### Task 6: For Agencies Page (Step 9)
Build the For Agencies page using:
- Compare (primary — shows average site vs Parker Thomas quality)
- Sticky Scroll Reveal (agency value props)
- Wobble Card (contact/partner CTA)
Content: pitch the agency white-label model.
Acceptance: Page renders, Compare interactive, Sticky Scroll animates.

### Task 7: Wire Content, OG, Sitemap, Robots (Step 10)
Ensure all metadata, OG images, sitemap, and robots.txt are correct.
All routes have proper metadata exports.
OG image route at /og renders Parker's info.
Acceptance: All meta tags present, sitemap.xml accessible, /og returns 1200x630 image.

### Task 8: Deploy to Vercel (Step 11)
Create Vercel project parker-thomas.
Connect to GitHub repo parkerjthomas/parker-thomas.
Set RESEND_API_KEY env var.
Confirm dark default on production URL.
Acceptance: Site live, dark mode default, no build errors.

### Task 9: Blog — Writing Page (Post-launch)
Build the blog index and post pages.
MDX files in src/content/posts/.
First post: "Why your medspa website is costing you clients."
Acceptance: Blog index shows posts, slug page renders MDX, syntax highlighting works.

### Task 10: Outreach Pipeline (Post-launch)
Build Apify scraping workflow (Minneapolis, medspas + dentistry).
Build AI website grader node (LCP, mobile, trust signals, CTA clarity, schema).
Score < 70 → outreach list.
Clay enrichment → n8n → Ollama → Claude drafts email → Cleris approval → Instantly sends.
Acceptance: First batch of 20 businesses graded and in outreach queue.
```

---

## `.env.example`

Document all required environment variables. This file IS committed — it's the contract for what secrets are needed.

```bash
# .env.example — copy to .env.local and fill in real values
# Never commit .env.local

# Resend — used for contact/inquiry form submissions
# Get key at: https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key_here

# Resend — the "from" address for outgoing emails
RESEND_FROM_EMAIL=hello@parker-thomas.com
```

---

## Update `.taskmaster/docs/prd.txt` — add task dependencies

Append the following to the end of `.taskmaster/docs/prd.txt`:

```
## Task Dependencies

Task Master should enforce this execution order:

- Task 1 (Scaffold): no dependencies — start here
- Task 2 (Floating Navbar): depends on Task 1
- Task 3 (Hero Section): depends on Task 2
- Task 4 (About Section): depends on Task 2
- Task 5 (Templates Gallery): depends on Task 2
- Task 6 (For Agencies Page): depends on Task 2
- Task 7 (Wire Content/OG/Sitemap): depends on Tasks 3, 4, 5, 6
- Task 8 (Deploy to Vercel): depends on Task 7
- Task 9 (Blog / Writing): depends on Task 8
- Task 10 (Outreach Pipeline): depends on Task 9

Tasks 3-6 can run in parallel once Task 2 is complete.
Do not suggest Task 3-6 before Task 2 is marked done.
Do not suggest Task 7 until Tasks 3-6 are all marked done.
```

---

## Verify & commit

```bash
git add -A
git commit -m "feat: config, content, templates data, task master PRD"
```

**STOP HERE.** Apply this worktree. Then open a fresh Cursor agent session and use `step1d-routes.md`.
