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
