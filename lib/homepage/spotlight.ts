export type SpotlightLinkMode = 'internal' | 'external' | 'luma' | 'markdown'

export type SpotlightItem = {
  eyebrow: string
  title: string
  summary: string
  image: string
  ctaLabel: string
  linkMode: SpotlightLinkMode
  url: string
  badge?: string
  date?: string
  slug?: string
  markdownPath?: string
}

export type SpotlightContent = {
  featuredItem: SpotlightItem
  items: [SpotlightItem, SpotlightItem, SpotlightItem]
}

export const spotlightContent: SpotlightContent = {
  featuredItem: {
    eyebrow: 'Roadmap',
    title: 'Our Roadmap for Startup Week and Buildathon',
    summary:
      'A working view into how Tech@NYU is planning its biggest near-term initiatives across Startup Week and Buildathon.',
    image: '/event-pics/buildathon.jpg',
    ctaLabel: 'View Roadmap',
    linkMode: 'internal',
    url: '/programs/startup-week',
    badge: 'Main story',
    date: 'Spring 2026',
  },
  items: [
    {
      eyebrow: 'Partnerships',
      title: 'Our Databricks Partnership',
      summary:
        'A closer look at one of the relationships helping shape programming, exposure, and technical opportunities.',
      image: '/event-pics/panel.jpg',
      ctaLabel: 'Read More',
    linkMode: 'internal',
    url: '/programs/tech-treks',
    badge: 'Left',
    date: 'Partner update',
  },
    {
      eyebrow: 'Programs',
      title: 'Revamping of Our Program Placements',
      summary:
        'An editorial take on how the club is rethinking where people fit and how they move through the system.',
      image: '/event-pics/mentorship2.jpg',
      ctaLabel: 'Read More',
      linkMode: 'internal',
      url: '/programs/mentorship',
      badge: 'Center',
      date: 'System update',
    },
    {
      eyebrow: 'Matching',
      title: 'How Do We Place People?',
      summary:
        'A story about the logic behind role fit, placement, and how members get routed into the right environment.',
      image: '/event-pics/devteam3.jpg',
      ctaLabel: 'Read More',
      linkMode: 'internal',
      url: '/programs/dev-team',
      badge: 'Right',
      date: 'Placement note',
    },
  ],
}
