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
