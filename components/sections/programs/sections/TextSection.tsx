import React from 'react'
import { TextSection } from '@/lib/types'
import { PortableText } from '@portabletext/react'

interface TextSectionProps {
  section: TextSection
}

const portableTextComponents = {
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href || '#'
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={href} rel={rel} className="font-medium text-[#4DFF94] hover:text-[#8DFFC0] transition-colors">
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
      <p className="mb-5 text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">{children}</p>
    ),
  },
}

export default function TextSectionComponent({ section }: TextSectionProps) {
  return (
    <section className="mt-18 px-[5vw]">
      <div className="mx-auto max-w-[1240px]">
        <div className="rounded-2xl border border-white/10 bg-surface-base p-6 shadow-[inset_0_0_70px_rgba(179,0,255,0.07)] md:p-8 lg:p-10">
          {section.heading && (
            <h2 className="mb-7 font-[family-name:var(--font-hk-grotesque)] text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              {section.heading}
            </h2>
          )}
          {section.body && (
            <div className="max-w-[72ch]">
              <PortableText value={section.body} components={portableTextComponents} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
