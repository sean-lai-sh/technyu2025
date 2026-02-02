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
        <a href={href} rel={rel} className="text-blue-500 hover:text-blue-400 transition-colors">
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
      <p className="text-white text-lg md:text-xl lg:text-2xl mb-6">{children}</p>
    ),
  },
}

export default function TextSectionComponent({ section }: TextSectionProps) {
  return (
    <section className="mt-16 px-[5vw]">
      {section.heading && (
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-8">
          {section.heading}
        </h2>
      )}
      {section.body && (
        <div className="max-w-4xl">
          <PortableText value={section.body} components={portableTextComponents} />
        </div>
      )}
    </section>
  )
}
