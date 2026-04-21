import Image from 'next/image'
import Link from 'next/link'
import type { ProgramV2ViewModel } from '../types'

type ProgramTrackBentoProps = {
  programs: ProgramV2ViewModel[]
}

const SELF_TRACK = 'grow-yourself'

function ProgramBentoCard({
  program,
  featured = false,
}: {
  program: ProgramV2ViewModel
  featured?: boolean
}) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className={`group relative overflow-hidden border border-white/10 bg-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-white/18 ${
        featured ? 'min-h-[260px] p-5 sm:p-6' : 'min-h-[220px] p-4 sm:p-5'
      }`}
      style={{
        background: `radial-gradient(circle at 100% 0%, ${program.stage.accent}18 0%, transparent 30%), linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015) 42%, rgba(0,0,0,0.18) 100%)`,
        boxShadow: `inset 0 0 0 1px ${program.stage.accentSoft}`,
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.34)_55%,rgba(0,0,0,0.62)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-white/10 bg-black/30">
            {program.svgIconUrl ? (
              <Image
                src={program.svgIconUrl}
                alt={`${program.name} logo`}
                fill
                className="object-contain p-1.5"
                sizes="48px"
              />
            ) : null}
          </div>

          <p className="pt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
            {program.stage.label}
          </p>
        </div>

        <div className="mt-5">
          <h4
            className={`font-[family-name:var(--font-darker-grotesque)] leading-[0.9] tracking-[-0.035em] text-white ${
              featured ? 'text-[clamp(2.8rem,4vw,4.25rem)]' : 'text-[clamp(2.2rem,3vw,3.3rem)]'
            }`}
          >
            {program.name}
          </h4>
          <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-white/68 sm:text-[15px]">
            {program.stage.summary}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <span className="inline-flex items-center justify-center border border-white/14 bg-white px-4 py-2 text-sm font-semibold text-black">
            Open program page
          </span>
          {program.isApplicationOpen && program.applicationHref ? (
            <span className="inline-flex items-center justify-center border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/76">
              Apps open
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default function ProgramTrackBento({
  programs,
}: ProgramTrackBentoProps) {
  const selfPrograms = programs
    .filter((program) => program.stage.trackKey === SELF_TRACK)
    .sort(
      (left, right) => (left.stage.sequence ?? 99) - (right.stage.sequence ?? 99)
    )

  const communityProgram = programs.find(
    (program) => program.stage.trackKey === 'grow-the-community'
  )

  const [firstSelfProgram, ...remainingSelfPrograms] = selfPrograms

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
      <article className="relative overflow-hidden border border-white/10 bg-[#09090c] p-5 sm:p-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, rgba(179,0,255,0.18), transparent 30%), radial-gradient(circle at 88% 16%, rgba(124,77,255,0.14), transparent 24%), radial-gradient(circle at 72% 100%, rgba(77,255,148,0.08), transparent 24%)',
          }}
        />

        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
            Grow yourself
          </p>
          <h3 className="mt-3 max-w-[12ch] font-[family-name:var(--font-darker-grotesque)] text-[clamp(2.8rem,5vw,5rem)] leading-[0.9] tracking-[-0.04em] text-white">
            Find your role, hone it, then ship.
          </h3>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {firstSelfProgram ? (
              <div className="sm:col-span-2">
                <ProgramBentoCard program={firstSelfProgram} featured />
              </div>
            ) : null}

            {remainingSelfPrograms.map((program) => (
              <ProgramBentoCard key={program._id} program={program} />
            ))}
          </div>
        </div>
      </article>

      {communityProgram ? (
        <article className="relative overflow-hidden border border-white/10 bg-[#090c09] p-5 sm:p-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-95"
            style={{
              background:
                'radial-gradient(circle at 100% 0%, rgba(77,255,148,0.18), transparent 32%), radial-gradient(circle at 10% 82%, rgba(179,0,255,0.12), transparent 22%), linear-gradient(180deg, rgba(77,255,148,0.05), rgba(255,255,255,0.015) 40%, rgba(0,0,0,0.1) 100%)',
            }}
          />

          <Link
            href={`/programs/${communityProgram.slug}`}
            className="group relative flex h-full flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
                {communityProgram.stage.trackLabel}
              </p>
              <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-white/10 bg-black/30">
                {communityProgram.svgIconUrl ? (
                  <Image
                    src={communityProgram.svgIconUrl}
                    alt={`${communityProgram.name} logo`}
                    fill
                    className="object-contain p-1.5"
                    sizes="56px"
                  />
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-[family-name:var(--font-darker-grotesque)] text-[clamp(3rem,5vw,4.9rem)] leading-[0.9] tracking-[-0.04em] text-white">
                {communityProgram.name}
              </h3>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-white/68 sm:text-[16px]">
                {communityProgram.stage.summary}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {communityProgram.stage.childLabels?.map((label) => (
                <div
                  key={label}
                  className="border border-white/10 bg-black/24 p-4 transition-colors duration-300 group-hover:border-white/16"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(77,255,148,0.08), rgba(255,255,255,0.015) 38%, rgba(0,0,0,0.12) 100%)',
                    boxShadow: `inset 0 0 0 1px ${communityProgram.stage.accentSoft}`,
                  }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/36">
                    Inside Startup Week
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-darker-grotesque)] text-[2rem] leading-none tracking-[-0.03em] text-white">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
              <span className="inline-flex items-center justify-center border border-white/14 bg-white px-4 py-2 text-sm font-semibold text-black transition-transform duration-300 group-hover:-translate-y-0.5">
                Open program page
              </span>
              {communityProgram.isApplicationOpen &&
              communityProgram.applicationHref ? (
                <span className="inline-flex items-center justify-center border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/76">
                  Apps open
                </span>
              ) : null}
            </div>
          </Link>
        </article>
      ) : null}
    </div>
  )
}
