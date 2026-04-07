import type { Metadata } from 'next'
import { PressIndexList } from '@/components/press'
import Spotlight from '@/components/sections/spotlight'
import { getPressIndex } from '@/lib/sanity/queries'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Press',
  description: SITE_DESCRIPTION,
}

export default async function PressPage() {
  const { posts } = await getPressIndex()

  return (
    <main className="min-h-screen bg-[#050505] text-white] pt-[5svh]">
      <Spotlight />
      <PressIndexList posts={posts} />
    </main>
  )
}
