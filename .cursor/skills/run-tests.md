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
