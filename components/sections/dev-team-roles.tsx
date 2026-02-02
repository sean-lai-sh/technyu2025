'use client'
import React from 'react'
import RoleCard from '@/components/ui/role-card'
import { devTeamRoles } from '@/lib/consts'
import { getRoleApplicationLink } from '@/lib/application-links'

const DevTeamRoles = () => {
  return (
    <section id='dev-team-roles' className='mt-16 px-[5vw] pb-20'>
      <h2 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-8'>Ready to join?</h2>
      <p className='text-white text-lg md:text-xl mb-8'>
        If you're curious about AI-powered development workflows, excited to experiment with autonomous coding agents, or interested in building tools that reshape how developers work, there's a place for you on our team.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6'>
        {devTeamRoles.map((role, index) => {
          const roleLink = getRoleApplicationLink('Dev Team', role.title)
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
      <p className='text-white text-lg mb-6'>
        Have questions? Reach out to us at <a href="mailto:devteam@techatnyu.org" className='text-blue-500 hover:text-blue-400 transition-colors'>devteam@techatnyu.org</a>
      </p>
    </section>
  )
}

export default DevTeamRoles
