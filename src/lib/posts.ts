import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  author: string
  tags?: string[]
  featured?: boolean
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
      const { data } = matter(raw)
      return { slug, ...(data as Omit<PostMeta, 'slug'>) }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { meta: { slug, ...(data as Omit<PostMeta, 'slug'>) }, content }
}
