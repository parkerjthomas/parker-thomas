'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, LayoutTemplate, Menu, PenLine, X } from 'lucide-react'

import { FloatingNav } from '@/components/ui/floating-navbar'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { navItems, navCta } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { slideDown } from '@/lib/motion'
import { cn } from '@/lib/utils'

const navIcons = [LayoutTemplate, PenLine, Building2] as const

export default function FloatingNavbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const items = navItems.map((item, i) => {
    const Icon = navIcons[i] ?? LayoutTemplate
    return {
      name: item.label,
      link: item.href,
      icon: <Icon className="size-4 shrink-0" aria-hidden />,
    }
  })

  return (
    <>
      <div className="hidden md:block">
        <FloatingNav
          navItems={items}
          trailing={
            <>
              <div className="h-5 w-px shrink-0 bg-neutral-200 dark:bg-white/10" />
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <Link
                  href={navCta.href}
                  className={buttonVariants({ size: 'sm' })}
                >
                  {navCta.label}
                </Link>
              </div>
            </>
          }
        />
      </div>

      <header className="fixed top-0 right-0 left-0 z-[5001] border-b border-border/40 bg-background/80 backdrop-blur-md md:hidden">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link
            href="/"
            className="font-heading text-base font-semibold tracking-tight"
          >
            {siteConfig.name}
          </Link>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground"
          >
            {mobileOpen ? (
              <X className="size-6" aria-hidden />
            ) : (
              <Menu className="size-6" aria-hidden />
            )}
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-nav-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideDown}
              className="border-t border-border/40 bg-background px-4 pb-4"
            >
              <nav className="flex flex-col gap-1 pt-2" aria-label="Mobile">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block w-full rounded-md px-3 py-3 text-base text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={navCta.href}
                  className={cn(
                    buttonVariants({ size: 'default' }),
                    'mt-2 w-full justify-center'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {navCta.label}
                </Link>
                <div className="mt-2 flex items-center justify-end border-t border-border/40 pt-2">
                  <ThemeToggle />
                </div>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  )
}
