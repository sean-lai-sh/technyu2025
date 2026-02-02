'use client'
import React from 'react'
import RoleCard from '@/components/ui/role-card'
import { startupWeekRoles } from '@/lib/consts'
import { getRoleApplicationLink } from '@/lib/application-links'

const StartupWeekRoles = () => {
  return (
    <section id='get-involved' className='mt-16 px-[5vw] pb-20'>
      <h2 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-8'>Get Involved</h2>
      <h3 className='text-white text-lg md:text-xl lg:text-2xl font-bold'>
        Not a student? Looking to sponsor, volunteer, or recruit at Startup Week?
      </h3>
      <p className='text-white text-lg mb-6'>
        Send an email to <a href="mailto:startupweek@techatnyu.org" className='text-blue-500 hover:text-blue-400 transition-colors'>startupweek@techatnyu.org</a>
      </p>
      <h3 className='text-white text-xl md:text-2xl lg:text-3xl font-bold mt-8 mb-6'>
        Student? Looking to participate in Startup Week?
      </h3>
      <p className='text-white text-lg md:text-xl mb-8'>
        Join our organizing committee and help make Startup Week happen! Choose from one of these roles and apply through a single application:
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
        {startupWeekRoles.map((role, index) => {
          const roleLink = getRoleApplicationLink('Startup Week', role.title)
          return (
            <RoleCard
              key={index}
              {...role}
              applicationsOpen={roleLink.status}
              applicationLink={roleLink.link}
              onApply={() => console.log(`${role.title} application clicked`)}
            />
          )
        })}
      </div>
    </section>
  )
}

export default StartupWeekRoles
