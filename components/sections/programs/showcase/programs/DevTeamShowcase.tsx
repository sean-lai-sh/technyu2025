'use client'

import { SanityProgram } from '@/lib/types'
import ProgramHeroSection from '../ProgramHeroSection'
import ProgramAboutSection from '../ProgramAboutSection'
import ProgramAlumniSection from '../ProgramAlumniSection'
import ProgramTracksSection from '../ProgramTracksSection'
import ProgramRolesSection from '../ProgramRolesSection'
import ProgramFinalSection from '../ProgramFinalSection'
import DevTeamStartupPortfolioSection from '../DevTeamStartupPortfolioSection'
import { CircuitWireframe, HeroWireframe, NetworkGrowthWireframe, RocketWireframe } from '../wireframes'
import { getRolesSection, toHeroTitle } from '../utils'
import {
  devTeamApproachCards,
  devTeamBuildTabs,
  devTeamShowcaseContent,
  devTeamTestimonials,
  devTeamTracks,
} from '../data/dev-team'

type DevTeamShowcaseProps = {
  program?: SanityProgram | null
  startupAsciiArtById?: Partial<Record<string, string>>
}

export default function DevTeamShowcase({ program, startupAsciiArtById }: DevTeamShowcaseProps) {
  const rolesSection = getRolesSection(program)
  const resolvedHeroTitle = toHeroTitle(program?.name) || devTeamShowcaseContent.heroTitle
  const resolvedHeroDescription = program?.descriptionLarge || program?.tagline || devTeamShowcaseContent.heroDescription
  const resolvedApproachTitle = program?.tagline || devTeamShowcaseContent.approachTitle

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] overflow-x-hidden">
      <ProgramHeroSection
        program={program}
        heroTitleLines={resolvedHeroTitle.split('\n')}
        heroDescription={resolvedHeroDescription}
        applyStatusFallback={devTeamShowcaseContent.applyStatusFallback}
        heroVisual="wireframe"
        heroWireframe={<HeroWireframe />}
      />

      <ProgramAboutSection
        title={resolvedApproachTitle}
        cards={devTeamApproachCards}
        renderFallbackVisual={(index) => {
          if (index === 0) return <CircuitWireframe />
          if (index === 1) return <RocketWireframe />
          return <NetworkGrowthWireframe />
        }}
      />

      <ProgramAlumniSection testimonials={devTeamTestimonials} />

      <DevTeamStartupPortfolioSection
        buildEyebrow={devTeamShowcaseContent.buildEyebrow}
        buildTitle={devTeamShowcaseContent.buildTitle}
        buildTabs={devTeamBuildTabs}
        startupAsciiArtById={startupAsciiArtById}
      />

      <ProgramTracksSection
        heading={devTeamShowcaseContent.trackHeading}
        titleLines={devTeamShowcaseContent.tracksTitle.split('\n')}
        tracks={devTeamTracks}
      />

      {rolesSection && <ProgramRolesSection rolesSection={rolesSection} />}

      <ProgramFinalSection
        kicker="For Companies"
        title="Have something worth"
        accent="building together?"
        body={devTeamShowcaseContent.finalBody}
        contactHref={devTeamShowcaseContent.contactHref}
        contactLabel={devTeamShowcaseContent.contactLabel}
      />
    </div>
  )
}
