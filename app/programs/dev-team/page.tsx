import type { Metadata } from 'next'
import { getProgramBySlug } from '@/lib/sanity/queries'
import { SITE_DESCRIPTION } from '@/lib/seo'
import DevTeamPageClient from './DevTeamPageClient'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Dev Team',
  description: SITE_DESCRIPTION,
}

export default async function DevTeamPage() {
  const program = await getProgramBySlug('dev-team')
  return <DevTeamPageClient program={program} />
}
