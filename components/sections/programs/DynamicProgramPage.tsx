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
    <div className="relative overflow-hidden bg-[#050505] pb-24">
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
    </div>
  )
}
