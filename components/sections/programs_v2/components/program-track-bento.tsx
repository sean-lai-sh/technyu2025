'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { motionTokens } from '@/lib/motion'
import type { ProgramV2ViewModel } from '../types'

type ProgramTrackBentoProps = {
  programs: ProgramV2ViewModel[]
}

const SELF_TRACK = 'grow-yourself'

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <p className="shrink-0 text-[13px] font-semibold uppercase tracking-[0.32em] text-white/48 sm:text-[14px]">
        {label}
      </p>
      <div className="h-px flex-1 bg-white/5" />
    </div>
  )
}

function ProgramBentoCard({ program }: { program: ProgramV2ViewModel }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group relative flex h-full min-h-[340px] w-full flex-col justify-between overflow-hidden border border-white/10 bg-surface-raised p-5 transition-transform duration-150 ease-out hover:-translate-y-1 hover:border-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative flex flex-col">
        <h4 className="font-[family-name:var(--font-satoshi)] text-[clamp(2.6rem,3vw,3.9rem)] leading-[0.9] tracking-[-0.04em] text-white">
          {program.name}
        </h4>
        <p className="mt-8 max-w-[34ch] text-[15px] leading-[1.5] text-white/72">
          {program.stage.detail}
        </p>
      </div>

      <div className="relative mt-6 flex items-center justify-end">
        <motion.span
          className="inline-flex items-center justify-center border border-white/70 bg-transparent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white"
          initial={false}
          whileHover={{
            backgroundColor: 'rgba(255,255,255,1)',
            color: 'rgba(5,5,5,1)',
            borderColor: 'rgba(255,255,255,1)',
          }}
          transition={{
            duration: motionTokens.hoverInDurationMs / 1000,
            ease: motionTokens.brandEnterEase,
          }}
        >
          Learn more
        </motion.span>
      </div>
    </Link>
  )
}

type CommunitySubCardProps = {
  label: string
  detail: string
  href: string
}

function CommunitySubCard({
  label,
  detail,
  href,
}: CommunitySubCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden border border-white/10 bg-surface-raised p-5 transition-[border-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative flex flex-col">
        <h4 className="font-[family-name:var(--font-satoshi)] text-[clamp(2rem,2.4vw,2.9rem)] leading-[0.9] tracking-[-0.03em] text-white">
          {label}
        </h4>
        <p className="mt-8 max-w-[36ch] text-[15px] leading-[1.5] text-white/72">
          {detail}
        </p>
      </div>

      <div className="relative mt-6 flex items-center justify-end">
        <motion.span
          className="inline-flex items-center justify-center border border-white/70 bg-transparent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white"
          initial={false}
          whileHover={{
            backgroundColor: 'rgba(255,255,255,1)',
            color: 'rgba(5,5,5,1)',
            borderColor: 'rgba(255,255,255,1)',
          }}
          transition={{
            duration: motionTokens.hoverInDurationMs / 1000,
            ease: motionTokens.brandEnterEase,
          }}
        >
          Learn more
        </motion.span>
      </div>
    </Link>
  )
}

export default function ProgramTrackBento({
  programs,
}: ProgramTrackBentoProps) {
  const selfPrograms = programs
    .filter((p) => p.stage.trackKey === SELF_TRACK)
    .sort((a, b) => (a.stage.sequence ?? 99) - (b.stage.sequence ?? 99))

  const communityPrograms = programs
    .filter((p) => p.stage.trackKey === 'grow-the-community')
    .sort((a, b) => (a.stage.sequence ?? 99) - (b.stage.sequence ?? 99))

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: Grow yourself — 3 equal cards with step arrows */}
      <div className="relative">
        <div className="relative space-y-3">
          <SectionHeader label="Grow yourself" />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
            {selfPrograms.map((program) => (
              <div key={program._id} className="min-w-0 flex-1">
                <ProgramBentoCard program={program} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Grow the community — Buildathon + NYSW */}
      {communityPrograms.length > 0 ? (
        <div className="relative">
          <div className="relative space-y-3">
            <SectionHeader label="Grow the community" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {communityPrograms.map((program) => (
                <CommunitySubCard
                  key={program._id}
                  label={program.name}
                  detail={program.stage.detail}
                  href={`/programs/${program.slug}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
