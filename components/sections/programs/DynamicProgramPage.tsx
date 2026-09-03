import React from 'react'
import { notFound } from 'next/navigation'
import { getProgramBySlug } from '@/lib/sanity/queries'
import type { ProgramSection } from '@/lib/types'
import ProgramHero from './ProgramHero'
import { SectionRenderer } from './sections'

interface DynamicProgramPageProps {
  slug: string
  fallbackSlug?: string
  fallbackName?: string
  fallbackTitle?: string
  fallbackBody?: string
  fallbackSectionMode?: 'all' | 'buildathon'
}

export default async function DynamicProgramPage({
  slug,
  fallbackSlug,
  fallbackName,
  fallbackTitle,
  fallbackBody,
  fallbackSectionMode = 'all',
}: DynamicProgramPageProps) {
  const exactProgram = await getProgramBySlug(slug)
  const program = exactProgram ?? (
    fallbackSlug ? await getProgramBySlug(fallbackSlug) : null
  )

  if (!program) {
    notFound()
  }

  const usesFallback = !exactProgram
  const displayName = usesFallback && fallbackName ? fallbackName : program.name
  const displayTitle = usesFallback && fallbackTitle ? fallbackTitle : program.hero?.title
  const displayBody = usesFallback && fallbackBody
    ? [{
        _key: `${slug}-fallback-body`,
        _type: 'block' as const,
        style: 'normal',
        markDefs: [],
        children: [{
          _key: `${slug}-fallback-body-span`,
          _type: 'span' as const,
          text: fallbackBody,
          marks: [],
        }],
      }]
    : program.hero?.body
  const displaySections = usesFallback && fallbackSectionMode === 'buildathon'
    ? program.sections?.flatMap<ProgramSection>((section) => {
        if (section._type === 'logoSliderSection') return [section]
        if (section._type !== 'stickyScrollSection') return []

        const buildathonItems = section.items.filter((item) =>
          item.title.toLowerCase().includes('buildathon')
        )

        return buildathonItems.length > 0
          ? [{ ...section, heading: 'Buildathon Format', items: buildathonItems }]
          : []
      })
    : program.sections

  return (
    <div className="relative overflow-hidden bg-surface-deep pb-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(65rem 35rem at 85% -5%, rgba(179, 0, 255, 0.14), transparent 62%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_40px] opacity-10" />
      <div className="relative pt-[7svh] md:pt-[18svh]">
        {/* Hero Section */}
        {program.hero && displayBody && (
          <ProgramHero
            name={displayName}
            title={displayTitle}
            body={displayBody}
            logoImageUrl={program.hero.logoImageUrl}
            heroImageUrl={program.hero.heroImageUrl}
            apply={program.apply}
          />
        )}

        {/* Dynamic Sections */}
        {displaySections && displaySections.length > 0 && (
          <SectionRenderer sections={displaySections} programApply={program.apply} />
        )}
      </div>
    </div>
  )
}
