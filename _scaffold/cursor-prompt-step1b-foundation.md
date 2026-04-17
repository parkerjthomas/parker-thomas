# Cursor Prompt — Step 1b: Foundation

**Prerequisites:** Step 1a is complete and pushed to GitHub.

**This is a Worktree Agent task.** Select **worktree** from the agent dropdown before starting. When done, click **Apply** to merge back to main.

Create each file below with the exact content shown. Do not modify, improve, or reformat.

---

## `postcss.config.mjs`

Delete the generated file. Replace with:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
```

---

## `tsconfig.json`

Replace the generated file:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts",
    "**/*.mdx"
  ],
  "exclude": ["node_modules"]
}
```

---

## `eslint.config.mjs`

```js
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
])

export default eslintConfig
```

---

## `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## `src/lib/utils.ts`

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## `src/lib/motion.ts`

```ts
import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

export const springs = {
  gentle: { type: 'spring' as const, stiffness: 120, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 18 },
  stiff:  { type: 'spring' as const, stiffness: 500, damping: 30 },
}

export const duration = {
  micro:   0.1,
  ui:      0.2,
  panel:   0.35,
  page:    0.5,
  feature: 0.7,
}

export const gsapDefaults = {
  ease: 'power2.out',
  duration: 0.6,
}

export const gsapScrollDefaults = {
  ease: 'power2.out',
  duration: 0.8,
  scrollTrigger: {
    start: 'top 85%',
    toggleActions: 'play none none none',
  },
}
```

---

## `src/lib/fonts.ts`

```ts
import localFont from 'next/font/local'

export const headingFont = localFont({
  src: '../assets/fonts/playfair-display-latin-wght-normal.woff2',
  variable: '--font-heading',
  display: 'swap',
  weight: '400 900',
})

export const bodyFont = localFont({
  src: '../assets/fonts/inter-latin-wght-normal.woff2',
  variable: '--font-body',
  display: 'swap',
  weight: '100 900',
})
```

---

## `src/assets/fonts/` — font files

Run this terminal command to copy the font binaries from client-site-template:

```bash
mkdir -p src/assets/fonts
cp ../client-site-template/src/assets/fonts/playfair-display-latin-wght-normal.woff2 src/assets/fonts/
cp ../client-site-template/src/assets/fonts/inter-latin-wght-normal.woff2 src/assets/fonts/
cp ../client-site-template/src/assets/fonts/playfair-display-LICENSE src/assets/fonts/
cp ../client-site-template/src/assets/fonts/inter-LICENSE src/assets/fonts/
```

If client-site-template is not in a sibling directory, adjust the path accordingly. The `.woff2` files must be committed — they are self-hosted fonts.

---

## `src/lib/structured-data.ts`

```ts
import { siteConfig } from '@/config/site'

export function personSchema() {
  const { name, description, url, social } = siteConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description,
    url,
    sameAs: [
      social.twitter,
      social.linkedin,
      social.github,
    ].filter(Boolean),
  }
}

export function websiteSchema() {
  const { name, description, url } = siteConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
  }
}
```

---

## `src/app/globals.css`

Delete the generated file. Create with this exact content:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-heading: var(--font-heading);
  --font-body:    var(--font-body);
  --font-sans:    var(--font-body);

  --color-background:  var(--background);
  --color-foreground:  var(--foreground);
  --color-primary:     var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent:      var(--accent);
  --color-accent-foreground:  var(--accent-foreground);

  --color-card:                var(--card);
  --color-card-foreground:     var(--card-foreground);
  --color-popover:             var(--popover);
  --color-popover-foreground:  var(--popover-foreground);
  --color-secondary:           var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:               var(--muted);
  --color-muted-foreground:    var(--muted-foreground);
  --color-destructive:         var(--destructive);
  --color-border:              var(--border);
  --color-input:               var(--input);
  --color-ring:                var(--ring);

  --color-sidebar:                    var(--sidebar);
  --color-sidebar-foreground:         var(--sidebar-foreground);
  --color-sidebar-primary:            var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent:             var(--sidebar-accent);
  --color-sidebar-accent-foreground:  var(--sidebar-accent-foreground);
  --color-sidebar-border:             var(--sidebar-border);
  --color-sidebar-ring:               var(--sidebar-ring);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --radius:    0.5rem;
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);

  --shadow-sm:   0 1px 3px hsl(240 10% 4% / 0.3);
  --shadow-md:   0 4px 16px hsl(240 10% 4% / 0.4);
  --shadow-lg:   0 12px 40px hsl(240 10% 4% / 0.5);
  --shadow-glow: 0 0 32px hsl(240 5% 64% / 0.25);
}

