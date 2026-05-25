'use client'

import React from 'react'
import TeamSearch from './team_search'

interface TeamFiltersDesktopProps {
  categories: string[]
  activeFilter: string
  setActiveFilter: (filter: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const TeamFiltersDesktop = ({
  categories,
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery
}: TeamFiltersDesktopProps) => {
  return (
    <div className='hidden lg:flex w-[90%] md:w-[85svw] lg:w-[95svw] lg:px-[2svw] justify-between'>
      <div className='py-2 mb-6'>
        <h2 className='text-heading-1 text-white'>Team</h2>
      </div>
      <div className='flex gap-10'>
        {/* Category Filters */}
        <div className='flex flex-wrap items-center gap-x-6 gap-y-2 mb-6'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`font-medium transition-colors hover:text-green-600 pb-1 ${
                activeFilter === category 
                  ? "border-b-2 border-green-500 text-green-600" 
                  : "border-b-2 border-transparent text-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <TeamSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className='mb-6'
        />
      </div>
    </div>
  )
}

export default TeamFiltersDesktop
