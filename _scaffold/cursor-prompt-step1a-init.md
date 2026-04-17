# Cursor Prompt — Step 1a: Init

**Run this first. Run nothing else until this is done.**

You are initializing the `parker-thomas` repo. It already exists at `github.com/parkerjthomas/parker-thomas` and is empty. You have already cloned it locally. Execute the following steps in order in the terminal.

---

## Step 1 — Scaffold Next.js

```bash
npx create-next-app@16.2.2 . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --skip-install
```

If prompted about Turbopack, answer **No**.

---

## Step 2 — Install production dependencies

```bash
npm install \
  next@16.2.2 \
  react@19.2.4 \
  react-dom@19.2.4 \
  framer-motion@^12.38.0 \
  gsap@^3.14.2 \
  lucide-react@^1.7.0 \
  next-themes@^0.4.6 \
  clsx@^2.1.1 \
  tailwind-merge@^3.5.0 \
  class-variance-authority@^0.7.1 \
  @radix-ui/react-slot@^1.2.4 \
  @base-ui/react@^1.3.0 \
  react-hook-form@^7.72.1 \
  @hookform/resolvers@^5.2.2 \
  zod@^4.3.6 \
  tw-animate-css@^1.4.0 \
  shadcn@^4.2.0 \
  resend@^4.0.0 \
  @next/mdx@^16.2.2 \
  @mdx-js/loader@^3.0.0 \
  @mdx-js/react@^3.0.0 \
  gray-matter@^4.0.3
```

---

## Step 3 — Install dev dependencies

```bash
npm install -D \
  tailwindcss@^4 \
  @tailwindcss/postcss@^4 \
  typescript@^5 \
  @types/node@^20 \
  @types/react@^19 \
  @types/react-dom@^19 \
  eslint@^9 \
  eslint-config-next@16.2.2 \
  vitest@^4.1.4 \
  @vitejs/plugin-react@^6.0.1 \
  @testing-library/react@^16.3.2 \
  @testing-library/jest-dom@^6.9.1 \
  @testing-library/user-event@^14.6.1 \
  jsdom@^29.0.2
```

---

## Step 4 — Replace package.json

Replace the generated `package.json` entirely with:

```json
{
  "name": "parker-thomas",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest",
    "test:run": "vitest run"
  },
  "dependencies": {
    "@base-ui/react": "^1.3.0",
    "@hookform/resolvers": "^5.2.2",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "@next/mdx": "^16.2.2",
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.38.0",
    "gray-matter": "^4.0.3",
    "gsap": "^3.14.2",
    "lucide-react": "^1.7.0",
    "next": "16.2.2",
    "next-themes": "^0.4.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.72.1",
    "resend": "^4.0.0",
    "shadcn": "^4.2.0",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9",
    "eslint-config-next": "16.2.2",
    "jsdom": "^29.0.2",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.1.4"
  }
}
```

---

## Step 5 — Replace next.config.ts

```ts
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
```

---

## Step 6 — Replace .gitignore

```
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions
/coverage
/.next/
/out/
/build
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.env*
.vercel
*.tsbuildinfo
next-env.d.ts

# shadcn / Aceternity (contains API keys — never commit)
components.json

# Task Master MCP config (contains API keys — never commit)
.cursor/mcp.json
```

---

## Step 7 — Create AGENTS.md and CLAUDE.md

**`AGENTS.md`:**
```md
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
```

**`CLAUDE.md`:**
```md
@AGENTS.md
```

---

## Step 8 — Install Cursor Skills

Run each command. Skills install into `.cursor/skills/` and give the agent live domain knowledge for every task.

```bash
# Design & frontend quality
npx skills add anthropics/claude-code/frontend-design
npx skills add vercel-labs/agent-skills/web-design-guidelines
npx skills add coreyhaines31/marketingskills/site-architecture

# Vercel / Next.js / stack
npx skills add vercel-labs/agent-skills/vercel-react-best-practices
npx skills add vercel-labs/agent-skills/vercel-composition-patterns
npx skills add vercel-labs/next-skills/next-best-practices
npx skills add vercel-labs/agent-skills/deploy-to-vercel

# Shadcn + Tailwind
npx skills add shadcn/ui/shadcn
npx skills add wshobson/agents/tailwind-design-system

# Development workflow
npx skills add obra/superpowers/systematic-debugging
npx skills add obra/superpowers/test-driven-development
```

Expected: each command prints a confirmation. No errors. If a skill is not found, skip it and continue.

---

## Step 9 — Verify install

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: TypeScript errors about missing files — that's fine. There must be **no** errors about missing packages or wrong versions.

---

## Step 10 — First commit

```bash
git add -A
git commit -m "chore: initialize parker-thomas — next 16.2.2, tailwind v4, mdx, resend"
git push origin main
```

---

**STOP HERE.** Open a fresh Cursor agent session and use `step1b-foundation.md` next.
