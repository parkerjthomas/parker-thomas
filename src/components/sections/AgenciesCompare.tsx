'use client'

import { Compare } from '@/components/aceternity/Compare'
import { agenciesContent } from '@/content/agencies'
import { cn } from '@/lib/utils'

export default function AgenciesCompare() {
  const { compare } = agenciesContent

  return (
    <section
      className="px-4 py-16 md:px-8"
      aria-labelledby="agencies-compare-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="agencies-compare-heading"
          className="font-display text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          {compare.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground md:text-lg">
          {compare.subheading}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div
            className={cn(
              'flex w-full max-w-4xl justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm',
            )}
          >
            <span className="text-left">{compare.beforeLabel}</span>
            <span className="text-right">{compare.afterLabel}</span>
          </div>
          <Compare
            firstImage={compare.beforeImage}
            secondImage={compare.afterImage}
            slideMode="drag"
            className="h-[min(70vw,520px)] w-full max-w-4xl rounded-2xl border border-border bg-muted/30"
            firstImageClassName="rounded-2xl object-cover object-top"
            secondImageClassname="rounded-2xl object-cover object-top"
          />
        </div>
      </div>
    </section>
  )
}
