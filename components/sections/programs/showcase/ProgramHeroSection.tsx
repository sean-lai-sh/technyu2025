'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SanityProgram } from '@/lib/types'

type ProgramHeroSectionProps = {
  program?: SanityProgram | null
  heroTitleLines: string[]
  heroDescription: string
  applyStatusFallback: string
  heroVisual: 'wireframe' | 'image'
  heroImage?: string
  heroWireframe: React.ReactNode
}

export default function ProgramHeroSection({
  program,
  heroTitleLines,
  heroDescription,
  applyStatusFallback,
  heroVisual,
  heroImage,
  heroWireframe,
}: ProgramHeroSectionProps) {
  return (
    <section className="min-h-[92svh] flex items-center px-[5vw] lg:px-[8vw] pt-[18svh] pb-[10svh]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase text-[#EDEDED] opacity-55 mb-6 flex items-center gap-3">

            TECH@NYU — PROGRAM
          </p>
          <h1
            className="font-[family-name:var(--font-hk-grotesque)] font-extrabold leading-[0.88] text-[#EDEDED] mb-8"
            style={{ fontSize: 'clamp(72px, 11vw, 130px)', letterSpacing: '-2px' }}
          >
            {heroTitleLines.map((line, index) => (
              <React.Fragment key={line}>
                {line}
                {index < heroTitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] md:text-[19px] text-[#EDEDED] opacity-75 leading-relaxed max-w-[520px] mb-10">
            {heroDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {program?.apply?.status ? (
              <Link
                href={program.apply.link || '#'}
                className="font-[family-name:var(--font-inter)] font-semibold text-[14px] px-8 py-4 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
              >
                {program.apply.ctaLabel || 'Apply Now'}
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

        <div className="flex items-center justify-center relative">
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, rgba(179,0,255,0.07) 0%, transparent 70%)' }}
          />
          <div className="w-full max-w-[480px] aspect-square border border-[#EDEDED]/15 overflow-hidden bg-black">
            {heroVisual === 'image' && heroImage ? (
              <div className="relative w-full h-full">
                <Image
                  src={heroImage}
                  alt={`${program?.name || 'Program'} hero`}
                  fill
                  className="object-cover opacity-85"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/10" />
              </div>
            ) : (
              heroWireframe
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
