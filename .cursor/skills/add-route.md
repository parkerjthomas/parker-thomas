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
