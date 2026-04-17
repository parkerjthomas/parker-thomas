# Cursor Prompt — Step 1e: Components, Skills, Rules & Tests

**Prerequisites:** Steps 1a through 1d are complete and merged.

**This is a Worktree Agent task.** Select **worktree** from the agent dropdown. When done, click **Apply** to merge back to main.

This is the final scaffold step. After this, Task 1 (scaffold) is complete.

---

## Layout Components

### `src/components/layout/Navbar.tsx`

This is a **stub only** — the full Aceternity Floating Navbar is built in Task 2.

```tsx
import Link from 'next/link'
import { navItems, navCta } from '@/config/navigation'
import { siteConfig } from '@/config/site'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={navCta.href}
          className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          {navCta.label}
        </Link>
      </nav>
    </header>
  )
}
```

---

### `src/components/layout/Footer.tsx`

```tsx
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {siteConfig.social.twitter && (
            <Link
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
          )}
          {siteConfig.social.linkedin && (
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
          )}
          {siteConfig.social.github && (
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
```

---

### `src/components/aceternity/README.md`

```md
# Aceternity Components

All Aceternity components must be wrapped here before use.

## Install a component

```bash
# 1. Copy components.json.example → components.json (gitignored)
# 2. Replace YOUR_ACETERNITY_API_KEY with real key
npx shadcn@latest add @aceternity/[component-name]
```

## Rules

- Always mark wrapper files with `'use client'`
- Never import Aceternity components directly in pages or sections
- Always import from `@/components/aceternity/` only
- Wrapper file naming: `[ComponentName].tsx` (PascalCase)
```

---

## Cursor Rules

### `.cursor/rules/pitfalls.mdc`

```
---
description: Common pitfalls and how to avoid them
alwaysApply: true
---

# Known Pitfalls

## 1. Framer Motion Hydration Mismatch

**Problem:** Using `motion` components in server components causes hydration errors.
**Fix:** Always mark files using Framer Motion with `'use client'`.

## 2. GSAP ScrollTrigger Cleanup

**Problem:** ScrollTrigger instances persist across navigations → memory leaks.
**Fix:** Always return cleanup from `useEffect`.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({ ... })
  }, ref)
  return () => ctx.revert()
}, [])
```

## 3. Raw Aceternity Imports

**Problem:** Importing Aceternity directly couples pages to library internals.
**Fix:** Always wrap in `src/components/aceternity/`. Never import raw.

```tsx
// ❌ Wrong
import { SparklesCore } from '@aceternity/sparkles'

// ✅ Correct
import { SparklesWrapper } from '@/components/aceternity/SparklesWrapper'
```

## 4. Editing Shadcn ui/ Files

**Problem:** `src/components/ui/` files are overwritten on next `shadcn` CLI run.
**Fix:** Never modify. Extend via `className` + `cn()` in consumer components.

## 5. next-themes Before Mount Flash

**Problem:** Reading theme before mount → flash or hydration mismatch.
**Fix:** Use the mounted pattern.

```tsx
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null
```

## 6. Opacity on CSS Variables (Tailwind v4)

**Problem:** `hsl(var(--token)/opacity)` does NOT work in Tailwind v4.
**Fix:** Use `color-mix(in oklch, var(--token) 50%, transparent)`.

## 7. Google Fonts

**Problem:** `next/font/google` makes external requests — explicitly banned.
**Fix:** Fonts are self-hosted `.woff2` in `src/assets/fonts/` via `next/font/local`.

## 8. Button asChild

**Problem:** `<Button asChild>` is banned in this project.
**Fix:** Use `buttonVariants()` on `<Link>`.

```tsx
import { buttonVariants } from '@/components/ui/button'
<Link href="/templates" className={buttonVariants({ variant: 'default' })}>Get a site</Link>
```

## 9. Framer Motion + GSAP on Same Element

**Problem:** Both write to same transform/opacity → jank.
**Fix:** Framer for entrance/exit. GSAP for scroll-driven. Never both on same element.
```

---

### `.cursor/rules/project-core.mdc`

```
---
description: Project identity, key paths, and constraints
alwaysApply: true
---

# Parker Thomas — Personal Brand Site

"I build the web presence. Then I build what fills it."
URL: https://parker-thomas.com

## Key Paths

