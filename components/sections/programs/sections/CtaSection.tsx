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
          className="hover:underline font-bold text-green-500"
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
      <p className="text-white text-lg md:text-xl lg:text-2xl mb-6 max-w-3xl">{children}</p>
    ),
  },
}

export default function CtaSectionComponent({ section, programApply }: CtaSectionProps) {
  // CTA section can override program-level application settings
  const applyStatus = section.applyOverride?.status ?? programApply?.status ?? false
  const applyLink = section.applyOverride?.link || programApply?.link || ''
  const buttonText = section.applyOverride?.buttonText || programApply?.ctaLabel || 'Apply Now'

  return (
    <section className="mt-16 px-[5vw]">
      <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-8">
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
          className="inline-block rounded-md border border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors duration-[600ms] ease-in-out hover:bg-white hover:text-black"
        >
          {buttonText}
        </a>
      ) : (
        <Apply
          isOpen={applyStatus}
          applicationLink={applyLink}
          statusClassName="w-full md:w-[40vw] md:mb-0"
        />
      )}
    </section>
  )
}
