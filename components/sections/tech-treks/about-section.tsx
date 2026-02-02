import React from 'react'
import Image from 'next/image'
import { Apply } from '@/components/ui/Apply'
import { getApplicationLink } from '@/lib/application-links'

const AboutSection = () => {
  const { status, link } = getApplicationLink('Tech Treks')

  return (
    <section id='about-tt' className='flex flex-col-reverse md:flex-row md:justify-between'>
      <div className='lg:max-w-[70vw] min-w-[40vw]'>
        <h1 className='text-white text-4xl md:text-5xl lg:text-6xl font-bold text-left pb-10'>Tech Treks</h1>
        <div className='text-white text-lg md:text-xl max-w-2xl space-y-4'>
        <p>
          Initially created to expose freshmen to the tech industry, we realized there were sophomores and juniors just as new to the field. Tech Treks now has two participant types: members and PMs!
        </p>
        <p>
          Members: You will be part of a 12–15 person semesterly cohort that meets twice a week. You’ll work with a small group of 3–4 peers to build a full-stack project for your portfolio over the course of the semester. The program also includes social events, weekly workshops on specific topics, access to leads and PMs with industry experience, and office tours throughout the semester.
        </p>
        <p>
          PMs: You will aid members in building their projects by offering your expertise during our two weekly meetings. In return, you’ll get full-stack management experience and all the same perks that regular members receive!
        </p>
        </div>
        <div className='mt-6'>
          <Apply
            isOpen={status}
            applicationLink={link}
            statusClassName='md:w-[16rem] md:mb-0'
          />
        </div>
      </div>
      <Image
        src={`/program-logos/tech-treks.svg`}
        alt={`Tech Treks`}
        width={200}
        height={200}
        className='object-contain w-full h-full lg:max-w-[30vw] md:max-w-[40%] md:max-h-[40vh]'
      />
    </section>
  )
}

export default AboutSection
