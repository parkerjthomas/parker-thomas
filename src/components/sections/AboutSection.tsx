'use client'

import {
  IconBuildingStore,
  IconCurrencyDollar,
  IconDental,
  IconLeaf,
  IconRocket,
  IconSparkles,
} from '@tabler/icons-react'
import Link from 'next/link'

import { BentoGrid, BentoGridItem } from '@/components/aceternity/BentoGrid'
import { TracingBeam } from '@/components/aceternity/TracingBeam'
import { buttonVariants } from '@/components/ui/button'
import { homeContent } from '@/content/home'

const bentoIcons = [
  <IconSparkles key="0" className="h-8 w-8 text-primary" />,
  <IconLeaf key="1" className="h-8 w-8 text-primary" />,
  <IconDental key="2" className="h-8 w-8 text-primary" />,
  <IconBuildingStore key="3" className="h-8 w-8 text-primary" />,
  <IconRocket key="4" className="h-8 w-8 text-primary" />,
  <IconCurrencyDollar key="5" className="h-8 w-8 text-primary" />,
]

export default function AboutSection() {
  const { about } = homeContent

  return (
    <TracingBeam className="w-full max-w-7xl">
      <section
        className="py-20 px-4 md:px-8"
        aria-labelledby="about-heading"
      >
        <h2
          id="about-heading"
          className="mb-4 text-center font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          {about.heading}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center font-sans text-muted-foreground">
          {about.body}
        </p>
        <BentoGrid>
          {about.bentoItems.map((item, i) => (
            <BentoGridItem
              key={i}
              icon={bentoIcons[i]}
              title={item.title}
              description={item.description}
              className={
                item.size === 'large'
                  ? 'md:col-span-2'
                  : item.size === 'medium'
                    ? 'md:col-span-1'
                    : ''
              }
            />
          ))}
        </BentoGrid>
        <div className="mt-8 flex justify-center">
          <Link
            href={about.cta.href}
            className={buttonVariants({ variant: 'outline' })}
          >
            {about.cta.label}
          </Link>
        </div>
      </section>
    </TracingBeam>
  )
}
