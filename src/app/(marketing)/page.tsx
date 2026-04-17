import type { Metadata } from 'next'
import AboutSection from '@/components/sections/AboutSection'
import HeroSection from '@/components/sections/HeroSection'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: siteConfig.name },
  description: siteConfig.description,
  openGraph: {
    url: siteConfig.url,
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  )
}
