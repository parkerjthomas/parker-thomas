import type { Metadata } from 'next'

import TemplatesGallery from '@/components/sections/TemplatesGallery'

export const metadata: Metadata = {
  title: 'Templates',
  description:
    'Celebrity-quality website templates for medspas, cosmetic dentistry, and boutique agencies.',
}

export default function TemplatesPage() {
  return <TemplatesGallery />
}
