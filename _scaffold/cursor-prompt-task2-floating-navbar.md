# Cursor Prompt — Task 2: Floating Navbar

**Task Master:** Task 2 — Floating Navbar
**Prerequisites:** Scaffold complete (Tasks 1a–1e merged to main, 17 tests passing)
**This is a Worktree Agent task.** Start with `/worktree` before pasting this prompt.
**Review step:** Before marking this task done in Task Master, run `npm run test:run` and `npx tsc --noEmit`. Both must be clean.

---

## Context

Stack constraints (always enforced):
- Never `hsl(var(--token)/opacity)` — use `color-mix(in oklch, var(--token), transparent XX%)`
- Never `next/font/google` — fonts are self-hosted
- Never `<Button asChild>` — use `buttonVariants()` on `<Link>` directly
- Never import Aceternity raw in pages or layouts — always wrap in `src/components/aceternity/`
- Never edit `src/components/ui/` — extend via `className` only
- `'use client'` only when the component uses hooks or browser APIs

---

## Step 0 — Aceternity Pro Setup

This must happen before any `npx shadcn` install.

**Check if `components.json` already exists at the repo root.** If not:

```bash
cp components.json.example components.json
```

Then open `components.json` and replace `YOUR_ACETERNITY_API_KEY` with the real Aceternity Pro API key.

> **Parker: paste your Aceternity API key when Cursor asks, or edit `components.json` manually before running the install command.**
> `components.json` is gitignored — never commit it.

---

## Step 1 — Install Aceternity Floating Navbar

```bash
npx shadcn@latest add @aceternity/floating-navbar
```

This installs to `src/components/ui/floating-navbar.tsx`. Do not edit that file.

---

## Step 2 — Create ThemeToggle component

Create `src/components/ui/theme-toggle.tsx` with exact content:

```tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground',
        className
      )}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
```

---

## Step 3 — Create FloatingNavbar wrapper

Create `src/components/aceternity/FloatingNavbar.tsx`.

Requirements:
- `'use client'` — this component uses scroll hooks from Aceternity
- Import `FloatingNav` from `@/components/ui/floating-navbar` (the installed Aceternity component)
- Import `navItems` and `navCta` from `@/config/navigation`
- Import `ThemeToggle` from `@/components/ui/theme-toggle`
- Import `buttonVariants` from `@/components/ui/button`
- Import `Link` from `next/link`
- Map `navItems` to the shape Aceternity's `FloatingNav` expects
- The CTA (`navCta`) renders as `<Link href={navCta.href} className={buttonVariants({ size: 'sm' })}>` — never as a raw `<Button asChild>`
- The `ThemeToggle` renders inside or alongside the floating nav container
- Mobile: on screens below `md`, the floating pill is hidden and replaced by a standard fixed header with a hamburger menu that opens/closes a full-width dropdown. Use Framer Motion `AnimatePresence` + `motion.div` with `variants` from `@/lib/motion` for the mobile dropdown animation.
- Export as default: `export default function FloatingNavbar()`

### Mobile menu behavior
- Hamburger icon: `Menu` from lucide-react when closed, `X` when open
- Mobile dropdown: contains all `navItems` as full-width Links + the CTA + ThemeToggle
- Close mobile menu on route change: use `usePathname` from `next/navigation`

### Visual intent
- Desktop: Aceternity's floating pill, centered, appears on scroll (not on page load at top)
- Dark default: background should use `bg-background/80 backdrop-blur-md` or whatever Aceternity applies
- All colors via Tailwind tokens only — no hardcoded hex or hsl

---

## Step 4 — Update Navbar.tsx

Replace `src/components/layout/Navbar.tsx` with:

```tsx
import FloatingNavbar from '@/components/aceternity/FloatingNavbar'

export default function Navbar() {
  return <FloatingNavbar />
}
```

This is a server component (no `'use client'`). The client logic lives inside `FloatingNavbar`.

---

## Step 5 — Verify

```bash
npx tsc --noEmit
```
Expected: 0 errors.

```bash
npm run build
```
Expected: build succeeds.

```bash
npm run dev
```
Manual checks:
- [ ] Desktop: floating pill appears when scrolling down from the top
- [ ] Desktop: nav items link to `/templates`, `/writing`, `/for-agencies`
- [ ] Desktop: 'Get a site' CTA button is visible and links to `/templates`
- [ ] Desktop: theme toggle switches dark/light mode
- [ ] Mobile: hamburger icon is visible, tapping opens dropdown
- [ ] Mobile: dropdown closes when a link is tapped
- [ ] No console errors

```bash
npm run test:run
```
Expected: 17 tests still passing (no regressions).

---

## Step 6 — Mark done in Task Master and commit

In the Cursor agent, after verification passes:

```
Mark task 2 as done in Task Master
```

Then commit:

```bash
git add -A
git commit -m "feat: floating navbar — aceternity, theme toggle, mobile menu"
```

Then `/apply-worktree` (or cherry-pick) to main and push.

---

## What NOT to do

- Do not edit `src/components/ui/floating-navbar.tsx` — extend via className only
- Do not use `<Button asChild>` — use `buttonVariants()` on `<Link>` directly
- Do not import FloatingNavbar directly in any page or layout — it already comes through `Navbar.tsx`
- Do not add `'use client'` to `Navbar.tsx` — keep it as a server component wrapper
- Do not hardcode colors — use Tailwind tokens only
- Do not use `next/font/google` — fonts are already self-hosted
