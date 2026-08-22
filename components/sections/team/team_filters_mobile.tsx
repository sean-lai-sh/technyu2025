'use client'

import React from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import TeamSearch from './team_search'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface TeamFiltersMobileProps {
  categories: string[]
  activeFilter: string
  setActiveFilter: (filter: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const TeamFiltersMobile = ({
  categories,
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery
}: TeamFiltersMobileProps) => {
  const handleFilterSelect = (category: string) => {
    setActiveFilter(category)
  }

  return (
    <div className='lg:hidden w-[90%] md:w-[85svw] lg:w-[95svw] lg:px-[2svw] px-4'>
      {/* Header with Title */}
      <div className='flex justify-between items-center mb-2 gap-4'>
        <h2 className='text-heading-1 font-display-semibold text-white mb-4 pt-4 pr-2'>Team</h2>
        
        {/* Search and Filter Row */}
        <div className='flex gap-3 items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger 
              className={cn(
                "text-base font-normal text-white transition-colors focus:outline-none flex items-center gap-2 px-4 py-3 border border-white/20 rounded-lg hover:bg-white/10 whitespace-nowrap"
              )}
            >
              Filter
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border border-white/10 shadow-lg bg-[rgba(17,17,17,0.95)] backdrop-blur-sm p-4 min-w-[200px] mt-2"
            align="end"
            sideOffset={8}
          >
            {categories.map((category) => (
              <DropdownMenuItem 
                key={category} 
                className="hover:bg-[rgba(77,255,148,0.12)] focus:bg-[rgba(77,255,148,0.12)] cursor-pointer px-3 py-2 rounded-md transition-colors"
                onClick={() => handleFilterSelect(category)}
              >
                <span className={cn(
                  "text-white hover:text-accent-green transition-colors",
                  activeFilter === category && "text-accent-green font-medium"
                )}>
                  {category}
                </span>
                {activeFilter === category && (
                  <span className="ml-auto text-accent-green">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
          </DropdownMenu>
          
          <TeamSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            className='flex-1'
          />
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeFilter !== 'All' && (
        <div className='flex items-center gap-2 text-white mb-4'>
          <span className='text-sm'>Active filter:</span>
          <Badge variant="secondary" className="flex items-center gap-1 bg-[rgba(77,255,148,0.12)] text-accent-green border-[rgba(77,255,148,0.3)]">
            {activeFilter}
            <button
              onClick={() => setActiveFilter('All')}
              className="ml-1 hover:text-white transition-colors"
              aria-label="Clear filter"
            >
              <X size={12} />
            </button>
          </Badge>
        </div>
      )}
    </div>
  )
}

export default TeamFiltersMobile
