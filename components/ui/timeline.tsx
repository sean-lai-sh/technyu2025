import React from 'react'

export interface TimelineEvent {
  year: string
  title: string
  order: number
}

interface TimelineProps {
  events: TimelineEvent[]
}

const Timeline = ({ events }: TimelineProps) => {
  // Group events by year
  const eventsByYear = events.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = []
    }
    acc[event.year].push(event)
    return acc
  }, {} as Record<string, TimelineEvent[]>)

  // Sort years descending (most recent first)
  const sortedYears = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <div className="space-y-8">
      {sortedYears.map((year) => (
        <div key={year} className="space-y-4">
          {/* Year Header */}
          <h3 className="text-2xl font-normal text-white/48">
            {year}
          </h3>
          
          {/* Timeline Items for this Year */}
          <div className="space-y-6 pl-4 border-l border-white/20">
            {eventsByYear[year]
              .sort((a, b) => a.order - b.order)
              .map((event, idx) => (
                <div key={idx} className="relative pl-4">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-white/50" />
                  
                  {/* Content */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-white">
                      {event.title}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Timeline