| What | Where |
|------|-------|
| Routes | `src/app/(marketing)/` |
| Shadcn (no-touch) | `src/components/ui/` |
| Aceternity wrappers | `src/components/aceternity/` |
| Page sections | `src/components/sections/` |
| Layout | `src/components/layout/` |
| Animation baseline | `src/lib/motion.ts` |
| Site config | `src/config/site.ts` |
| Navigation | `src/config/navigation.ts` |
| Home content | `src/content/home.ts` |
| Templates data | `src/content/templates.ts` |
| Blog posts (MDX) | `src/content/posts/` |
| Structured data | `src/lib/structured-data.ts` |
| Fonts | `src/lib/fonts.ts` |
| Design tokens | `src/app/globals.css` |
| Task Master PRD | `.taskmaster/docs/prd.txt` |

## Locked Content — Never Change

- Hero headline: "I build the web presence. Then I build what fills it."
- Hero sub (typewriter): "Built for the businesses that can't afford to look average."
- Primary CTA: "Get a site" → /templates
- Secondary CTA: "Partner with me" → /for-agencies

## Hard Constraints

- Never `hsl(var(--token)/opacity)` — use `color-mix(in oklch, ...)` for opacity
- Never `next/font/google` — fonts are self-hosted via `next/font/local`
- Never `<Button asChild>` — use `buttonVariants()` on `<Link>`
- Never edit `src/components/ui/` files — extend via `className` only
- Never import Aceternity raw — always `src/components/aceternity/` wrappers
- Never hardcode identity strings — always from `src/config/site.ts`
- Never hardcode marketing copy — always from `src/content/*.ts`
- All animation values from `src/lib/motion.ts` only
- Tailwind v4 — no `tailwind.config.ts`, all theme in `globals.css @theme inline`
- `'use client'` only when needed — default to server components
- Mobile-first: base → `sm` → `md` → `lg` → `xl`

## Component Hierarchy

1. `src/components/ui/` — Shadcn. Use as-is. Never modify.
2. `src/components/aceternity/` — Wrapped Aceternity. Always `'use client'`. Never raw.
3. `src/components/common/` — Custom primitives built from `ui/`.
4. `src/components/sections/` — Page sections. Built from `common/` + `aceternity/`.
5. `src/components/layout/` — Navbar, Footer.
6. `src/app/` — Routes only. Compose sections. No logic, no component definitions.
```

---

### `.cursor/rules/components.mdc`

```
---
description: Component composition patterns
alwaysApply: false
globs: src/components/**,src/app/**/*.tsx
---

# Component Conventions

## Every Section File

- Named `[SectionName].tsx` in `src/components/sections/`
- Marked `'use client'` (Framer Motion)
- Accepts `className` prop
- Uses semantic HTML (`section`, `article`)
- Imports animation variants from `lib/motion.ts` only
- Pulls identity from `config/site.ts`
- Pulls copy from `src/content/*.ts` — no hardcoded strings

## Responsive Pattern

Mobile-first. Base → `sm` → `md` → `lg` → `xl` in that order, always.
```

---

## Cursor Skills

### `.cursor/skills/add-aceternity-component.md`

```
---
description: Use when installing or wrapping an Aceternity Pro component
---

# How to Add an Aceternity Component

## Step 1 — Ensure components.json exists locally

`components.json` is gitignored. If it doesn't exist:
```bash
cp components.json.example components.json
# Replace YOUR_ACETERNITY_API_KEY with the real key
```

## Step 2 — Install via shadcn CLI

```bash
npx shadcn@latest add @aceternity/[component-name]
```

This drops the raw component into `src/components/ui/`. Do NOT use it directly.

## Step 3 — Create a wrapper

Create `src/components/aceternity/[ComponentName].tsx`:

```tsx
'use client'

// Import the raw component from ui/ (it lives there after install)
import { RawComponentName } from '@/components/ui/raw-component-name'
import { cn } from '@/lib/utils'

interface [ComponentName]Props {
  className?: string
  // add props as needed
}

export function [ComponentName]({ className, ...props }: [ComponentName]Props) {
  return (
    <RawComponentName
      className={cn('', className)}
      {...props}
    />
  )
}
```

## Step 4 — Import only from the wrapper

```tsx
// ✅ Correct
import { LampEffect } from '@/components/aceternity/LampEffect'

// ❌ Never
import { LampContainer } from '@/components/ui/lamp'
```

## Rules

