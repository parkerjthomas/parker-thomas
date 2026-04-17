import localFont from 'next/font/local'

export const headingFont = localFont({
  src: '../assets/fonts/playfair-display-latin-wght-normal.woff2',
  variable: '--font-heading',
  display: 'swap',
  weight: '400 900',
})

export const bodyFont = localFont({
  src: '../assets/fonts/inter-latin-wght-normal.woff2',
  variable: '--font-body',
  display: 'swap',
  weight: '100 900',
})
