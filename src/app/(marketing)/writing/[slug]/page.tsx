import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <p className="text-muted-foreground text-sm">Post: {slug} — MDX rendering coming in Task 9</p>
    </section>
  )
}
