'use client'

import { StickyScroll } from '@/components/aceternity/StickyScrollReveal'
import { agenciesContent } from '@/content/agencies'

export default function AgenciesStickyScroll() {
  const content = agenciesContent.valueProps.map((v) => ({
    title: v.title,
    description: v.description,
  }))

  return (
    <section
      className="px-4 py-16 md:px-8"
      aria-label="Partnership value for agencies"
    >
      <StickyScroll content={content} />
    </section>
  )
}
