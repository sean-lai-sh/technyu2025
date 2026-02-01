import React from 'react'
import TwoColumnSection from '../ui/TwoColumnSection'
import { aboutSectionContent } from '@/lib/sectionContent'
import { Square } from 'lucide-react'

const About = () => {
  return (
    <section className='w-[100svw] py-20'>
      <h1 className='pb-8 lg:container w-[100svw] flex flex-1 gap-1 px-10 lg:px-[3.4rem] xl:px-[6.6rem]'>
        <Square className='h-6 w-6' />
        About Us
      </h1>
      <div className='min-h-[50vh]lg:container w-full px-10 lg:px-[3.4rem] xl:px-[12svw] '>
        <TwoColumnSection {...aboutSectionContent[0]} />
        <TwoColumnSection {...aboutSectionContent[1]} />
        <TwoColumnSection {...aboutSectionContent[2]} />
        <TwoColumnSection {...aboutSectionContent[3]} last={true} />
      </div>
    </section>
  )
}

export default About
