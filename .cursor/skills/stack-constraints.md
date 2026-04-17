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
