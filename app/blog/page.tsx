import type { Metadata } from 'next'
import { PressIndexList } from '@/components/press'
import Spotlight from '@/components/sections/spotlight'
import { getPressIndex } from '@/lib/sanity/queries'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: SITE_DESCRIPTION,
}

export default async function BlogPage() {
  const { posts } = await getPressIndex()

  return (
    <main className="min-h-screen bg-surface-base text-white pt-[5svh]">
      <Spotlight />
      <PressIndexList posts={posts} />
    </main>
  )
}
