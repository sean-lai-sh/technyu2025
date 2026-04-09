export type Testimonial = {
  id: string
  company: string
  quote: string
  name: string
  title: string
  cohort: string
}

export type ApproachCard = {
  id: string
  title: string
  body: string
  glow: string
  accentColor: string
}

export type BuildTab = {
  id: string
  title: string
  description: string
  companySummary?: string
  cohortWork?: string
  badge?: string
  badgeTone?: 'public' | 'redacted' | 'neutral'
  serial?: string
  facts?: string[]
}

export type ProgramTrack = {
  id: string
  label: string
  title: string
  body: string
}

export type ProgramImageAsset = {
  src: string
  alt: string
}

export type ProgramPillar = {
  id: string
  title: string
  description: string
  outcome: string
}
