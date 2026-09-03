'use client'

import React from 'react'
import SteppedTimeline from '@/components/ui/stepped-timeline'
import { ProgramTrack } from './types'

type ProgramTracksSectionProps = {
  heading: string
  titleLines: string[]
  tracks: ProgramTrack[]
}

export default function ProgramTracksSection({
  heading,
  titleLines,
  tracks,
}: ProgramTracksSectionProps) {
  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-white/10">
      <p className="font-[family-name:var(--font-inter)] text-[12px] font-semibold tracking-[0.22em] uppercase text-white/48 mb-4">
        {heading}
      </p>
      <h2 className="text-display-2 text-white mb-14">
        {titleLines.map((line, index) => (
          <React.Fragment key={line}>
            {line}
            {index < titleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <SteppedTimeline
        items={tracks}
        ariaLabel={`${heading} timeline`}
        renderPanel={(track) => (
          <>
            <h3 className="text-display-3 text-white mb-4">
              {track.title}
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[17px] leading-relaxed text-white/72">
              {track.body}
            </p>
          </>
        )}
      />
    </section>
  )
}
