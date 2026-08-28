import type { Metadata } from 'next'
import DynamicProgramPage from '@/components/sections/programs/DynamicProgramPage'
import { SITE_DESCRIPTION } from '@/lib/seo'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Buildathon',
  description: SITE_DESCRIPTION,
}

export default function BuildathonPage() {
  return (
    <DynamicProgramPage
      slug="buildathon"
      fallbackSlug="startup-week"
      fallbackName="Buildathon"
      fallbackTitle="Buildathon"
      fallbackBody="Tech@NYU’s 48-hour hackathon brings students together to turn ambitious ideas into working projects with a team."
    />
  )
}
