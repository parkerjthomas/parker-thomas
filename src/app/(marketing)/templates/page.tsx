import type { Metadata } from 'next'

import TemplatesGallery from '@/components/sections/TemplatesGallery'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Templates',
  description:
    'Celebrity-quality website templates for medspas, cosmetic dentistry, and boutique agencies.',
  openGraph: {
    url: `${siteConfig.url}/templates`,
  },
  alternates: {
    canonical: `${siteConfig.url}/templates`,
  },
}

export default function TemplatesPage() {
  return <TemplatesGallery />
}
