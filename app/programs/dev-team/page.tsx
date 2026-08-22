import type { Metadata } from 'next'
import { getProgramBySlug } from '@/lib/sanity/queries'
import DevTeamShowcase from '@/components/sections/programs/showcase/programs/DevTeamShowcase'
import { loadDevTeamStartupAsciiArt } from '@/lib/program-showcase/load-dev-team-startup-ascii'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Dev Team',
  description: SITE_DESCRIPTION,
}

export default async function DevTeamPage() {
  const program = await getProgramBySlug('dev-team')
  const startupAsciiArtById = await loadDevTeamStartupAsciiArt()
  return <DevTeamShowcase program={program} startupAsciiArtById={startupAsciiArtById} />
}
