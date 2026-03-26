import type { Metadata } from 'next'
import { getProgramBySlug } from '@/lib/sanity/queries'
import ProgramShowcasePageClient from '@/components/sections/programs/ProgramShowcasePageClient'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Dev Team',
  description: SITE_DESCRIPTION,
}

export default async function DevTeamPage() {
  const program = await getProgramBySlug('dev-team')
  return <ProgramShowcasePageClient program={program} />
}
