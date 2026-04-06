export type ProgramSource = {
  _id: string
  name: string
  slug: string
  tagline?: string
  descriptionSmall?: string
  descriptionLarge?: string
  svgIconUrl?: string
  desktopImageUrl?: string
  apply?: {
    status?: boolean
    link?: string
  }
}

export type ProgramStageName =
  | 'Tech Treks'
  | 'Mentorship'
  | 'Dev Team'
  | 'Startup Week'

export type ProgramStageKey =
  | 'find-your-role'
  | 'hone-your-role'
  | 'practice-your-role'
  | 'contribute-and-network-back'

export type ProgramStageMeta = {
  name: ProgramStageName
  key: ProgramStageKey
  label: string
  summary: string
  audience: string
  outcome: string
  position: string
  accent: string
  accentSoft: string
}

export type ProgramV2ViewModel = ProgramSource & {
  stage: ProgramStageMeta
  isApplicationOpen: boolean
  applicationHref?: string
  body: string
  intro: string
}

