import type { Metadata } from 'next'
import ProgramShowcasePageClient from '@/components/sections/programs/ProgramShowcasePageClient'
import { getProgramBySlug } from '@/lib/sanity/queries'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Tech Treks',
  description: SITE_DESCRIPTION,
}

export default async function TechTreksPage() {
  const program = await getProgramBySlug('tech-treks')
  return <ProgramShowcasePageClient program={program} variant="tech-treks" />
}
