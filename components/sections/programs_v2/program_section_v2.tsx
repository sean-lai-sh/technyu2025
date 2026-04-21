import React from 'react'
import { getAllPrograms, type ProgramListItem } from '@/lib/sanity/queries'
import { getApplicationLink } from '@/lib/application-links'
import ProgramTrackBento from './components/program-track-bento'
import ProgramPanel from './components/program-panel'
import { PROGRAM_STAGE_ORDER, getProgramStageMeta } from './program-stage-map'
import type { ProgramSource, ProgramV2ViewModel } from './types'
import { ArrowBigLeft, ArrowBigRight, ArrowRight } from 'lucide-react'

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
        <div className="space-y-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              Programs
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-darker-grotesque)] text-[clamp(3.5rem,7vw,7.75rem)] leading-[0.9] tracking-[-0.04em] text-white">
              {"Taking you from 0 to 100"}
            </h2>
            <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-white/68 sm:text-[18px]">
             From growing your network to your own developer journey we have a program for you to join!
            </p>
          </div>

          <ProgramTrackBento programs={programs} />
        </div>

        {/* <div className="space-y-5 border-t border-white/10 pt-8">
          {programs.map((program, index) => (
            <ProgramPanel key={program._id} program={program} index={index} />
          ))}
        </div> */}
      </div>
    </section>
  )
}
