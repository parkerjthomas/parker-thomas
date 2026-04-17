# Cursor Prompt — Step 1d: App Routes

**Prerequisites:** Steps 1a, 1b, and 1c are complete and merged.

**This is a Worktree Agent task.** Select **worktree** from the agent dropdown. When done, click **Apply** to merge back to main.

Create each file below with exact content shown.

---

## `src/app/layout.tsx`

Delete the generated root layout. Replace with:

```tsx
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { headingFont, bodyFont } from '@/lib/fonts'
import { personSchema, websiteSchema } from '@/lib/structured-data'
import { siteConfig } from '@/config/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </body>
    </html>
  )
}
```

---

## `src/app/(marketing)/layout.tsx`

```tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
```

---

## `src/app/(marketing)/page.tsx`

```tsx
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero — added in Task 3 */}
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Hero coming in Task 3</p>
      </section>
    </div>
  )
}
```

---

## `src/app/(marketing)/templates/page.tsx`

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Templates',
  description:
    'Celebrity-quality website templates for medspas, cosmetic dentistry, and boutique agencies. Prices from $2,800.',
}

export default function TemplatesPage() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground text-sm">Templates gallery coming in Task 5</p>
    </section>
  )
}
```

---

## `src/app/(marketing)/for-agencies/page.tsx`

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Agencies',
  description:
    'Partner with Parker Thomas to offer celebrity-quality websites to your clients. White-label ready, Cleris-powered.',
}

export default function ForAgenciesPage() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground text-sm">For Agencies page coming in Task 6</p>
    </section>
  )
}
```

---

## `src/app/(marketing)/writing/page.tsx`

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Thoughts on web design, local business growth, and building in public.',
}

export default function WritingPage() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground text-sm">Blog index coming in Task 9</p>
    </section>
  )
}
```

---

## `src/app/(marketing)/writing/[slug]/page.tsx`

```tsx
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground text-sm">Post: {slug} — MDX rendering coming in Task 9</p>
    </section>
  )
}
```

---

## `src/app/robots.ts`

```ts
import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
```

---

## `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/for-agencies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
```

---

## `src/app/og/route.tsx`

```tsx
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const runtime = 'edge'

export const GET = async () => {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsl(240, 10%, 4%)',
          padding: '80px',
          gap: '24px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(hsl(240,5%,64%,0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(240,5%,64%,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            background:
              'radial-gradient(ellipse at center, hsl(240,5%,64%,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <p
          style={{
            fontSize: '20px',
            fontWeight: 400,
            color: 'hsl(240, 5%, 64%)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {siteConfig.name}
        </p>
        <div
          style={{
            width: '80px',
            height: '1px',
            background: 'hsl(240, 5%, 64%)',
            opacity: 0.4,
          }}
        />
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: 'hsl(240, 5%, 95%)',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: 0,
            maxWidth: '900px',
          }}
        >
          {siteConfig.description}
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'hsl(240, 5%, 45%)',
            margin: 0,
            marginTop: '8px',
          }}
        >
          {siteConfig.url.replace('https://', '')}
        </p>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
```

---

## Verify & commit

```bash
npx tsc --noEmit 2>&1 | head -20

git add -A
git commit -m "feat: all route stubs with metadata, robots, sitemap, og"
```

**STOP HERE.** Apply this worktree. Then open a fresh Cursor agent session and use `step1e-components-skills.md`.
