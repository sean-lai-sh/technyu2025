'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SanityProgram } from '@/lib/types'

type TechTreksHeroSectionProps = {
  program?: SanityProgram | null
  heroTitleLines: string[]
  heroDescription: string
  applyStatusFallback: string
  heroImage?: string
}

export default function TechTreksHeroSection({
  program,
  heroTitleLines,
  heroDescription,
  applyStatusFallback,
  heroImage,
}: TechTreksHeroSectionProps) {
  return (
    <section className="min-h-[100svh] relative overflow-hidden flex flex-col">
      {/* Background image */}
      {heroImage && (
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={`${program?.name || 'Tech Treks'} hero`}
            fill
            className="object-cover opacity-75"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.0) 40%, rgba(10,10,10,0.0) 55%, rgba(10,10,10,0.82) 100%)',
        }}
      />
      {/* Subtle left-edge vignette for readability on the headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.0) 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-[5vw] lg:px-[8vw]">
        {/* Top content */}
        <div className="pt-[20svh]">
          <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase text-[#EDEDED] opacity-55 mb-6 flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[#4DFF94]" aria-hidden="true" />
            Tech Treks
          </p>
          <h1
            className="font-[family-name:var(--font-darker-grotesque)] font-extrabold text-[#EDEDED] leading-[0.88]"
            style={{ fontSize: 'clamp(72px, 11vw, 130px)', letterSpacing: '-2px' }}
          >
            {heroTitleLines.map((line, index) => (
              <React.Fragment key={line}>
                {line}
                {index < heroTitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
        </div>

        {/* Bottom bar — docked to the bottom of the viewport, solid background */}
        <div className="mt-auto bg-[#0A0A0A] border-t border-[#EDEDED]/18 py-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p
            className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] leading-[1.05] max-w-[640px]"
            style={{ fontSize: 'clamp(28px, 3vw, 48px)', letterSpacing: '-0.5px' }}
          >
            Break into tech with our signature beginner program — find your role and place in the tech industry.
          </p>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {program?.apply?.status ? (
              <Link
                href={program.apply.link || '#'}
                className="font-[family-name:var(--font-inter)] font-semibold text-[14px] px-8 py-4 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
              >
                {program.apply.ctaLabel || 'Apply Now'} →
              </Link>
            ) : (
              <span className="font-[family-name:var(--font-inter)] font-semibold text-[14px] px-8 py-4 border border-[#EDEDED]/25 text-[#EDEDED]/30 cursor-not-allowed tracking-widest uppercase">
                Applications Closed
              </span>
            )}
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#EDEDED] opacity-40">
              {program?.apply?.statusText || applyStatusFallback}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
