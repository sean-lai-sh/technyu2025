import type { Metadata } from 'next'
import ProgramShowcasePageClient from '@/components/sections/programs/ProgramShowcasePageClient'
import { getProgramBySlug } from '@/lib/sanity/queries'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Mentorship',
  description: SITE_DESCRIPTION,
}

export default async function MentorshipPage() {
  const program = await getProgramBySlug('mentorship')
  return <ProgramShowcasePageClient program={program} variant="mentorship" />
}
