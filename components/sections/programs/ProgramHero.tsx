import React from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Apply } from '@/components/ui/Apply'
import { PortableTextBlock } from '@/lib/types'

interface ProgramHeroProps {
  name: string
  title?: string
  body: PortableTextBlock[]
  logoImageUrl: string
  heroImageUrl?: string
  apply?: {
    status?: boolean
    link?: string
    ctaLabel?: string
    statusText?: string
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
          className="text-blue-500 hover:text-blue-400 transition-colors"
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
      <p className="text-white text-lg md:text-xl lg:text-2xl mb-6">{children}</p>
    ),
  },
}

export default function ProgramHero({
  name,
  title,
  body,
  logoImageUrl,
  apply,
}: ProgramHeroProps) {
  const displayTitle = title || name

  return (
    <section className="flex flex-col-reverse md:flex-row md:justify-between px-[5vw] md:px-[10svw] lg:px-[5svw]">
      <div className="lg:max-w-[60vw] min-w-[40vw]">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-left pb-10">
          {displayTitle}
        </h1>
        <div className="text-white">
          <PortableText value={body} components={portableTextComponents} />
        </div>
        {apply && (
          <Apply
            isOpen={apply.status || false}
            applicationLink={apply.link || ''}
            statusClassName="md:w-[16rem] md:mb-0"
          />
        )}
      </div>
      {logoImageUrl && (
        <Image
          src={logoImageUrl}
          alt={name}
          width={200}
          height={200}
          className="object-contain w-full md:w-[40vw] h-fit lg:max-w-[30vw]"
        />
      )}
    </section>
  )
}
