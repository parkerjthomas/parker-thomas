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
