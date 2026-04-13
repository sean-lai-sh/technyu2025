'use client'

import { SanityProgram } from '@/lib/types'
import ProgramHeroSection from '../ProgramHeroSection'
import ProgramAboutSection from '../ProgramAboutSection'
import ProgramPillarsSection from '../ProgramPillarsSection'
import ProgramAlumniSection from '../ProgramAlumniSection'
import ProgramTracksSection from '../ProgramTracksSection'
import ProgramRolesSection from '../ProgramRolesSection'
import ProgramFinalSection from '../ProgramFinalSection'
import StandardBuildTabsSection from '../StandardBuildTabsSection'
import { getCtaSection, getRolesSection, portableTextToPlainText, toHeroTitle } from '../utils'
import { CircuitWireframe, HeroWireframe, NetworkGrowthWireframe, RocketWireframe } from '../wireframes'
import {
  techTreksApproachCards,
  techTreksApproachImages,
  techTreksBuildImages,
  techTreksBuildTabs,
  techTreksPillars,
  techTreksShowcaseContent,
  techTreksTestimonials,
  techTreksTracks,
} from '../data/tech-treks'

type TechTreksShowcaseProps = {
  program?: SanityProgram | null
}

export default function TechTreksShowcase({ program }: TechTreksShowcaseProps) {
  const rolesSection = getRolesSection(program)
  const ctaSection = getCtaSection(program)
  const resolvedHeroTitle = toHeroTitle(program?.name) || techTreksShowcaseContent.heroTitle
  const resolvedHeroDescription = program?.descriptionLarge || program?.tagline || techTreksShowcaseContent.heroDescription
  const resolvedHeroImage = program?.hero?.heroImageUrl || program?.desktopImageUrl || techTreksShowcaseContent.heroImageFallback
  const resolvedApproachTitle = program?.tagline || techTreksShowcaseContent.approachTitle
  const resolvedFinalBody =
    portableTextToPlainText(ctaSection?.body) || program?.descriptionSmall || techTreksShowcaseContent.finalBody

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] overflow-x-hidden">
      <ProgramHeroSection
        program={program}
        heroTitleLines={resolvedHeroTitle.split('\n')}
        heroDescription={resolvedHeroDescription}
        applyStatusFallback={techTreksShowcaseContent.applyStatusFallback}
        heroVisual="image"
        heroImage={resolvedHeroImage}
        heroWireframe={<HeroWireframe />}
      />

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

      <ProgramPillarsSection
        heading={techTreksShowcaseContent.pillarsHeading}
        title={techTreksShowcaseContent.pillarsTitle}
        pillars={techTreksPillars}
      />

      <ProgramAlumniSection testimonials={techTreksTestimonials} />

      <StandardBuildTabsSection
        buildEyebrow={techTreksShowcaseContent.buildEyebrow}
        buildTitle={techTreksShowcaseContent.buildTitle}
        buildTabs={techTreksBuildTabs}
        buildImages={techTreksBuildImages}
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
