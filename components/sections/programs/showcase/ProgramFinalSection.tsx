import Link from 'next/link'
import { SanityProgram } from '@/lib/types'

type ProgramFinalSectionProps = {
  kicker: string
  title: string
  accent: string
  body: string
  closedHint?: string
  apply?: SanityProgram['apply']
  contactHref?: string
  contactLabel?: string
}

export default function ProgramFinalSection({
  kicker,
  title,
  accent,
  body,
  closedHint,
  apply,
  contactHref,
  contactLabel = 'Reach Out',
}: ProgramFinalSectionProps) {
  return (
    <section className="px-[5vw] lg:px-[8vw] py-[14svh] border-t border-[#EDEDED]/8">
      <div className="max-w-[700px]">
        <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-6 flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#B300FF]" aria-hidden="true" />
          {kicker}
        </p>
        <h2
          className="font-[family-name:var(--font-darker-grotesque)] font-extrabold text-[#EDEDED] mb-8 leading-none"
          style={{ fontSize: 'clamp(52px, 8vw, 100px)', letterSpacing: '-2px' }}
        >
          {title}
          <br />
          <span style={{ color: '#4DFF94' }}>{accent}</span>
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[17px] text-[#EDEDED] opacity-68 leading-relaxed mb-10 max-w-[480px]">
          {body}
        </p>
        {contactHref ? (
          <div className="flex items-center gap-6 flex-wrap">
            <a
              href={contactHref}
              className="font-[family-name:var(--font-inter)] font-semibold text-[14px] inline-block px-10 py-5 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
            >
              {contactLabel} →
            </a>
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#EDEDED]/50">
              {contactHref.replace('mailto:', '')}
            </span>
          </div>
        ) : apply?.status ? (
          <Link
            href={apply.link || '#'}
            className="font-[family-name:var(--font-inter)] font-semibold text-[14px] inline-block px-10 py-5 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
          >
            {apply.ctaLabel || 'Apply Now'} →
          </Link>
        ) : (
          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-[family-name:var(--font-inter)] font-semibold text-[14px] inline-block px-10 py-5 border border-[#EDEDED]/18 text-[#EDEDED]/28 cursor-not-allowed tracking-widest uppercase">
              Applications Closed
            </span>
            {closedHint && (
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#EDEDED]/35">
                {closedHint}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