:root {
  --background:         hsl(0 0% 100%);
  --foreground:         hsl(240 10% 4%);
  --card:               hsl(0 0% 100%);
  --card-foreground:    hsl(240 10% 4%);
  --popover:            hsl(0 0% 100%);
  --popover-foreground: hsl(240 10% 4%);
  --primary:            hsl(240 5% 64%);
  --primary-foreground: hsl(240 10% 4%);
  --secondary:          hsl(240 5% 96%);
  --secondary-foreground: hsl(240 10% 4%);
  --muted:              hsl(240 5% 94%);
  --muted-foreground:   hsl(240 5% 45%);
  --accent:             hsl(240 5% 84%);
  --accent-foreground:  hsl(240 10% 4%);
  --destructive:        hsl(0 72% 51%);
  --border:             hsl(240 5% 88%);
  --input:              hsl(240 5% 88%);
  --ring:               hsl(240 5% 64%);
  --chart-1:            hsl(240 5% 64%);
  --chart-2:            hsl(240 5% 50%);
  --chart-3:            hsl(240 5% 38%);
  --chart-4:            hsl(240 5% 28%);
  --chart-5:            hsl(240 5% 18%);
  --sidebar:            hsl(240 5% 96%);
  --sidebar-foreground: hsl(240 10% 4%);
  --sidebar-primary:    hsl(240 5% 64%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent:     hsl(240 5% 90%);
  --sidebar-accent-foreground:  hsl(240 10% 4%);
  --sidebar-border:     hsl(240 5% 88%);
  --sidebar-ring:       hsl(240 5% 64%);
}

.dark {
  --background:         hsl(240 10% 4%);
  --foreground:         hsl(240 5% 95%);
  --card:               hsl(240 8% 7%);
  --card-foreground:    hsl(240 5% 95%);
  --popover:            hsl(240 8% 7%);
  --popover-foreground: hsl(240 5% 95%);
  --primary:            hsl(240 5% 64%);
  --primary-foreground: hsl(240 10% 4%);
  --secondary:          hsl(240 6% 12%);
  --secondary-foreground: hsl(240 5% 95%);
  --muted:              hsl(240 6% 12%);
  --muted-foreground:   hsl(240 5% 55%);
  --accent:             hsl(240 5% 84%);
  --accent-foreground:  hsl(240 10% 4%);
  --destructive:        hsl(0 62% 60%);
  --border:             hsl(240 5% 18%);
  --input:              hsl(240 5% 16%);
  --ring:               hsl(240 5% 64%);
  --chart-1:            hsl(240 5% 84%);
  --chart-2:            hsl(240 5% 64%);
  --chart-3:            hsl(240 5% 48%);
  --chart-4:            hsl(240 5% 34%);
  --chart-5:            hsl(240 5% 22%);
  --sidebar:            hsl(240 8% 7%);
  --sidebar-foreground: hsl(240 5% 95%);
  --sidebar-primary:    hsl(240 5% 64%);
  --sidebar-primary-foreground: hsl(240 10% 4%);
  --sidebar-accent:     hsl(240 6% 12%);
  --sidebar-accent-foreground:  hsl(240 5% 95%);
  --sidebar-border:     hsl(240 5% 18%);
  --sidebar-ring:       hsl(240 5% 64%);
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}

@utility hero-gradient {
  background: radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklch, var(--primary) 15%, transparent), transparent);
}
```

---

## `src/test/setup.ts`

```ts
import '@testing-library/jest-dom'

globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() { return [] }
  unobserve() {}
} as unknown as typeof IntersectionObserver
```

---

## Empty placeholder directories

```bash
mkdir -p src/types src/hooks src/components/ui src/components/common src/components/sections src/components/aceternity src/components/layout public/templates src/content/posts
touch src/types/.gitkeep src/hooks/.gitkeep src/components/ui/.gitkeep src/components/common/.gitkeep src/components/sections/.gitkeep public/templates/.gitkeep src/content/posts/.gitkeep
```

---

## Placeholder images for `/public/templates/`

Create a single shared placeholder so template cards don't 404 in dev:

```bash
mkdir -p public/templates
```

Then create `public/templates/placeholder.jpg` — a simple gray 800×600 rectangle. Use this Node.js one-liner:

```bash
node -e "
const fs = require('fs');
// Minimal valid gray JPEG (1x1 pixel, 800x600 display handled by CSS)
// Use a gray SVG as placeholder instead
const svg = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"800\" height=\"600\"><rect width=\"800\" height=\"600\" fill=\"#1a1a1f\"/><text x=\"400\" y=\"300\" text-anchor=\"middle\" fill=\"#3a3a45\" font-size=\"24\" font-family=\"sans-serif\">Template Preview</text></svg>';
fs.writeFileSync('public/templates/placeholder.svg', svg);
"
```

Then create symlinks so all 9 template slugs resolve without 404:

```bash
cd public/templates
for slug in lumina radiance aurore white-coat apex-smile pearl signal meridian foundry; do
  cp placeholder.svg ${slug}-preview.svg
done
cd ../..
```

Update `src/content/templates.ts` — change all `imagePlaceholder` extensions from `.jpg` to `.svg`:

```bash
sed -i 's/-preview.jpg/-preview.svg/g' src/content/templates.ts
```

These placeholders are replaced with real static images in Task 5.

---

## Verify & commit

```bash
# TypeScript should show only missing-file errors, not missing-package errors
npx tsc --noEmit 2>&1 | grep -v 'Cannot find module' | head -20

git add -A
git commit -m "feat: foundation — motion, fonts, utils, globals.css, structured-data"
```

**STOP HERE.** Apply this worktree. Then open a fresh Cursor agent session and use `step1c-config.md`.
