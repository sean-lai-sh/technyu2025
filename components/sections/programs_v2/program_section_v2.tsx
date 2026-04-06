import React from 'react'
import { getAllPrograms, type ProgramListItem } from '@/lib/sanity/queries'
import { getApplicationLink } from '@/lib/application-links'
import ProgramJourneyRail from './components/program-journey-rail'
import ProgramPanel from './components/program-panel'
import {
  PROGRAM_STAGE_ORDER,
  getOrderedProgramStages,
  getProgramStageMeta,
} from './program-stage-map'
import type { ProgramSource, ProgramV2ViewModel } from './types'

const mapProgramSource = (program: ProgramListItem): ProgramSource => ({
  _id: program._id,
  name: program.name,
  slug: program.slug,
  tagline: program.tagline,
  descriptionSmall: program.descriptionSmall,
  descriptionLarge: program.descriptionLarge,
  svgIconUrl: program.svgIconUrl,
  desktopImageUrl: program.desktopImageUrl,
  apply: program.apply,
})

const resolvePrograms = (programs: ProgramListItem[]) => {
  const byName = new Map(programs.map((program) => [program.name, program]))

  const ordered = PROGRAM_STAGE_ORDER.map((name) => byName.get(name)).filter(
    Boolean
  ) as ProgramListItem[]

  const orderedNames = new Set(ordered.map((program) => program.name))
  const remaining = programs.filter((program) => !orderedNames.has(program.name))

  return [...ordered, ...remaining]
}

const buildProgramViewModel = (program: ProgramListItem): ProgramV2ViewModel => {
  const stage = getProgramStageMeta(program.name)
  const fallbackApplication = getApplicationLink(program.name)
  const isApplicationOpen = program.apply?.status ?? fallbackApplication.status
  const applicationHref = program.apply?.link || fallbackApplication.link || undefined

  const source = mapProgramSource(program)
  const body =
    source.descriptionLarge ||
    source.descriptionSmall ||
    source.tagline ||
    stage.summary

  return {
    ...source,
    stage,
    isApplicationOpen,
    applicationHref,
    body,
    intro: source.descriptionSmall || stage.position,
  }
}

export default async function ProgramSectionV2() {
  const programs = resolvePrograms(await getAllPrograms()).map(buildProgramViewModel)
  const stages = getOrderedProgramStages()

  return (
    <section
      id="programs"
      className="relative overflow-hidden border-t border-white/10 bg-[#070707] px-[5vw] py-[12svh] text-white lg:px-[7vw]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(179,0,255,0.14), transparent 36%), radial-gradient(circle at 75% 0%, rgba(77,255,148,0.08), transparent 34%)',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              Programs
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-darker-grotesque)] text-[clamp(3.5rem,7vw,7.75rem)] leading-[0.9] tracking-[-0.04em] text-white">
              One club, four ways to grow.
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/68 sm:text-[18px]">
              Tech@NYU works best when the path is clear. Each program is a
              different entry point into the same community, moving from
              discovery to refinement, practice, and eventually giving back.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Four-stage progression
              </span>
              <span className="border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Clear program fit
              </span>
              <span className="border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Applications by cohort
              </span>
            </div>
          </div>

          <div>
            <div className="border border-white/10 bg-white/[0.02] p-4 sm:p-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                The map
              </p>
              <ProgramJourneyRail stages={stages} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              Program intro
            </p>
            <h3 className="mt-4 font-[family-name:var(--font-darker-grotesque)] text-[clamp(2.4rem,4.8vw,4.8rem)] leading-[0.92] tracking-[-0.03em] text-white">
              Find the role, then learn it well.
            </h3>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/64 sm:text-[17px]">
              The homepage should not ask visitors to decode four random cards.
              It should show how the club works as a system: Tech Treks starts
              the journey, Mentorship sharpens it, Dev Team puts it into
              practice, and Startup Week gives it back to the community.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {programs.map((program, index) => (
            <ProgramPanel key={program._id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
