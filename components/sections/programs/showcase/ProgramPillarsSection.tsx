'use client'

import React from 'react'
import { ProgramPillar } from './types'

type ProgramPillarsSectionProps = {
  heading: string
  title: string
  pillars: ProgramPillar[]
}

export default function ProgramPillarsSection({
  heading,
  title,
  pillars,
}: ProgramPillarsSectionProps) {
  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
        {heading}
      </p>
      <h2
        className="font-[family-name:var(--font-satoshi)] font-medium leading-[0.92] text-[#EDEDED] mb-12"
        style={{ fontSize: 'clamp(36px, 5vw, 62px)', letterSpacing: '-1px' }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((pillar, index) => (
          <article
            key={pillar.id}
            className="border border-[#EDEDED]/20 bg-black/40 px-6 py-7"
          >
            <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.14em] uppercase text-[#4DFF94]/85 mb-4">
              Step {String(index + 1).padStart(2, '0')}
            </p>
            <h3
              className="font-[family-name:var(--font-satoshi)] text-[#EDEDED] leading-tight mb-3"
              style={{ fontSize: 'clamp(26px, 2.4vw, 34px)', letterSpacing: '-0.6px' }}
            >
              {pillar.title}
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-[#EDEDED]/72 mb-5">
              {pillar.description}
            </p>
            <div className="pt-4 border-t border-[#EDEDED]/12">
              <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.12em] uppercase text-[#EDEDED]/45 mb-1">
                Outcome
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] leading-relaxed text-[#EDEDED]/82">
                {pillar.outcome}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
