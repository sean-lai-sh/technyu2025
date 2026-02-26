import type { Metadata } from 'next'
import DynamicProgramPage from '@/components/sections/programs/DynamicProgramPage'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Tech Treks',
  description: SITE_DESCRIPTION,
}

export default function TechTreksPage() {
  return <DynamicProgramPage slug="tech-treks" />
}
