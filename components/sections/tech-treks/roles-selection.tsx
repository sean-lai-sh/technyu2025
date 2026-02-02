import React from 'react'
import RoleCard from '@/components/ui/role-card'
import { techTreksMemberData, techTreksPMData } from '@/lib/consts'
import { getRoleApplicationLink } from '@/lib/application-links'

const RolesSelection = () => {
  const memberLink = getRoleApplicationLink('Tech Treks', techTreksMemberData.title)
  const pmLink = getRoleApplicationLink('Tech Treks', techTreksPMData.title)

  return (
    <section id='roles'>
      <div className='mt-16 mb-8'>
        <h2 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-12'>
          Choose Your Path
        </h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
          <RoleCard
            {...techTreksMemberData}
            applicationsOpen={memberLink.status}
            applicationLink={memberLink.link}
            onApply={() => console.log('Member application clicked')}
          />
          
          <RoleCard
            {...techTreksPMData}
            applicationsOpen={pmLink.status}
            applicationLink={pmLink.link}
            onApply={() => console.log('PM application clicked')}
          />
        </div>
      </div>
    </section>
  )
}

export default RolesSelection
