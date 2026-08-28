import type { Metadata } from 'next'
import DynamicProgramPage from '@/components/sections/programs/DynamicProgramPage'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'NYSW',
  description: SITE_DESCRIPTION,
}

export default function NyswPage() {
  return (
    <DynamicProgramPage
      slug="nysw"
      fallbackSlug="startup-week"
      fallbackName="NYSW"
      fallbackTitle="New York Startup Week"
      fallbackBody="Tech@NYU brings NYU’s startup community together through student-run speakers, panels, workshops, and networking."
    />
  )
}
