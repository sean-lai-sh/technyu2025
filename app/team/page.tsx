import type { Metadata } from 'next'
import TeamGrid from '@/components/sections/team/team_grid'
import { SITE_DESCRIPTION } from '@/lib/seo'
import { getTeamMembers } from '@/lib/sanity/queries'
import React from 'react'

export const revalidate = 3600;
export const metadata: Metadata = {
  title: 'Team',
  description: SITE_DESCRIPTION,
}

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
