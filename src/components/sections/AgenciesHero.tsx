import { agenciesContent } from '@/content/agencies'

export default function AgenciesHero() {
  return (
    <section
      className="px-4 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16"
      aria-labelledby="agencies-hero-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {agenciesContent.hero.eyebrow}
        </p>
        <h1
          id="agencies-hero-heading"
          className="font-display mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          {agenciesContent.hero.headline}
        </h1>
        <p className="mt-4 font-sans text-pretty text-base text-muted-foreground md:text-lg">
          {agenciesContent.hero.subheadline}
        </p>
      </div>
    </section>
  )
}
