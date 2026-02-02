import TeamGrid from '@/components/sections/team/team_grid'
import { getTeamMembers } from '@/lib/sanity/queries'
import React from 'react'

export const revalidate = 3600;

const Page = async () => {
  // Fetch team members on the server
  const teamMembers = await getTeamMembers()

  return (
    <div className='bg-black min-h-screen w-[100svw]'>
        <TeamGrid initialTeamMembers={teamMembers} />
    </div>
  )
}

export default Page
