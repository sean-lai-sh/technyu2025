import React from 'react'
import TwoColumnSection from '../ui/TwoColumnSection'
import { aboutSectionContent } from '@/lib/sectionContent'

const About = () => {
  return (
    <section className='w-[100svw] lg:mx-auto lg:container px-10 min-h-[40vh] py-20'>
      <h1 className='pb-8'>About Us</h1>
      <div className='min-h-[50vh]'>
        <TwoColumnSection {...aboutSectionContent[0]} />
        <TwoColumnSection {...aboutSectionContent[1]} />
        <TwoColumnSection {...aboutSectionContent[2]} />
        <TwoColumnSection {...aboutSectionContent[3]} />
      </div>
    </section>
  )
}

export default About
