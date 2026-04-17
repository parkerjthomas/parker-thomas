import { describe, it, expect } from 'vitest'
import { siteConfig } from '@/config/site'
import { homeContent } from '@/content/home'
import { templates } from '@/content/templates'
import { navItems, navCta } from '@/config/navigation'

describe('Site config', () => {
  it('has correct name', () => {
    expect(siteConfig.name).toBe('Parker Thomas')
  })

  it('has correct url', () => {
    expect(siteConfig.url).toBe('https://parker-thomas.com')
  })

  it('has all social links', () => {
    expect(siteConfig.social.twitter).toBeTruthy()
    expect(siteConfig.social.linkedin).toBeTruthy()
    expect(siteConfig.social.github).toBeTruthy()
  })
})

describe('Locked hero copy', () => {
  it('headline matches locked copy exactly', () => {
    expect(homeContent.hero.headline).toBe(
      'I build the web presence. Then I build what fills it.',
    )
  })

  it('typewriter sub matches locked copy', () => {
    expect(homeContent.hero.typewriterItems[0]).toBe(
      "Built for the businesses that can't afford to look average.",
    )
  })

  it('primary CTA goes to /templates', () => {
    expect(homeContent.hero.primaryCta.href).toBe('/templates')
  })

  it('secondary CTA goes to /for-agencies', () => {
    expect(homeContent.hero.secondaryCta.href).toBe('/for-agencies')
  })
})

describe('Templates data', () => {
  it('has exactly 9 templates', () => {
    expect(templates).toHaveLength(9)
  })

  it('covers all 3 verticals', () => {
    const verticals = new Set(templates.map((t) => t.vertical))
    expect(verticals.has('medspa')).toBe(true)
    expect(verticals.has('dental')).toBe(true)
    expect(verticals.has('agency')).toBe(true)
  })

  it('has 3 templates per vertical', () => {
    const byVertical = templates.reduce(
      (acc, t) => {
        acc[t.vertical] = (acc[t.vertical] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    expect(byVertical.medspa).toBe(3)
    expect(byVertical.dental).toBe(3)
    expect(byVertical.agency).toBe(3)
  })

  it('every template has required fields', () => {
    templates.forEach((t) => {
      expect(t.slug).toBeTruthy()
      expect(t.title).toBeTruthy()
      expect(t.tagline).toBeTruthy()
      expect(t.priceRange).toBeTruthy()
    })
  })
})

describe('Navigation', () => {
  it('has 3 nav items', () => {
    expect(navItems).toHaveLength(3)
  })

  it('nav items have valid hrefs', () => {
    navItems.forEach((item) => {
      expect(item.href).toMatch(/^\//)
    })
  })

  it('CTA goes to /templates', () => {
    expect(navCta.href).toBe('/templates')
  })
})

describe('Home content shape', () => {
  it('has all required sections', () => {
    expect(homeContent.hero).toBeDefined()
    expect(homeContent.about).toBeDefined()
    expect(homeContent.services).toBeDefined()
    expect(homeContent.cta).toBeDefined()
  })

  it('services has 3 items', () => {
    expect(homeContent.services.items).toHaveLength(3)
  })

  it('every service item has title and description', () => {
    homeContent.services.items.forEach((item) => {
      expect(item.title).toBeTruthy()
      expect(item.description).toBeTruthy()
    })
  })
})