- Wrapper must be `'use client'`
- Never use raw Aceternity import in sections or pages
- Wrapper accepts `className` prop and passes it through `cn()`
- If component needs GSAP, register ScrollTrigger and return cleanup
```

---

### `.cursor/skills/add-route.md`

```
---
description: Use when adding a new page route to parker-thomas.com
---

# How to Add a New Route

## File location

All marketing pages live in `src/app/(marketing)/`:

```
src/app/(marketing)/
  page.tsx          → /
  templates/
    page.tsx        → /templates
  for-agencies/
    page.tsx        → /for-agencies
  writing/
    page.tsx        → /writing
    [slug]/
      page.tsx      → /writing/[slug]
```

## Required structure for every new page

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',           // appears as "Page Title | Parker Thomas"
  description: 'Page description for SEO.',
}

export default function PageName() {
  return (
    <>
      {/* Import and compose section components here */}
      {/* No logic, no component definitions in route files */}
    </>
  )
}
```

## After adding a route

1. Add it to `src/app/sitemap.ts`
2. Add nav item to `src/config/navigation.ts` if it should appear in nav
3. Create section component stubs in `src/components/sections/`
```

---

### `.cursor/skills/add-blog-post.md`

```
---
description: Use when creating a new blog post for the /writing section
---

# How to Add a Blog Post

## File location

```
src/content/posts/
  your-post-slug.mdx
```

## MDX frontmatter schema

```mdx
---
title: "Your Post Title"
date: "2026-04-16"
description: "One sentence SEO description."
author: "Parker Thomas"
tags: ["web-design", "local-business"]
---

Post content here in MDX...
```

## Required fields

- `title` — used in `<title>` and as the H1
- `date` — ISO format `YYYY-MM-DD`
- `description` — used in meta description and post cards
- `author` — always "Parker Thomas"

## Optional fields

- `tags` — array of strings, used for filtering
- `featured` — boolean, shows post in featured slot on /writing

## After adding a post

1. Add to `src/app/sitemap.ts` dynamically (or re-run sitemap generation)
2. Confirm post appears at `/writing/your-post-slug` in dev
3. Confirm meta title and description are correct
```

---

### `.cursor/skills/stack-constraints.md`

```
---
description: Use when unsure about styling, imports, or component patterns for this project
---

# Stack Constraints Reference

## Tailwind v4 — Critical

```css
/* ❌ WRONG — does not work in Tailwind v4 */
hsl(var(--primary) / 0.5)

/* ✅ CORRECT */
color-mix(in oklch, var(--primary) 50%, transparent)
```

No `tailwind.config.ts` — all theme tokens live in `src/app/globals.css` under `@theme inline`.

## Fonts — Critical

```ts
// ❌ NEVER — external network request, banned
import { Inter } from 'next/font/google'

// ✅ ALWAYS — self-hosted via next/font/local
import { headingFont, bodyFont } from '@/lib/fonts'
```

Font files are `.woff2` committed in `src/assets/fonts/`.

## Buttons with Links — Critical

```tsx
// ❌ NEVER
<Button asChild><Link href="/templates">Get a site</Link></Button>

// ✅ ALWAYS
import { buttonVariants } from '@/components/ui/button'
<Link href="/templates" className={buttonVariants({ variant: 'default' })}>Get a site</Link>
```

## Aceternity Components

```tsx
// ❌ NEVER — raw import in sections or pages
import { LampContainer } from '@/components/ui/lamp'

// ✅ ALWAYS — through wrapper
import { LampEffect } from '@/components/aceternity/LampEffect'
```

## Client vs Server

- Default: server component (no directive needed)
- Add `'use client'` only when using: hooks, Framer Motion, GSAP, event handlers, browser APIs
- Layouts and page.tsx files: server components unless they need state

## Content and Identity

```ts
// ❌ NEVER — hardcoded strings
<h1>Parker Thomas</h1>
<p>I build the web presence...</p>

// ✅ ALWAYS — from config/content
import { siteConfig } from '@/config/site'
import { homeContent } from '@/content/home'
<h1>{siteConfig.name}</h1>
<p>{homeContent.hero.headline}</p>
```
```

---

### `.cursor/skills/run-tests.md`

```
---
description: Use when running, debugging, or adding tests to this project
---

# Testing Reference

## Run tests

```bash
# Interactive watch mode
npm test

