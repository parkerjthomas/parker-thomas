export interface TemplatePreview {
  slug: string
  title: string
  vertical: 'medspa' | 'dental' | 'agency'
  tagline: string
  imagePlaceholder: string
  priceRange: string
}

export const templates: TemplatePreview[] = [
  {
    slug: 'lumina',
    title: 'Lumina',
    vertical: 'medspa',
    tagline: 'Luxury medspa and esthetics',
    imagePlaceholder: '/templates/lumina-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'radiance',
    title: 'Radiance',
    vertical: 'medspa',
    tagline: 'Modern skincare and wellness',
    imagePlaceholder: '/templates/radiance-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'aurore',
    title: 'Aurore',
    vertical: 'medspa',
    tagline: 'Premium esthetic clinic',
    imagePlaceholder: '/templates/aurore-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'white-coat',
    title: 'White Coat',
    vertical: 'dental',
    tagline: 'Cosmetic and general dentistry',
    imagePlaceholder: '/templates/white-coat-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'apex-smile',
    title: 'Apex Smile',
    vertical: 'dental',
    tagline: 'High-end smile design',
    imagePlaceholder: '/templates/apex-smile-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'pearl',
    title: 'Pearl',
    vertical: 'dental',
    tagline: 'Boutique family dentistry',
    imagePlaceholder: '/templates/pearl-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'signal',
    title: 'Signal',
    vertical: 'agency',
    tagline: 'Boutique marketing agency',
    imagePlaceholder: '/templates/signal-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'meridian',
    title: 'Meridian',
    vertical: 'agency',
    tagline: 'Full-service creative agency',
    imagePlaceholder: '/templates/meridian-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
  {
    slug: 'foundry',
    title: 'Foundry',
    vertical: 'agency',
    tagline: 'Growth and performance agency',
    imagePlaceholder: '/templates/foundry-preview.jpg',
    priceRange: '$2,800–$5,500',
  },
]
