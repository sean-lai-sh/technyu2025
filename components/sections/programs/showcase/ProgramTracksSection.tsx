'use client'

import React, { useEffect, useState } from 'react'
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
  const [activeTrack, setActiveTrack] = useState(0)

  const activeTrackData = tracks[activeTrack] ?? tracks[0] ?? {
    id: 'fallback',
    label: '',
    title: '',
    body: '',
  }

  useEffect(() => {
    setActiveTrack(0)
  }, [tracks])

  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
        {heading}
      </p>
      <h2
        className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-14"
        style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-1.2px' }}
      >
        {titleLines.map((line, index) => (
          <React.Fragment key={line}>
            {line}
            {index < titleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <div className="overflow-x-auto pb-4 -mx-[5vw] px-[5vw]">
        <div className="flex items-center gap-0 min-w-max relative mb-14">
          {tracks.map((track, i) => (
            <React.Fragment key={track.id}>
              <button
                onClick={() => setActiveTrack(i)}
                className={`font-[family-name:var(--font-inter)] text-[13px] font-medium px-5 py-2.5 border rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeTrack === i
                    ? 'border-[#B300FF] text-[#B300FF]'
                    : 'border-[#EDEDED]/35 text-[#EDEDED]/55 hover:border-[#EDEDED]/60 hover:text-[#EDEDED]/80'
                }`}
                style={activeTrack === i ? { boxShadow: '0 0 14px rgba(179,0,255,0.28)' } : undefined}
              >
                {track.label}
              </button>
              {i < tracks.length - 1 && (
                <div className="w-8 h-px bg-[#EDEDED]/28 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="max-w-[700px]">
        <h3
          className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-4"
          style={{ fontSize: 'clamp(26px, 3vw, 42px)', letterSpacing: '-0.8px' }}
        >
          {activeTrackData.title}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-[17px] leading-relaxed text-[#EDEDED] opacity-72">
          {activeTrackData.body}
        </p>
      </div>
    </section>
  )
}
