'use client'

import Link from 'next/link'
import { useReducedMotion } from 'motion/react'
import Video2Ascii from 'video2ascii'
import { SanityProgram } from '@/lib/types'

type MentorshipAsciiHeroSectionProps = {
  program?: SanityProgram | null
  heroDescription: string
}

export default function MentorshipAsciiHeroSection({
  program,
  heroDescription,
}: MentorshipAsciiHeroSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const applyOpen = program?.apply?.status ?? false
  const ctaHref = program?.apply?.link?.trim() || ''
  const ctaLabel = applyOpen
    ? program?.apply?.ctaLabel || 'Apply Now'
    : 'Join Waitlist'
  const ctaClassName =
    'inline-flex items-center border border-[#EDEDED] px-7 py-3 font-[family-name:var(--font-inter)] text-[12px] font-semibold uppercase tracking-[0.24em] transition-all duration-500'

  return (
    <section className="relative mt-[72px] h-[calc(100svh-72px)] overflow-hidden bg-[#0A0A0A] md:mt-[92px] md:h-[calc(100svh-92px)]">
      <div aria-hidden="true" className="pointer-events-non inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-full min-w-full aspect-video"
          style={{ transform: 'translate(-50%, -50%) scale(1.25)' }}
        >
          <Video2Ascii
            src="/mentorship.mp4"
            numColumns={112}
            colored={true}
            brightness={1.14}
            blend={0}
            highlight={0}
            charset="blocks"
            enableMouse={false}
            enableRipple={false}
            audioEffect={0}
            isPlaying={!shouldReduceMotion}
            autoPlay={!shouldReduceMotion}
            enableSpacebarToggle={false}
            showStats={false}
            className="h-full w-full [&>div]:h-full [&>div]:w-full [&>div]:rounded-none [&>div]:bg-transparent [&_canvas]:h-full [&_canvas]:w-full"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(circle at 18% 16%, rgba(255,104,54,0.16), transparent 26%), radial-gradient(circle at 76% 18%, rgba(255,177,148,0.08), transparent 22%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[62%]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.3) 28%, rgba(10,10,10,0.74) 60%, rgba(10,10,10,0.96) 82%, rgba(10,10,10,1) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[18%]"
        style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.84) 0%, rgba(10,10,10,0.34) 58%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[10%]"
        style={{ background: 'linear-gradient(to left, rgba(10,10,10,0.58) 0%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[12%]"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 100%)' }}
      />

      <div className="absolute inset-0 z-20 flex items-end">
        <div className="w-full px-[5vw] pb-[clamp(44px,9vh,88px)] lg:px-[8vw]">
          <div className="max-w-[40rem]">
            <h1
              className="font-[family-name:var(--font-darker-grotesque)] font-extrabold uppercase leading-[0.83] text-[#EDEDED]"
              style={{
                fontSize: 'clamp(56px, 8.5vw, 118px)',
                letterSpacing: '-0.05em',
                textShadow: '0 4px 20px rgba(0,0,0,0.9)',
              }}
            >
              Mentorship
              <br />
              <span
                className="text-[#FFB194]"
                style={{ textShadow: '0 0 18px rgba(255,177,148,0.34), 0 0 42px rgba(255,104,54,0.18), 0 4px 20px rgba(0,0,0,0.92)' }}
              >
                x Databricks
              </span>
            </h1>

            <p
              className="mt-5 max-w-[31rem] font-[family-name:var(--font-inter)] text-[clamp(16px,1.65vw,20px)] leading-[1.55] text-[#EDEDED]/72"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.92), 0 0 24px rgba(0,0,0,0.5)' }}
            >
              {heroDescription}
            </p>

            <div className="mt-8">
              {ctaHref ? (
                <Link
                  href={ctaHref}
                  className={`${ctaClassName} text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black`}
                >
                  {ctaLabel} →
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className={`${ctaClassName} cursor-not-allowed border-[#EDEDED]/22 text-[#EDEDED]/34`}
                >
                  {ctaLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
