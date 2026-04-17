import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { meta } = getPostBySlug(slug)
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        url: `${siteConfig.url}/writing/${slug}`,
        type: 'article',
        publishedTime: meta.date,
      },
      alternates: { canonical: `${siteConfig.url}/writing/${slug}` },
    }
  } catch {
    return { title: 'Post not found' }
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  let PostContent: ComponentType
  let meta: ReturnType<typeof getPostBySlug>['meta']
  try {
    const mod = (await import(`@/content/posts/${slug}.mdx`)) as {
      default: ComponentType
    }
    PostContent = mod.default
    meta = getPostBySlug(slug).meta
  } catch {
    notFound()
  }

  return (
    <article className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {meta.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3 text-foreground">
            {meta.title}
          </h1>
          <p className="text-muted-foreground text-sm">
            {new Date(meta.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {' · '}
            {meta.author}
          </p>
        </header>
        <div className="max-w-none [&_p:first-of-type]:text-foreground [&_li]:text-muted-foreground">
          <PostContent />
        </div>
      </div>
    </article>
  )
}
