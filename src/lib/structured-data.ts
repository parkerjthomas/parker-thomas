import { siteConfig } from '@/config/site'

export function personSchema() {
  const { name, description, url, social } = siteConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description,
    url,
    sameAs: [
      social.twitter,
      social.linkedin,
      social.github,
    ].filter(Boolean),
  }
}

export function websiteSchema() {
  const { name, description, url } = siteConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
  }
}
