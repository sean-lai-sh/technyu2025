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
  const accentInset = `${program.stage.accent}66`

  return (
    <article
      className="group relative overflow-hidden border border-white/10 bg-[#090909]"
      style={{
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 18px rgba(255,255,255,0.03), inset 0 0 64px 6px ${accentInset}`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${
            isReversed ? '82% 18%' : '18% 18%'
          }, ${program.stage.accent}22 0%, ${program.stage.accentSoft} 18%, transparent 30%), linear-gradient(135deg, transparent 0%, transparent 64%, ${program.stage.accentSoft} 100%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/10" />
      <div className="pointer-events-none absolute inset-y-5 right-0 w-px bg-white/10" />
      <div className="relative grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className={`p-6 sm:p-8 lg:p-10 ${panelSideClass}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Stage 0{index + 1}
            </span>
            <ProgramStatusPill isOpen={program.isApplicationOpen} />
          </div>

          <div className="mt-6 min-w-0">
            {program.svgIconUrl ? (
              <div className="relative mb-6 h-20 w-full max-w-[320px] sm:h-24 sm:max-w-[360px]">
                <Image
                  src={program.svgIconUrl}
                  alt={`${program.name} logo`}
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 320px, 360px"
                />
              </div>
            ) : null}
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

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/programs/${program.slug}`}
              className="inline-flex items-center justify-center border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 active:scale-[0.98]"
            >
              Learn more
            </Link>
            {program.isApplicationOpen && program.applicationHref ? (
              <a
                href={program.applicationHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/75 transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
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
          className={`flex min-h-[320px] border-t border-white/10 p-4 sm:p-5 lg:min-h-[100%] lg:border-l lg:border-t-0 lg:p-6 ${mediaSideClass}`}
        >
          <div className="relative min-h-[288px] flex-1 overflow-hidden border border-white/10 bg-[#050505]">
            {program.desktopImageUrl ? (
              <>
                <Image
                  src={program.desktopImageUrl}
                  alt={`${program.name} visual`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) calc(100vw - 3rem), 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/24 to-black/12" />
              </>
            ) : (
              <div
                className="flex h-full min-h-[288px] items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 45%, rgba(0,0,0,0.4) 100%)',
                }}
              >
                <div className="border border-white/10 bg-black/40 px-8 py-10 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                    {program.stage.label}
                  </p>
                  <p className="mt-4 max-w-[14ch] font-[family-name:var(--font-darker-grotesque)] text-5xl leading-[0.9] text-white">
                    {program.name}
                  </p>
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
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
      </div>
    </article>
  )
}
