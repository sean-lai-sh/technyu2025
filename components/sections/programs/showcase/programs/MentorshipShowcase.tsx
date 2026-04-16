'use client'

import { SanityProgram } from '@/lib/types'
import MentorshipAsciiHeroSection from '../MentorshipAsciiHeroSection'
import ProgramAboutSection from '../ProgramAboutSection'
import ProgramAlumniSection from '../ProgramAlumniSection'
import ProgramTracksSection from '../ProgramTracksSection'
import ProgramFinalSection from '../ProgramFinalSection'
import StandardBuildTabsSection from '../StandardBuildTabsSection'
import { getCtaSection, portableTextToPlainText } from '../utils'
import { CircuitWireframe, NetworkGrowthWireframe, RocketWireframe } from '../wireframes'
import {
  mentorshipApproachCards,
  mentorshipApproachImages,
  mentorshipBuildImages,
  mentorshipBuildTabs,
  mentorshipShowcaseContent,
  mentorshipTestimonials,
  mentorshipTracks,
} from '../data/mentorship'

type MentorshipShowcaseProps = {
  program?: SanityProgram | null
}

export default function MentorshipShowcase({ program }: MentorshipShowcaseProps) {
  const ctaSection = getCtaSection(program)
  const resolvedFinalBody =
    portableTextToPlainText(ctaSection?.body) || program?.descriptionSmall || mentorshipShowcaseContent.finalBody

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] overflow-x-hidden">
      <MentorshipAsciiHeroSection
        program={program}
        heroDescription={mentorshipShowcaseContent.heroDescription}
      />

      <ProgramAboutSection
        eyebrow="Our Approach"
        title={mentorshipShowcaseContent.approachTitle}
        cards={mentorshipApproachCards}
        images={mentorshipApproachImages}
        renderFallbackVisual={(index) => {
          if (index === 0) return <CircuitWireframe />
          if (index === 1) return <RocketWireframe />
          return <NetworkGrowthWireframe />
        }}
      />

      <ProgramAlumniSection testimonials={mentorshipTestimonials} />

      <StandardBuildTabsSection
        buildEyebrow={mentorshipShowcaseContent.buildEyebrow}
        buildTitle={mentorshipShowcaseContent.buildTitle}
        buildTabs={mentorshipBuildTabs}
        buildImages={mentorshipBuildImages}
      />

      <ProgramTracksSection
        heading={mentorshipShowcaseContent.trackHeading}
        titleLines={mentorshipShowcaseContent.tracksTitle.split('\n')}
        tracks={mentorshipTracks}
      />

      <ProgramFinalSection
        kicker={mentorshipShowcaseContent.finalKicker}
        title={mentorshipShowcaseContent.finalTitle}
        accent={mentorshipShowcaseContent.finalAccent}
        body={resolvedFinalBody}
        closedHint={mentorshipShowcaseContent.finalClosedHint}
        apply={program?.apply}
      />
    </div>
  )
}
