'use client'

import Link from 'next/link'

import { AuroraBackground } from '@/components/aceternity/AuroraBackground'
import { LampContainer } from '@/components/aceternity/LampEffect'
import { ButtonMovingBorder } from '@/components/aceternity/MovingBorder'
import { Spotlight } from '@/components/aceternity/SpotlightNew'
import { TextGenerateEffect } from '@/components/aceternity/TextGenerateEffect'
import { TypewriterEffectSmooth } from '@/components/aceternity/TypewriterEffect'
import { buttonVariants } from '@/components/ui/button'
import { homeContent } from '@/content/home'
import { cn } from '@/lib/utils'

const typewriterWords = homeContent.hero.typewriterItems[0]
  .split(' ')
  .map((text) => ({
    text,
    className: 'text-muted-foreground',
  }))

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="sr-only">
        {homeContent.hero.headline}
      </h1>
      <AuroraBackground>
        <Spotlight />
        <LampContainer
          className={cn(
            'min-h-[100dvh] w-full max-w-6xl rounded-none border-0 bg-transparent shadow-none',
            '[&>div:last-child]:-translate-y-28 md:[&>div:last-child]:-translate-y-72 lg:[&>div:last-child]:-translate-y-80',
          )}
        >
          <div className="flex max-w-3xl flex-col items-center gap-2 px-2 text-center">
            <TextGenerateEffect
              words={homeContent.hero.headline}
              className={cn(
                'font-display font-semibold',
                '[&_div_div]:text-balance [&_div_div]:text-3xl [&_div_div]:leading-tight [&_div_div]:tracking-tight',
                'md:[&_div_div]:text-5xl lg:[&_div_div]:text-6xl',
                '[&_span]:text-foreground',
              )}
              duration={0.45}
            />
            <TypewriterEffectSmooth
              words={typewriterWords}
              className="my-4 max-w-2xl justify-center font-sans font-normal"
              cursorClassName="bg-primary opacity-0"
            />
            <div className="mt-4 flex flex-col items-center gap-4 sm:mt-6 sm:flex-row sm:justify-center">
              <ButtonMovingBorder
                as={Link}
                href={homeContent.hero.primaryCta.href}
                borderRadius="1rem"
                containerClassName="h-12 w-auto min-w-[10rem]"
                className="bg-background/90 text-sm font-medium text-foreground backdrop-blur-sm"
              >
                {homeContent.hero.primaryCta.label}
              </ButtonMovingBorder>
              <Link
                href={homeContent.hero.secondaryCta.href}
                className={buttonVariants({ variant: 'ghost', size: 'lg' })}
              >
                {homeContent.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </LampContainer>
      </AuroraBackground>
    </section>
  )
}
