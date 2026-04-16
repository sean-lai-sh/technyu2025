'use client'

import { SanityProgram } from '@/lib/types'
import TechTreksHeroSection from '../TechTreksHeroSection'
import ProgramAboutSection from '../ProgramAboutSection'
import ProgramPillarsSection from '../ProgramPillarsSection'
import ProgramAlumniSection from '../ProgramAlumniSection'
import ProgramCompanyGridSection from '../ProgramCompanyGridSection'
import ProgramTracksSection from '../ProgramTracksSection'
import ProgramRolesSection from '../ProgramRolesSection'
import ProgramFinalSection from '../ProgramFinalSection'
import { getCtaSection, getRolesSection, portableTextToPlainText } from '../utils'
import { CircuitWireframe, NetworkGrowthWireframe, RocketWireframe } from '../wireframes'
import {
  techTreksApproachCards,
  techTreksApproachImages,
  techTreksPillars,
  techTreksShowcaseContent,
  techTreksTestimonials,
  techTreksTracks,
  techTreksCompanyLogos,
} from '../data/tech-treks'


type TechTreksShowcaseProps = {
  program?: SanityProgram | null
}

export default function TechTreksShowcase({ program }: TechTreksShowcaseProps) {
  const rolesSection = getRolesSection(program)
  const ctaSection = getCtaSection(program)
  const resolvedApproachTitle = program?.tagline || techTreksShowcaseContent.approachTitle
  const resolvedFinalBody =
    portableTextToPlainText(ctaSection?.body) || program?.descriptionSmall || techTreksShowcaseContent.finalBody

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] overflow-x-hidden">
      <TechTreksHeroSection program={program} />

      {/* Companies first — aspirational, shows where they'll go */}
      <ProgramCompanyGridSection
        eyebrow={techTreksShowcaseContent.companyGridEyebrow}
        title={techTreksShowcaseContent.companyGridTitle}
        logos={techTreksCompanyLogos}
        footnote={techTreksShowcaseContent.companyGridFootnote}
      />

      {/* Social proof second */}
      <ProgramAlumniSection testimonials={techTreksTestimonials} />

      {/* What you'll do */}
      <ProgramPillarsSection
        heading={techTreksShowcaseContent.pillarsHeading}
        title={techTreksShowcaseContent.pillarsTitle}
        pillars={techTreksPillars}
      />

      {/* Program approach detail */}
      <ProgramAboutSection
        title={resolvedApproachTitle}
        cards={techTreksApproachCards}
        images={techTreksApproachImages}
        renderFallbackVisual={(index) => {
          if (index === 0) return <CircuitWireframe />
          if (index === 1) return <RocketWireframe />
          return <NetworkGrowthWireframe />
        }}
      />

      <ProgramTracksSection
        heading={techTreksShowcaseContent.trackHeading}
        titleLines={techTreksShowcaseContent.tracksTitle.split('\n')}
        tracks={techTreksTracks}
      />

      {rolesSection && <ProgramRolesSection rolesSection={rolesSection} />}

      <ProgramFinalSection
        kicker={techTreksShowcaseContent.finalKicker}
        title={techTreksShowcaseContent.finalTitle}
        accent={techTreksShowcaseContent.finalAccent}
        body={resolvedFinalBody}
        closedHint={techTreksShowcaseContent.finalClosedHint}
        apply={program?.apply}
      />
    </div>
  )
}
