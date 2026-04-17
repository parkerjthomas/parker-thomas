import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import AgenciesCompare from '@/components/sections/AgenciesCompare'
import AgenciesCta from '@/components/sections/AgenciesCta'
import AgenciesHero from '@/components/sections/AgenciesHero'
import AgenciesStickyScroll from '@/components/sections/AgenciesStickyScroll'

export const metadata: Metadata = {
  title: 'For Agencies',
  description:
    'White-label web design for boutique marketing agencies. Celebrity-quality sites, delivered under your brand.',
  openGraph: {
    url: `${siteConfig.url}/for-agencies`,
  },
  alternates: {
    canonical: `${siteConfig.url}/for-agencies`,
  },
}

export default function ForAgenciesPage() {
  return (
    <>
      <AgenciesHero />
      <AgenciesCompare />
      <AgenciesStickyScroll />
      <AgenciesCta />
    </>
  )
}
