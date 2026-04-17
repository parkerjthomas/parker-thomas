'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { PostMeta } from '@/lib/posts'
import { cn } from '@/lib/utils'

/** Card grid with hover focus — same interaction pattern as Aceternity Card Hover Effect (no raw registry import). */
export function BlogCardHoverEffect({ posts }: { posts: PostMeta[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      {posts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/writing/${post.slug}`}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            'block rounded-xl border border-border bg-card p-6 transition-all duration-300 ease-out',
            hovered !== null &&
              hovered !== index &&
              'opacity-45 scale-[0.99] blur-[0.3px]',
          )}
        >
          <h2 className="text-xl font-semibold tracking-tight text-card-foreground mb-2">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{post.description}</p>
        </Link>
      ))}
    </div>
  )
}
