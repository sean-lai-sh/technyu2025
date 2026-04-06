import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PressArticlePage } from '@/components/press'
import { getAllPressSlugs, getPressPostBySlug } from '@/lib/sanity/queries'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const slugs = await getAllPressSlugs()

  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPressPostBySlug(slug)

  if (!post) {
    return {
      title: 'Press Post Not Found',
      description: SITE_DESCRIPTION,
    }
  }

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || SITE_DESCRIPTION

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      images: post.coverImage.url ? [post.coverImage.url] : [],
    },
  }
}

export default async function PressPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPressPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="bg-[#050505]">
      <PressArticlePage post={post} />
    </main>
  )
}
