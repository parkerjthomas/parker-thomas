'use client'

import { useState } from 'react'

import { FocusCards } from '@/components/aceternity/FocusCards'
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
  const cards = items.map((t) => ({
    title: t.title,
    src: t.imagePlaceholder,
  }))

  return (
    <div className="w-full">
      <FocusCards cards={cards} />
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full mt-6',
        )}
      >
        {items.map((t) => (
          <div
            key={t.slug}
            className="flex flex-col items-center text-center gap-1 px-1"
          >
            <p className="text-sm text-muted-foreground">{t.tagline}</p>
            <p className="text-sm font-medium text-foreground tabular-nums">
              {t.priceRange}
            </p>
          </div>
        ))}
      </div>
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
