export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Templates', href: '/templates' },
  { label: 'Writing', href: '/writing' },
  { label: 'For Agencies', href: '/for-agencies' },
]

export const navCta: NavItem = {
  label: 'Get a site',
  href: '/templates',
}
