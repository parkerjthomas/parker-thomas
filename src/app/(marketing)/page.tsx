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
