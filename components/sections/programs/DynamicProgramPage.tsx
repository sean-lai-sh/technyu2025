import React from 'react'
import { notFound } from 'next/navigation'
import { getProgramBySlug } from '@/lib/sanity/queries'
import ProgramHero from './ProgramHero'
import { SectionRenderer } from './sections'

interface DynamicProgramPageProps {
  slug: string
}

export default async function DynamicProgramPage({ slug }: DynamicProgramPageProps) {
  const program = await getProgramBySlug(slug)

  if (!program) {
    notFound()
  }

  return (
    <div className="pt-[5svh] md:pt-[20svh]">
      {/* Hero Section */}
      {program.hero && (
        <ProgramHero
          name={program.name}
          title={program.hero.title}
          body={program.hero.body}
          logoImageUrl={program.hero.logoImageUrl}
          heroImageUrl={program.hero.heroImageUrl}
          apply={program.apply}
        />
      )}

      {/* Dynamic Sections */}
      {program.sections && program.sections.length > 0 && (
        <SectionRenderer sections={program.sections} programApply={program.apply} />
      )}
    </div>
  )
}
