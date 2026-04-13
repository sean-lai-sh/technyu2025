import type { Metadata } from 'next'
import { getProgramBySlug } from '@/lib/sanity/queries'
import MentorshipShowcase from '@/components/sections/programs/showcase/programs/MentorshipShowcase'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Mentorship',
  description: SITE_DESCRIPTION,
}

export default async function MentorshipPage() {
  const program = await getProgramBySlug('mentorship')
  return <MentorshipShowcase program={program} />
}