# Single run (CI mode)
npm run test:run
```

## Test files

| File | What it tests |
|------|---------------|
| `src/test/smoke.test.tsx` | Config values, locked copy, template data integrity |

## Test framework

- Vitest + React Testing Library + jsdom
- Setup file: `src/test/setup.ts` (mocks IntersectionObserver)
- Path alias `@/` works in tests via `vitest.config.ts`

## When to add tests

- New content file added → add shape test
- Locked copy changed → update smoke test assertions
- New section component → add render test
- Form component → add validation test

## Adding a section render test

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SectionName from '@/components/sections/SectionName'
import { homeContent } from '@/content/home'

describe('SectionName', () => {
  it('renders without crashing', () => {
    render(<SectionName />)
  })

  it('renders expected content', () => {
    render(<SectionName />)
    expect(screen.getByText(homeContent.hero.headline)).toBeInTheDocument()
  })
})
```

## Common failures

- `IntersectionObserver is not defined` → check `src/test/setup.ts` is included in `vitest.config.ts`
- `Cannot find module '@/...'` → check path alias in `vitest.config.ts` matches `tsconfig.json`
- Framer Motion errors → ensure component file has `'use client'` at top
```

---

## Cursor Commands

### `.cursor/commands/next-task.md`

```
---
description: Ask Task Master what the next task is
---

Use the taskmaster-ai MCP tool to find the next pending task:
1. Call `next_task` to get the highest-priority pending task
2. Show me the task title, description, and acceptance criteria
3. Ask if I want to start implementing it

Do not start implementing until I confirm.
```

---

## Tests

### `src/test/smoke.test.tsx`

```tsx
import { describe, it, expect } from 'vitest'
import { siteConfig } from '@/config/site'
import { homeContent } from '@/content/home'
import { templates } from '@/content/templates'
import { navItems, navCta } from '@/config/navigation'

describe('Site config', () => {
  it('has correct name', () => {
    expect(siteConfig.name).toBe('Parker Thomas')
  })

  it('has correct url', () => {
    expect(siteConfig.url).toBe('https://parker-thomas.com')
  })

  it('has all social links', () => {
    expect(siteConfig.social.twitter).toBeTruthy()
    expect(siteConfig.social.linkedin).toBeTruthy()
    expect(siteConfig.social.github).toBeTruthy()
  })
})

describe('Locked hero copy', () => {
  it('headline matches locked copy exactly', () => {
    expect(homeContent.hero.headline).toBe(
      'I build the web presence. Then I build what fills it.'
    )
  })

  it('typewriter sub matches locked copy', () => {
    expect(homeContent.hero.typewriterItems[0]).toBe(
      "Built for the businesses that can't afford to look average."
    )
  })

  it('primary CTA goes to /templates', () => {
    expect(homeContent.hero.primaryCta.href).toBe('/templates')
  })

  it('secondary CTA goes to /for-agencies', () => {
    expect(homeContent.hero.secondaryCta.href).toBe('/for-agencies')
  })
})

describe('Templates data', () => {
  it('has exactly 9 templates', () => {
    expect(templates).toHaveLength(9)
  })

  it('covers all 3 verticals', () => {
    const verticals = new Set(templates.map((t) => t.vertical))
    expect(verticals.has('medspa')).toBe(true)
    expect(verticals.has('dental')).toBe(true)
    expect(verticals.has('agency')).toBe(true)
  })

  it('has 3 templates per vertical', () => {
    const byVertical = templates.reduce(
      (acc, t) => { acc[t.vertical] = (acc[t.vertical] ?? 0) + 1; return acc },
      {} as Record<string, number>
    )
    expect(byVertical.medspa).toBe(3)
    expect(byVertical.dental).toBe(3)
    expect(byVertical.agency).toBe(3)
  })

  it('every template has required fields', () => {
    templates.forEach((t) => {
      expect(t.slug).toBeTruthy()
      expect(t.title).toBeTruthy()
      expect(t.tagline).toBeTruthy()
      expect(t.priceRange).toBeTruthy()
    })
  })
})

