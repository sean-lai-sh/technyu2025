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

export type ProgramTrackKey = 'grow-yourself' | 'grow-the-community'

export type ProgramStageKey =
  | 'find-your-role'
  | 'hone-your-role'
  | 'practice-your-role'
  | 'organize-and-network'

export type ProgramStageMeta = {
  name: ProgramStageName
  key: ProgramStageKey
  trackKey: ProgramTrackKey
  trackLabel: string
  sequence?: number
  childDetails?: { label: string; detail: string }[]
  label: string
  summary: string
  audience: string
  outcome: string
  position: string
  detail: string
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
