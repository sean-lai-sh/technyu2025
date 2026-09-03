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

const ctaClass =
  'font-[family-name:var(--font-inter)] font-semibold text-[13px] inline-block px-10 py-5 border border-white/70 text-white tracking-[0.16em] uppercase transition-colors [transition-duration:var(--motion-hover-in-duration)] [transition-timing-function:var(--motion-brand-enter)] hover:bg-white hover:text-surface-deep'

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
    <section className="px-[5vw] lg:px-[8vw] py-[14svh] border-t border-white/10">
      <div className="max-w-[700px]">
        <p className="font-[family-name:var(--font-inter)] text-[12px] font-semibold tracking-[0.22em] uppercase text-white/48 mb-6">
          {kicker}
        </p>
        <h2 className="text-display-1 text-white mb-8">
          {title}
          <br />
          <span style={{ color: '#4DFF94' }}>{accent}</span>
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/72 leading-relaxed mb-10 max-w-[480px]">
          {body}
        </p>
        {contactHref ? (
          <div className="flex items-center gap-6 flex-wrap">
            <a href={contactHref} className={ctaClass}>
              {contactLabel} →
            </a>
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/48">
              {contactHref.replace('mailto:', '')}
            </span>
          </div>
        ) : apply?.status ? (
          <Link href={apply.link || '#'} className={ctaClass}>
            {apply.ctaLabel || 'Apply Now'} →
          </Link>
        ) : (
          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-[family-name:var(--font-inter)] font-semibold text-[13px] inline-block px-10 py-5 border border-white/10 text-white/28 cursor-not-allowed tracking-[0.16em] uppercase">
              Applications Closed
            </span>
            {closedHint && (
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/48">
                {closedHint}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
