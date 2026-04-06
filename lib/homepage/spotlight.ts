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
    eyebrow: 'Featured',
    title: 'Startup Week is where operators, founders, and builders collide.',
    summary:
      'A flagship moment for the club. Meet the students organizing Startup Week, the companies showing up, and the people turning campus energy into something real.',
    image: '/event-pics/keynote.jpg',
    ctaLabel: 'Explore Startup Week',
    linkMode: 'internal',
    url: '/programs/startup-week',
    badge: 'Flagship',
    date: 'Spring 2026',
  },
  items: [
    {
      eyebrow: 'Calendar',
      title: 'See what is happening next across Tech@NYU.',
      summary:
        'Workshops, demos, office visits, talks, and other things that keep the room moving week after week.',
      image: '/event-pics/workshop.jpg',
      ctaLabel: 'View Events',
      linkMode: 'luma',
      url: 'https://events.techatnyu.org/calendar',
      badge: 'Live',
    },
    {
      eyebrow: 'Mentorship',
      title: 'Guidance is one of the strongest products we run.',
      summary:
        'From resume polish to role clarity, Mentorship is where members tighten their story and decide what to do next.',
      image: '/event-pics/mentorship2.jpg',
      ctaLabel: 'See Mentorship',
      linkMode: 'internal',
      url: '/programs/mentorship',
      date: 'Applications cycle',
    },
    {
      eyebrow: 'Dev Team',
      title: 'We do not just talk about building. We ship.',
      summary:
        'Small cohorts, real users, production pressure, and public proof of work that changes how members think about engineering.',
      image: '/event-pics/devteam3.jpg',
      ctaLabel: 'View Dev Team',
      linkMode: 'internal',
      url: '/programs/dev-team',
      badge: 'Build mode',
    },
  ],
}
