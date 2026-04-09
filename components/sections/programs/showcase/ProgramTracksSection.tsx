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
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
        {heading}
      </p>
      <h2
        className="font-[family-name:var(--font-darker-grotesque)] font-medium leading-[0.92] text-[#EDEDED] mb-14"
        style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-1.2px' }}
      >
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
            <h3
              className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 42px)', letterSpacing: '-0.8px' }}
            >
              {track.title}
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[17px] leading-relaxed text-[#EDEDED] opacity-72">
              {track.body}
            </p>
          </>
        )}
      />
    </section>
  )
}
