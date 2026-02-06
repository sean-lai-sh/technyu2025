import React from 'react'
import { getAllPrograms } from '@/lib/sanity/queries'
import { ProgramCardProps } from '@/lib/types'
import ProgramCard from './pcard/program-card'

const ProgramSection = async () => {
  // Fetch programs from CMS
  const programs = await getAllPrograms()

  // Transform Sanity data to match ProgramCardProps interface
  const programsData: ProgramCardProps[] = programs.map((program) => ({
    name: program.name,
    url: `/programs/${program.slug}`,
    svgicon: program.svgIconUrl || '',
    tagline: program.tagline || '',
    description_small: program.descriptionSmall || '',
    description_large: program.descriptionLarge || '',
    desktopImage: program.desktopImageUrl || '',
    applicationStatus: program.apply?.status ?? false,
  }))

  return (
    <section id='programs'>
      <div className='w-full h-fit flex flex-col items-center gap-10 md:gap-20 pt-5 pb-20'>
        <h1 className='text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center'>Our Programs</h1>
        {programsData.map((program, index) => (
            <ProgramCard key={program.name} ProgramDetail={program} variant={index % 2 === 0 ? 'green' : 'purple'} />
        ))}
      </div>
    </section>
  )
}

export default ProgramSection
