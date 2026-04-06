import type { ProgramStageMeta, ProgramStageName } from './types'

const FALLBACK_STAGE: ProgramStageMeta = {
  name: 'Tech Treks',
  key: 'find-your-role',
  label: 'Find your role',
  summary: 'Explore the club through the path that fits your starting point.',
  audience: 'Students who want a clear first step into Tech@NYU.',
  outcome: 'A better sense of where you fit and what comes next.',
  position: 'Discover the lane that makes sense for you.',
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
    label: 'Find your role',
    summary:
      'Explore the ecosystem, meet people, and figure out where you naturally belong.',
    audience:
      'Students who are early in the journey, unsure of their lane, or just want a strong starting point.',
    outcome:
      'A clearer sense of direction and a first step into a more specific path.',
    position: 'A beginner-friendly entry into the club.',
    accent: '#B300FF',
    accentSoft: 'rgba(179, 0, 255, 0.16)',
  },
  Mentorship: {
    name: 'Mentorship',
    key: 'hone-your-role',
    label: 'Hone your role',
    summary:
      'Get targeted guidance that sharpens your decision-making and helps you move with more confidence.',
    audience:
      'Students who already have a direction, but need sharper advice, accountability, or career clarity.',
    outcome:
      'Stronger judgment, better framing, and a more intentional path forward.',
    position: 'Support for students who want to refine what they are doing.',
    accent: '#B300FF',
    accentSoft: 'rgba(179, 0, 255, 0.16)',
  },
  'Dev Team': {
    name: 'Dev Team',
    key: 'practice-your-role',
    label: 'Practice your role',
    summary:
      'Build in a team setting where the skills you use actually matter to the outcome.',
    audience:
      'Students who want to ship, contribute, and learn by doing with real accountability.',
    outcome:
      'Practical experience, shipped work, and a better sense of how to operate on a team.',
    position: 'A place to turn skill into output.',
    accent: '#4DFF94',
    accentSoft: 'rgba(77, 255, 148, 0.16)',
  },
  'Startup Week': {
    name: 'Startup Week',
    key: 'contribute-and-network-back',
    label: 'Contribute and network back',
    summary:
      'Help create the event, grow the network, and give back to the ecosystem that supported you.',
    audience:
      'Students who want to organize, connect, and contribute at a higher level.',
    outcome:
      'Stronger relationships, broader exposure, and a real stake in the community.',
    position: 'The give-back loop for the club.',
    accent: '#4DFF94',
    accentSoft: 'rgba(77, 255, 148, 0.16)',
  },
}

export const getProgramStageMeta = (name: string): ProgramStageMeta => {
  return PROGRAM_STAGE_MAP[name as ProgramStageName] ?? FALLBACK_STAGE
}

export const getOrderedProgramStages = () =>
  PROGRAM_STAGE_ORDER.map((name) => PROGRAM_STAGE_MAP[name])
