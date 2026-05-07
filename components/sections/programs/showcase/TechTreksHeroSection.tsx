'use client'

import React from 'react'
import Link from 'next/link'
import { SanityProgram } from '@/lib/types'
import GameOfLifeAscii from './GameOfLifeAscii'

type TechTreksHeroSectionProps = {
  program?: SanityProgram | null
}

export default function TechTreksHeroSection({ program }: TechTreksHeroSectionProps) {
  const applyOpen = program?.apply?.status ?? false
  const ctaHref = program?.apply?.link?.trim() || ''
  const ctaLabel = applyOpen
    ? program?.apply?.ctaLabel || 'Apply Now'
    : 'Join Waitlist'
  const ctaClassName =
    'inline-flex items-center border border-[#EDEDED] px-7 py-3 font-[family-name:var(--font-inter)] text-[12px] font-semibold uppercase tracking-[0.24em] transition-all duration-500'

  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#0A0A0A]">
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0">
          <GameOfLifeAscii />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[62%]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.28) 28%, rgba(10,10,10,0.72) 62%, rgba(10,10,10,0.96) 82%, rgba(10,10,10,1) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[18%]"
          style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.28) 58%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[10%]"
          style={{ background: 'linear-gradient(to left, rgba(10,10,10,0.55) 0%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[12%]"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, transparent 100%)' }}
        />

        <div className="absolute inset-0 z-20 flex items-end">
          <div className="w-full px-[5vw] pb-[clamp(44px,9vh,88px)] lg:px-[8vw]">
            <div className="max-w-[36rem]">
              <h1
                className="font-[family-name:var(--font-darker-grotesque)] font-extrabold uppercase leading-[0.83] text-[#EDEDED]"
                style={{ fontSize: 'clamp(56px, 8.5vw, 116px)', letterSpacing: '-0.05em' }}
              >
                Learn, Grow,
                <br />
                <span
                  className="text-[#4DFF94]"
                  style={{ textShadow: '0 0 10px rgba(77,255,148,0.18), 0 4px 16px rgba(0,0,0,0.8)' }}
                >
                  Flourish
                </span>
              </h1>
              <p
                className="mt-5 max-w-[30rem] font-[family-name:var(--font-inter)] text-[clamp(16px,1.65vw,20px)] leading-[1.55] text-[#EDEDED]/72"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.92), 0 0 24px rgba(0,0,0,0.5)' }}
              >
                Go from 0→1 while finding your role and place in the tech industry with Tech Treks.
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
      </div>
    </section>
  )
}
