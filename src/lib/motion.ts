import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

export const springs = {
  gentle: { type: 'spring' as const, stiffness: 120, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 18 },
  stiff:  { type: 'spring' as const, stiffness: 500, damping: 30 },
}

export const duration = {
  micro:   0.1,
  ui:      0.2,
  panel:   0.35,
  page:    0.5,
  feature: 0.7,
}

export const gsapDefaults = {
  ease: 'power2.out',
  duration: 0.6,
}

export const gsapScrollDefaults = {
  ease: 'power2.out',
  duration: 0.8,
  scrollTrigger: {
    start: 'top 85%',
    toggleActions: 'play none none none',
  },
}
