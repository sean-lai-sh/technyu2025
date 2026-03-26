import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
          className="font-medium text-[#4DFF94] hover:text-[#8DFFC0] transition-colors"
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
      <p className="mb-5 text-base leading-relaxed text-white/88 md:text-lg lg:text-xl">{children}</p>
    ),
  },
}

export default function ProgramHero({
  name,
  title,
  body,
  logoImageUrl,
  heroImageUrl,
  apply,
}: ProgramHeroProps) {
  const displayTitle = title || name
  const isOpen = apply?.status || false
  const hasApplyLink = Boolean(apply?.link)

  return (
    <section className="px-[5vw]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="rounded-2xl border border-white/12 bg-black/45 p-6 shadow-[inset_0_0_80px_rgba(77,255,148,0.08)] md:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
              Program
            </span>
            {apply?.statusText ? (
              <span className="font-[family-name:var(--font-inter)] text-sm text-white/55">
                {apply.statusText}
              </span>
            ) : null}
          </div>

          <h1 className="pb-6 font-[family-name:var(--font-darker-grotesque)] text-5xl font-extrabold leading-[0.92] tracking-tight text-white md:text-6xl lg:text-7xl">
            {displayTitle}
          </h1>

          <div className="max-w-[68ch]">
            <PortableText value={body} components={portableTextComponents} />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Apply
              isOpen={isOpen}
              applicationLink={apply?.link || ''}
              statusClassName="mb-0 md:w-[18rem]"
            />
            {isOpen && hasApplyLink ? (
              <Link
                href={apply?.link as string}
                className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black"
              >
                {apply?.ctaLabel || 'Apply Now'}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
          {heroImageUrl ? (
            <div className="relative h-[280px] w-full md:h-[420px] lg:h-[520px]">
              <Image
                src={heroImageUrl}
                alt={`${name} hero`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/15" />
            </div>
          ) : (
            <div className="flex h-[280px] items-center justify-center p-10 md:h-[420px] lg:h-[520px]">
              {logoImageUrl ? (
                <Image
                  src={logoImageUrl}
                  alt={name}
                  width={560}
                  height={560}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="rounded-lg border border-white/20 px-6 py-4 font-[family-name:var(--font-darker-grotesque)] text-4xl font-bold text-white">
                  {name}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
