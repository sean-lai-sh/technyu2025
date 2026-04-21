import type { ProgramStageMeta, ProgramStageName } from './types'

const FALLBACK_STAGE: ProgramStageMeta = {
  name: 'Tech Treks',
  key: 'find-your-role',
  trackKey: 'grow-yourself',
  trackLabel: 'Grow yourself',
  sequence: 1,
  label: 'Find your role',
  summary: 'Explore the club through the path that fits your starting point.',
  audience: 'Students who want a clear first step into Tech@NYU.',
  outcome: 'A better sense of where you fit and what comes next.',
  position: 'Discover the lane that makes sense for you.',
  detail: 'A tight cohort for students looking to find their role in tech and start building.',
  accent: '#B300FF',
  accentSoft: 'rgba(179, 0, 255, 0.16)',
}

export const PROGRAM_STAGE_ORDER: ProgramStageName[] = [
  'Tech Treks',
  'Mentorship',
  'Dev Team',
  'Startup Week',
]

export const PROGRAM_STAGE_MAP: Record<ProgramStageName, ProgramStageMeta> = {
  'Tech Treks': {
    name: 'Tech Treks',
    key: 'find-your-role',
    trackKey: 'grow-yourself',
    trackLabel: 'Grow yourself',
    sequence: 1,
    label: 'Find your role',
    summary:
      'Find your role in a tight cohort while meeting people, visiting companies, and seeing the industry up close.',
    audience:
      'Students who are early in the journey, unsure of their lane, or just want a strong starting point.',
    outcome:
      'A clearer sense of direction and a first step into a more specific path.',
    position: 'A tight cohort for figuring out where you fit.',
    detail:
      'Tight knit 10–12 cohort looking to learn to build in teams and find their niche in tech through workshops and project building.',
    accent: '#B300FF',
    accentSoft: 'rgba(179, 0, 255, 0.16)',
  },
  Mentorship: {
    name: 'Mentorship',
    key: 'hone-your-role',
    trackKey: 'grow-yourself',
    trackLabel: 'Grow yourself',
    sequence: 2,
    label: 'Hone your role',
    summary:
      'Hone your role with targeted guidance, accountability, and sharper career judgment.',
    audience:
      'Students who already have a direction, but need sharper advice, accountability, or career clarity.',
    outcome:
      'Stronger judgment, better framing, and a more intentional path forward.',
    position: 'Direct guidance for students who already have a direction.',
    detail:
      'One-on-one pairings with mentors from Google, Meta, Databricks, and beyond — weekly workshops and personalized 1:1 sessions in cohorts of 10–12.',
    accent: '#7B5CFF',
    accentSoft: 'rgba(123, 92, 255, 0.18)',
  },
  'Dev Team': {
    name: 'Dev Team',
    key: 'practice-your-role',
    trackKey: 'grow-yourself',
    trackLabel: 'Grow yourself',
    sequence: 3,
    label: 'Practice your role',
    summary:
      'Practice your role by shipping with a team where the work has stakes beyond a class project.',
    audience:
      'Students who want to ship, contribute, and learn by doing with real accountability.',
    outcome:
      'Practical experience, shipped work, and a better sense of how to operate on a team.',
    position: 'A place to turn your role into shipped work.',
    detail:
      'Startup-style pods shipping production code to real users. Two-week sprints with PR reviews, architecture guidance, and a demo day in front of engineers and recruiters.',
    accent: '#72FFBF',
    accentSoft: 'rgba(114, 255, 191, 0.3)',
  },
  'Startup Week': {
    name: 'Startup Week',
    key: 'organize-and-network',
    trackKey: 'grow-the-community',
    trackLabel: 'Grow the community',
    childDetails: [
      {
        label: 'Buildathon',
        detail:
          "NYU's flagship hackathon — 24 hours to build, compete for prizes, and ship fast alongside students across the university.",
      },
      {
        label: 'SW Events',
        detail:
          'Speaker panels, networking nights, and industry mixers that bring hundreds of students into the same room.',
      },
    ],
    label: 'Organize and network',
    summary:
      'Build Startup Week, Buildathon, and the events that pull more people into Tech@NYU.',
    audience:
      'Students who want to organize, connect people, and help the club show up at a community level.',
    outcome:
      'Broader relationships, better operator instincts, and a visible hand in how the community grows.',
    position: 'The organizing track for growing the room around the club.',
    detail:
      "The annual event week bringing NYU's tech community into one room — panels, Buildathon, and networking organized entirely by students.",
    accent: '#62FFAE',
    accentSoft: 'rgba(98, 255, 174, 0.24)',
  },
}

export const getProgramStageMeta = (name: string): ProgramStageMeta => {
  return PROGRAM_STAGE_MAP[name as ProgramStageName] ?? FALLBACK_STAGE
}

export const getOrderedProgramStages = () =>
  PROGRAM_STAGE_ORDER.map((name) => PROGRAM_STAGE_MAP[name])
