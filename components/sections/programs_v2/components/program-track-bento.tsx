'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ProgramV2ViewModel } from '../types'

type ProgramTrackBentoProps = {
  programs: ProgramV2ViewModel[]
}

const SELF_TRACK = 'grow-yourself'
const PROGRAM_SHORT_CODES: Record<string, string> = {
  'Tech Treks': 'TT',
  Mentorship: 'MT',
  'Dev Team': 'DT',
  'Startup Week': 'SW',
}

function getProgramShortCode(name: string) {
  return (
    PROGRAM_SHORT_CODES[name] ??
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  )
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <p className="shrink-0 text-[13px] font-semibold uppercase tracking-[0.32em] text-white/48 sm:text-[14px]">
        {label}
      </p>
      <div className="h-px flex-1 bg-white/[0.07]" />
    </div>
  )
}

function StepArrow() {
  return (
    <div className="hidden w-10 shrink-0 items-center justify-center self-stretch lg:flex">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 12h18M15 5l6 7-6 7"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  )
}

function ProgramLogoPlate({ program }: { program: ProgramV2ViewModel }) {
  return (
    <div
      className="relative flex h-16 w-[112px] shrink-0 items-center justify-center overflow-hidden border border-white/12 bg-[#050505] px-3 py-2 transition-transform duration-150 ease-out group-hover:scale-[1.03] sm:h-[72px] sm:w-[124px]"
      style={{
        boxShadow: `inset 0 0 0 1px ${program.stage.accentSoft}, inset 0 0 28px -18px ${program.stage.accent}`,
      }}
    >
      {program.svgIconUrl ? (
        <Image
          src={program.svgIconUrl}
          alt={`${program.name} logo`}
          fill
          className="object-contain p-3 sm:p-2.5"
          sizes="124px"
        />
      ) : (
        <span className="font-[family-name:var(--font-darker-grotesque)] text-[1.7rem] leading-none tracking-[0.06em] text-white">
          {getProgramShortCode(program.name)}
        </span>
      )}
    </div>
  )
}

function ProgramBentoCard({ program }: { program: ProgramV2ViewModel }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group relative flex h-full min-h-[340px] w-full flex-col justify-between overflow-hidden border border-white/12 bg-[#090909] p-5 transition-transform duration-150 ease-out hover:-translate-y-1 hover:border-white/22 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 sm:p-6"
      style={{
        background: `radial-gradient(circle at 100% 0%, ${program.stage.accent}12 0%, transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.2) 100%)`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.03), inset 0 -56px 80px -72px ${program.stage.accentSoft}, inset 0 0 84px -76px ${program.stage.accent}`,
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 84% 16%, ${program.stage.accent}12 0%, transparent 40%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_68%,rgba(255,255,255,0.02)_100%)]" />

      <div className="relative flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <ProgramLogoPlate program={program} />
          <div className="min-w-0 pt-1">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/72 transition-colors duration-150 ease-out group-hover:text-white sm:text-[14px]">
              {program.stage.label}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-[family-name:var(--font-darker-grotesque)] text-[clamp(2.6rem,3vw,3.9rem)] leading-[0.9] tracking-[-0.04em] text-white">
            {program.name}
          </h4>
          <p className="mt-3 max-w-[25ch] text-[15px] leading-[1.45] text-white/74">
            {program.stage.position}
          </p>
          <p className="mt-4 max-w-[36ch] text-[13px] leading-relaxed text-white/58">
            {program.stage.detail}
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className="inline-flex items-center justify-center border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
          {program.isApplicationOpen ? 'Apps open' : 'Apps closed'}
        </span>
        <motion.span
          className="inline-flex items-center justify-center border border-white/70 bg-transparent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white"
          initial={false}
          whileHover={{
            backgroundColor: 'rgba(255,255,255,1)',
            color: 'rgba(5,5,5,1)',
            borderColor: 'rgba(255,255,255,1)',
          }}
          transition={{
            duration: 0.18,
            ease: [0.23, 1, 0.32, 1],
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
  accent: string
  accentSoft: string
}

function CommunitySubCard({
  label,
  detail,
  href,
  accent,
  accentSoft,
}: CommunitySubCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden border border-white/10 bg-[#090909] p-4 transition-[border-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-white/[0.18] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 sm:p-5"
      style={{
        background: `radial-gradient(circle at 100% 0%, ${accent}10 0%, transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 44%, rgba(0,0,0,0.2) 100%)`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.03), inset 0 -48px 80px -72px ${accentSoft}`,
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 84% 16%, ${accent}12 0%, transparent 40%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_70%,rgba(255,255,255,0.02)_100%)]" />

      <div className="relative flex flex-col gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/34">
          Inside Startup Week
        </p>
        <h4 className="font-[family-name:var(--font-darker-grotesque)] text-[clamp(2rem,2.4vw,2.9rem)] leading-[0.9] tracking-[-0.03em] text-white">
          {label}
        </h4>
        <div className="border border-white/10 bg-black/30 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/36">
            Contribution
          </p>
          <p className="mt-2 max-w-[36ch] text-[13px] leading-relaxed text-white/66">
            {detail}
          </p>
        </div>
      </div>

      <div className="relative mt-5 border-t border-white/10 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
          Open program page
        </span>
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

  const communityProgram = programs.find(
    (p) => p.stage.trackKey === 'grow-the-community'
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: Grow yourself — 3 equal cards with step arrows */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-[-8%] inset-y-[-24%] opacity-90 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, rgba(179,0,255,0.18), transparent 30%), radial-gradient(circle at 88% 16%, rgba(123,92,255,0.14), transparent 24%), radial-gradient(circle at 72% 100%, rgba(74,168,255,0.08), transparent 24%)',
          }}
        />
        <div className="relative space-y-3">
          <SectionHeader label="Grow yourself" />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
            {selfPrograms.map((program, index) => (
              <Fragment key={program._id}>
                <div className="min-w-0 flex-1">
                  <ProgramBentoCard program={program} />
                </div>
                {index < selfPrograms.length - 1 && <StepArrow />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Grow the community — Buildathon + SW Events */}
      {communityProgram?.stage.childDetails ? (
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-[-8%] inset-y-[-24%] opacity-95 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 100% 0%, rgba(77,255,148,0.18), transparent 32%), radial-gradient(circle at 10% 82%, rgba(179,0,255,0.12), transparent 22%), linear-gradient(180deg, rgba(77,255,148,0.05), rgba(255,255,255,0.015) 40%, rgba(0,0,0,0.1) 100%)',
            }}
          />
          <div className="relative space-y-3">
            <SectionHeader label="Grow the community" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {communityProgram.stage.childDetails.map((child) => (
                <CommunitySubCard
                  key={child.label}
                  label={child.label}
                  detail={child.detail}
                  href={`/programs/${communityProgram.slug}`}
                  accent={communityProgram.stage.accent}
                  accentSoft={communityProgram.stage.accentSoft}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
