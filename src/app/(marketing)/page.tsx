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
      <section className="flex min-h-screen items-center justify-center pt-14 md:pt-0">
        <p className="text-muted-foreground text-sm">Hero coming in Task 3</p>
      </section>
    </div>
  )
}
