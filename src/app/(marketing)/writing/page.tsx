import type { Metadata } from 'next'

import { BlogCardHoverEffect } from '@/components/aceternity/CardHoverEffect'
import { ContactForm } from '@/components/sections/ContactForm'
import { siteConfig } from '@/config/site'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Thoughts on web design, local business growth, and building in public.',
  openGraph: { url: `${siteConfig.url}/writing` },
  alternates: { canonical: `${siteConfig.url}/writing` },
}

export default function WritingPage() {
  const posts = getAllPosts()
  return (
    <section className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Writing</h1>
        <p className="text-muted-foreground mb-12">
          Thoughts on web design, local business, and building in public.
        </p>
        {posts.length > 0 ? (
          <BlogCardHoverEffect posts={posts} />
        ) : (
          <p className="text-muted-foreground text-sm">No posts yet — check back soon.</p>
        )}

        <section className="mt-24 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-2">Have a project in mind?</h2>
          <p className="text-muted-foreground mb-8">
            Tell me about your business. No pitch decks, no phone tag.
          </p>
          <ContactForm />
        </section>
      </div>
    </section>
  )
}
