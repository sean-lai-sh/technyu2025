import React from 'react'
import type { ProgramStageMeta } from '../types'

type ProgramJourneyRailProps = {
  stages: ProgramStageMeta[]
}

export default function ProgramJourneyRail({ stages }: ProgramJourneyRailProps) {
  return (
    <div className="relative">
      <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <article
            key={stage.name}
            className="relative border border-white/10 bg-white/[0.03] px-4 py-4 pl-11 backdrop-blur-[1px]"
            style={{
              boxShadow: `inset 0 0 0 1px ${stage.accentSoft}`,
            }}
          >
            <span
              className="absolute left-3.5 top-4.5 h-5 w-5 border border-black/40"
              style={{
                background: stage.accent,
                boxShadow: `0 0 18px ${stage.accentSoft}`,
              }}
              aria-hidden="true"
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              0{index + 1}
            </p>
            <div className="mt-1 flex items-start justify-between gap-4">
              <h3 className="font-[family-name:var(--font-darker-grotesque)] text-2xl leading-none text-white">
                {stage.label}
              </h3>
              <span className="border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">
                {stage.name}
              </span>
            </div>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/66">
              {stage.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
