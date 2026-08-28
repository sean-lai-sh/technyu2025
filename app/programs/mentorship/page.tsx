import type { Metadata } from 'next'
import DynamicProgramPage from '@/components/sections/programs/DynamicProgramPage'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Mentorship',
  description: SITE_DESCRIPTION,
}

export default function MentorshipPage() {
  return <DynamicProgramPage slug="mentorship" />
}
