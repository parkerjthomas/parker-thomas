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
