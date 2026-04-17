import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Thoughts on web design, local business growth, and building in public.',
  openGraph: {
    url: `${siteConfig.url}/writing`,
  },
  alternates: {
    canonical: `${siteConfig.url}/writing`,
  },
}

export default function WritingPage() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground text-sm">Blog index coming in Task 9</p>
    </section>
  )
}
