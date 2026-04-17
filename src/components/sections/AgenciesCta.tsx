'use client'

import Link from 'next/link'

import { WobbleCard } from '@/components/aceternity/WobbleCard'
import { buttonVariants } from '@/components/ui/button'
import { agenciesContent } from '@/content/agencies'
import { cn } from '@/lib/utils'

export default function AgenciesCta() {
  const { cta } = agenciesContent

  return (
    <section className="px-4 py-20 md:px-8" aria-labelledby="agencies-cta-heading">
      <WobbleCard
        containerClassName="mx-auto max-w-3xl border border-border !bg-card shadow-lg"
        className="py-12 sm:px-8 sm:py-16"
      >
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2
            id="agencies-cta-heading"
            className="font-display text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {cta.heading}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
            {cta.subheading}
          </p>
          <Link
            href={cta.buttonHref}
            className={cn(buttonVariants({ size: 'lg' }), 'mt-8 inline-flex')}
          >
            {cta.buttonLabel}
          </Link>
        </div>
      </WobbleCard>
    </section>
  )
}
