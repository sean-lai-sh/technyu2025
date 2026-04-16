'use client'

import React from 'react'
import Link from 'next/link'
import { SanityProgram } from '@/lib/types'
import GameOfLifeAscii from './GameOfLifeAscii'

type TechTreksHeroSectionProps = {
  program?: SanityProgram | null
  applyStatusFallback: string
}

export default function TechTreksHeroSection({
  program,
  applyStatusFallback,
}: TechTreksHeroSectionProps) {
  const applyOpen = program?.apply?.status
  const applyLink = program?.apply?.link || '#'
  const applyLabel = program?.apply?.ctaLabel || 'Apply Now'
  const applyStatusText = program?.apply?.statusText || applyStatusFallback

  return (
    <section className="h-[100svh] flex flex-col bg-[#0A0A0A] overflow-hidden">

      {/* Top bar — fixed 64px */}
      {/* <div className="z-20 flex items-center justify-between px-[5vw] lg:px-[8vw] h-16 shrink-0 border-b border-[#EDEDED]/8 mt-[12.5vh]">
        <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.18em] uppercase text-[#EDEDED] opacity-55 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-[#4DFF94]" aria-hidden="true" />
          Tech@NYU — Tech Treks
        </p>
        {applyOpen ? (
          <Link
            href={applyLink}
            className="font-[family-name:var(--font-inter)] font-semibold text-[12px] px-5 py-2.5 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
          >
            {applyLabel} →
          </Link>
        ) : (
          <span className="font-[family-name:var(--font-inter)] font-semibold text-[11px] px-5 py-2.5 border border-[#EDEDED]/20 text-[#EDEDED]/30 tracking-widest uppercase">
            Applications Closed
          </span>
        )}
      </div> */}

      {/* ASCII simulation area — takes all remaining height */}
      <div className="relative flex-1 overflow-hidden">

        {/* Game of Life — explicitly absolutely fills the parent */}
        <div className="absolute inset-0">
          <GameOfLifeAscii />
        </div>

        {/* Bottom fade: art dissolves into black where headline sits */}
        <div
          className="absolute inset-x-0 bottom-0 h-[58%] pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.5) 38%, rgba(10,10,10,0.9) 68%, rgba(10,10,10,1) 100%)',
          }}
        />
        {/* Side fades */}
        <div
          className="absolute inset-y-0 left-0 w-[8%] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.55) 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[8%] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, rgba(10,10,10,0.55) 0%, transparent 100%)' }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-[12%] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, transparent 100%)' }}
        />

        {/* Headline — floats over the faded bottom of the art */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-[5vw] lg:px-[8vw] pb-10">
          <h1
            className="font-[family-name:var(--font-darker-grotesque)] font-extrabold leading-[0.86]"
            style={{ fontSize: 'clamp(64px, 10vw, 122px)', letterSpacing: '-2px' }}
          >
            <span className="text-[#EDEDED]">BREAK INTO</span>
            <br />
            <span className="text-[#4DFF94]">TECH.</span>
          </h1>
        </div>
      </div>

      {/* Bottom bar — fixed, docked */}
      <div className="z-20 shrink-0 border-t border-[#EDEDED]/12 px-[5vw] lg:px-[8vw] py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0A0A0A]">
        <p className="font-[family-name:var(--font-inter)] text-[14px] leading-relaxed text-[#EDEDED] opacity-60 max-w-lg">
          The beginner program that gets you inside real companies, builds your skills, and helps you discover your role in tech.
        </p>
        <div className="flex items-center gap-5 shrink-0">
          {applyOpen ? (
            <Link
              href={applyLink}
              className="font-[family-name:var(--font-inter)] font-semibold text-[13px] px-8 py-4 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
            >
              {applyLabel} →
            </Link>
          ) : (
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#EDEDED] opacity-40">
              {applyStatusText}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
