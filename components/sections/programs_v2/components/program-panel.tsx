import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProgramV2ViewModel } from '../types'
import ProgramStatusPill from './program-status-pill'

type ProgramPanelProps = {
  program: ProgramV2ViewModel
  index: number
}

export default function ProgramPanel({ program, index }: ProgramPanelProps) {
  const isReversed = index % 2 === 1
  const panelSideClass = isReversed ? 'lg:order-2' : 'lg:order-1'
  const mediaSideClass = isReversed ? 'lg:order-1' : 'lg:order-2'

  return (
    <article
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#090909]"
      style={{ boxShadow: `inset 0 0 0 1px ${program.stage.accentSoft}` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${
            isReversed ? '78% 18%' : '22% 18%'
          }, ${program.stage.accentSoft} 0%, transparent 58%)`,
        }}
      />
      <div className="relative grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className={`p-6 sm:p-8 lg:p-10 ${panelSideClass}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Stage 0{index + 1}
            </span>
            <ProgramStatusPill isOpen={program.isApplicationOpen} />
          </div>

          <div className="mt-6 flex items-start gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04]">
              {program.svgIconUrl ? (
                <Image
                  src={program.svgIconUrl}
                  alt={`${program.name} icon`}
                  fill
                  className="object-contain p-2.5"
                  sizes="56px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-white/75">
                  {program.name.slice(0, 1)}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
                {program.stage.position}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-darker-grotesque)] text-5xl leading-[0.88] tracking-[-0.03em] text-white sm:text-6xl">
                {program.name}
              </h3>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/72">
                {program.body}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">
                For
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {program.stage.audience}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">
                You leave with
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {program.stage.outcome}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/programs/${program.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white text-black px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 active:scale-[0.98]"
            >
              Learn more
            </Link>
            {program.isApplicationOpen && program.applicationHref ? (
              <a
                href={program.applicationHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/75 transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
              >
                Apply now
              </a>
            ) : null}
            <p className="text-sm leading-relaxed text-white/45">
              {program.intro}
            </p>
          </div>
        </div>

        <div
          className={`relative min-h-[320px] overflow-hidden border-t border-white/10 lg:min-h-[100%] lg:border-l lg:border-t-0 ${mediaSideClass}`}
        >
          {program.desktopImageUrl ? (
            <>
              <Image
                src={program.desktopImageUrl}
                alt={`${program.name} visual`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/10" />
            </>
          ) : (
            <div
              className="flex h-full min-h-[320px] items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 45%, rgba(0,0,0,0.4) 100%)',
              }}
            >
              <div
                className="rounded-[32px] border border-white/10 bg-black/40 px-8 py-10 text-center"
                style={{ boxShadow: `0 0 80px ${program.stage.accentSoft}` }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                  {program.stage.label}
                </p>
                <p className="mt-4 max-w-[14ch] font-[family-name:var(--font-darker-grotesque)] text-5xl leading-[0.9] text-white">
                  {program.name}
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="max-w-[28ch]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Stage focus
              </p>
              <p className="mt-2 text-base leading-relaxed text-white/80">
                {program.stage.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
