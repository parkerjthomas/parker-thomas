'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { templates } from '@/content/templates'
import type { TemplatePreview } from '@/content/templates'
import { cn } from '@/lib/utils'

type TemplateTab = 'all' | 'medspa' | 'dental' | 'agency'

function filterTemplates(tab: TemplateTab): TemplatePreview[] {
  if (tab === 'all') return templates
  return templates.filter((t) => t.vertical === tab)
}

function TemplateGrid({ items }: { items: TemplatePreview[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto w-full md:grid-cols-3 md:px-8">
      {items.map((t, index) => (
        <article
          key={t.slug}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            'flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 ease-out',
            hovered !== null &&
              hovered !== index &&
              'scale-[0.98] blur-sm opacity-80',
          )}
        >
          <div className="relative h-48 w-full shrink-0 bg-muted md:h-56">
            <Image
              src={t.imagePlaceholder}
              alt={`${t.title} template preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-4"
              unoptimized
            />
          </div>
          <div className="flex flex-col gap-1 px-4 pb-5 pt-4 text-center md:text-left">
            <h3 className="font-semibold text-foreground">{t.title}</h3>
            <p className="text-sm text-muted-foreground">{t.tagline}</p>
            <p className="text-sm font-medium text-foreground tabular-nums">
              {t.priceRange}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function TemplatesGallery() {
  const [tab, setTab] = useState<TemplateTab>('all')

  return (
    <section
      className="py-20 px-4 md:px-8"
      aria-labelledby="templates-gallery-heading"
    >
      <h2
        id="templates-gallery-heading"
        className="font-display text-center text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8"
      >
        Browse Templates
      </h2>

      <Tabs
        value={tab}
        onValueChange={(next) => setTab(next as TemplateTab)}
        className="w-full"
      >
        <TabsList
          variant="line"
          className="mx-auto mb-8 flex w-full max-w-md flex-wrap justify-center sm:max-w-none"
        >
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="medspa">Medspa</TabsTrigger>
          <TabsTrigger value="dental">Dental</TabsTrigger>
          <TabsTrigger value="agency">Agency</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0 outline-none">
          <TemplateGrid items={filterTemplates('all')} />
        </TabsContent>
        <TabsContent value="medspa" className="mt-0 outline-none">
          <TemplateGrid items={filterTemplates('medspa')} />
        </TabsContent>
        <TabsContent value="dental" className="mt-0 outline-none">
          <TemplateGrid items={filterTemplates('dental')} />
        </TabsContent>
        <TabsContent value="agency" className="mt-0 outline-none">
          <TemplateGrid items={filterTemplates('agency')} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
