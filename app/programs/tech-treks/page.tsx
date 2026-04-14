import type { Metadata } from 'next'
import { getProgramBySlug } from '@/lib/sanity/queries'
import TechTreksShowcase from '@/components/sections/programs/showcase/programs/TechTreksShowcase'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Tech Treks by Tech@NYU',
  description: SITE_DESCRIPTION,
}

export default async function TechTreksPage() {
  const program = await getProgramBySlug('tech-treks')
  return <TechTreksShowcase program={program} />
}