describe('Navigation', () => {
  it('has 3 nav items', () => {
    expect(navItems).toHaveLength(3)
  })

  it('nav items have valid hrefs', () => {
    navItems.forEach((item) => {
      expect(item.href).toMatch(/^\//)
    })
  })

  it('CTA goes to /templates', () => {
    expect(navCta.href).toBe('/templates')
  })
})

describe('Home content shape', () => {
  it('has all required sections', () => {
    expect(homeContent.hero).toBeDefined()
    expect(homeContent.about).toBeDefined()
    expect(homeContent.services).toBeDefined()
    expect(homeContent.cta).toBeDefined()
  })

  it('services has 3 items', () => {
    expect(homeContent.services.items).toHaveLength(3)
  })

  it('every service item has title and description', () => {
    homeContent.services.items.forEach((item) => {
      expect(item.title).toBeTruthy()
      expect(item.description).toBeTruthy()
    })
  })
})
```

---

## Final verification

```bash
# Run all smoke tests — must all pass
npm run test:run

# TypeScript check
npx tsc --noEmit 2>&1 | head -30

# Start dev server — must start without errors
npm run dev
```

Open `http://localhost:3000`. Confirm:
- [ ] Page loads
- [ ] Background is **dark** (not white)
- [ ] Navbar shows "Parker Thomas" + nav links + "Get a site" CTA
- [ ] Footer shows copyright and social links
- [ ] No console errors

---

## Final commit & push

```bash
git add -A
git commit -m "feat: components, cursor skills, rules, smoke tests — scaffold complete"
git push origin main
```

---

## Task Master — Initialize

Once you have pushed and confirmed the dev server loads:

1. Copy `.cursor/mcp.json.example` → `.cursor/mcp.json`
2. Add your Anthropic API key to `.cursor/mcp.json`
3. Enable in Cursor Settings → MCP tab
4. In Cursor chat, run: `Initialize taskmaster-ai in my project`
5. Then: `Can you parse my PRD at .taskmaster/docs/prd.txt?`

After parsing, Task Master will have all 10 build tasks loaded. Use `/next-task` at the start of every future session to know exactly where you are.

---

## `README.md`

```md
# parker-thomas.com

Parker Thomas's personal brand site. Showcases celebrity-quality website templates for high-margin local businesses — medspas, cosmetic dentistry, and boutique agencies.

**Live:** https://parker-thomas.com

---

## Stack

Next.js 16.2.2 · TypeScript · Tailwind v4 · Shadcn Nova · Framer Motion · GSAP · Aceternity Pro · Vercel Pro

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

Open http://localhost:3000 — loads in dark mode by default.

## Key paths

| What | Where |
|---|---|
| Site identity | `src/config/site.ts` |
| Navigation | `src/config/navigation.ts` |
| Home copy | `src/content/home.ts` |
| Templates data | `src/content/templates.ts` |
| Blog posts (MDX) | `src/content/posts/` |
| Design tokens | `src/app/globals.css` |
| Animation presets | `src/lib/motion.ts` |
| Self-hosted fonts | `src/lib/fonts.ts` + `src/assets/fonts/` |
| Page sections | `src/components/sections/` |
| Aceternity wrappers | `src/components/aceternity/` |

## Adding an Aceternity component

```bash
cp components.json.example components.json   # gitignored — add real API key
npx shadcn@latest add @aceternity/[name]
# Then wrap it in src/components/aceternity/
```

See `.cursor/skills/add-aceternity-component.md` for the full pattern.

## Tests

```bash
npm run test:run   # smoke tests — config, locked copy, templates data
```

## Task tracking

This project uses [Task Master](https://github.com/eyaltoledano/claude-task-master) for AI-assisted task management.

```bash
cp .cursor/mcp.json.example .cursor/mcp.json   # gitignored — add Anthropic key
# Enable in Cursor Settings → MCP tab
```

Then in Cursor chat: `Initialize taskmaster-ai in my project`

PRD lives at `.taskmaster/docs/prd.txt`.

## Hard constraints

- Never `hsl(var(--token)/opacity)` — use `color-mix(in oklch, ...)` for opacity
- Never `next/font/google` — fonts are self-hosted `.woff2`
- Never `<Button asChild>` — use `buttonVariants()` on `<Link>`
- Never edit `src/components/ui/` — extend via `className` only
- Never import Aceternity raw — always wrap in `src/components/aceternity/`
- Never hardcode content — always from `src/config/site.ts` or `src/content/*.ts`

## Locked copy — never change

> "I build the web presence. Then I build what fills it."

Hero headline and typewriter subheadline are asserted in `src/test/smoke.test.tsx`.
```

---

**Scaffold complete. Task 1 is done.**

Next session: use `/next-task` → Task Master will tell you Task 2 is the Floating Navbar.
