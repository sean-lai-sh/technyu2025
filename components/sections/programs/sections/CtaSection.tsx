'use client'
import React from 'react'
import { CtaSection } from '@/lib/types'
import { PortableText } from '@portabletext/react'
import { Apply } from '@/components/ui/Apply'

interface CtaSectionProps {
  section: CtaSection
  programApply?: {
    status?: boolean
    link?: string
    ctaLabel?: string
  }
}

const portableTextComponents = {
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || '#'
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={href}
          rel={rel}
          className="font-semibold text-[#4DFF94] hover:underline"
        >
          {children}
        </a>
      )
    },
    highlight: ({ children, value }: { children?: React.ReactNode; value?: { color?: string } }) => {
      const colorClass = value?.color === 'blue' ? 'text-blue-500' : 'text-green-500'
      return <span className={`font-bold ${colorClass}`}>{children}</span>
    },
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 max-w-[72ch] text-base leading-relaxed text-white/90 md:text-lg">{children}</p>
    ),
  },
}

export default function CtaSectionComponent({ section, programApply }: CtaSectionProps) {
  // CTA section can override program-level application settings
  const applyStatus = section.applyOverride?.status ?? programApply?.status ?? false
  const applyLink = section.applyOverride?.link || programApply?.link || ''
  const buttonText = section.applyOverride?.buttonText || programApply?.ctaLabel || 'Apply Now'

  return (
    <section className="mt-18 px-[5vw]">
      <div className="mx-auto max-w-[1240px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#111111] to-[#090909] p-7 shadow-[inset_0_0_110px_rgba(179,0,255,0.10)] md:p-10">
        <h2 className="mb-7 font-[family-name:var(--font-hk-grotesque)] text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          {section.heading}
        </h2>

        {section.body && (
          <div className="mb-8">
            <PortableText value={section.body} components={portableTextComponents} />
          </div>
        )}

        {applyStatus && applyLink ? (
          <a
            href={applyLink}
            className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            {buttonText}
          </a>
        ) : (
          <Apply
            isOpen={applyStatus}
            applicationLink={applyLink}
            statusClassName="mb-0 w-full md:w-[20rem]"
          />
        )}
        {!applyStatus ? (
          <p className="mt-3 text-sm text-white/48">
            Applications are currently closed. Check back for the next cohort update.
          </p>
        ) : null}
      </div>
    </section>
  )
}
