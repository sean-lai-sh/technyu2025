import type { Metadata } from 'next'
import DynamicProgramPage from '@/components/sections/programs/DynamicProgramPage'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Dev Team',
  description: SITE_DESCRIPTION,
}

export default function DevTeamPage() {
  return <DynamicProgramPage slug="dev-team" />
}
