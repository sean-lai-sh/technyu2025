import React from 'react'

interface TimelineEvent {
  year: string
  title: string
  description: string
  organization?: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Continuous vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10" />
      
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="relative pl-8 pb-8">
            {/* Timeline dot - aligned with year text */}
            <div className="absolute left-[-3px] top-[6px] w-2 h-2 rounded-full bg-white" />
            
            {/* Content */}
            <div className="space-y-2">
              <p className="text-sm text-white/48 font-medium">{event.year}</p>
              <h3 className="text-heading-2 font-display-semibold text-white">{event.title}</h3>
              {event.organization && (
                <p className="text-base text-white/72">{event.organization}</p>
              )}
              <p className="text-base text-white/72 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Example boilerplate data
export const exampleTimelineData: TimelineEvent[] = [
  {
    year: '2024',
    title: 'E-Board Member',
    organization: 'Tech@NYU',
    description: 'Joined the executive board to help lead and grow the Tech@NYU community.',
  },
  {
    year: '2023',
    title: 'Active Member',
    organization: 'Tech@NYU',
    description: 'Participated in various programs including Dev Team and Mentorship initiatives.',
  },
  {
    year: '2022',
    title: 'Started at NYU',
    organization: 'New York University',
    description: 'Began undergraduate studies in Computer Science and joined Tech@NYU.',
  },
]
