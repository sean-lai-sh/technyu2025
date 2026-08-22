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

const ctaBaseClass =
  'font-[family-name:var(--font-inter)] font-semibold text-[13px] px-8 py-4 border tracking-[0.16em] uppercase transition-colors [transition-duration:var(--motion-hover-in-duration)] [transition-timing-function:var(--motion-brand-enter)]'

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
          <p className="font-[family-name:var(--font-inter)] text-[12px] font-semibold tracking-[0.22em] uppercase text-white/48 mb-6">
            TECH@NYU — PROGRAM
          </p>
          <h1 className="text-display-1 text-white mb-8">
            {heroTitleLines.map((line, index) => (
              <React.Fragment key={line}>
                {line}
                {index < heroTitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] md:text-[19px] text-white/72 leading-relaxed max-w-[520px] mb-10">
            {heroDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {program?.apply?.status ? (
              <Link
                href={program.apply.link || '#'}
                className={`${ctaBaseClass} border-white/70 text-white hover:bg-white hover:text-surface-deep`}
              >
                {program.apply.ctaLabel || 'Apply Now'}
              </Link>
            ) : (
              <span className={`${ctaBaseClass} border-white/10 text-white/28 cursor-not-allowed`}>
                Applications Closed
              </span>
            )}
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/48">
              {program?.apply?.statusText || applyStatusFallback}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center relative">
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, rgba(179,0,255,0.07) 0%, transparent 70%)' }}
          />
          <div className="w-full max-w-[480px] aspect-square border border-white/10 overflow-hidden bg-surface-raised">
            {heroVisual === 'image' && heroImage ? (
              <div className="relative w-full h-full">
                <Image
                  src={heroImage}
                  alt={`${program?.name || 'Program'} hero`}
                  fill
                  className="object-cover opacity-90"
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
