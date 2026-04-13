import { ApproachCard, BuildTab, ProgramImageAsset, ProgramPillar, ProgramTrack, Testimonial } from '../types'

export const techTreksShowcaseContent = {
  heroTitle: 'TECH\nTREKS',
  heroDescription:
    'Explore the tech industry with a cohort built for beginners and early builders. Meet professionals, visit companies, and ship portfolio-ready work.',
  heroImageFallback: '/program-logos/tech-treks-desktop.jpg',
  applyStatusFallback: 'Cohorts launch each semester',
  approachTitle: 'Explore, Build, Belong',
  pillarsHeading: 'Core Program Components',
  pillarsTitle: 'How Tech Treks Works',
  buildEyebrow: "What You'll Build",
  buildTitle: "What You'll\nExperience",
  trackHeading: 'Semester Structure',
  tracksTitle: 'From Curiosity\nTo Confidence',
  finalKicker: 'Ready to Explore?',
  finalTitle: 'Start your path',
  finalAccent: 'in tech.',
  finalBody: 'Tech Treks helps you turn curiosity into momentum through real exposure, practical projects, and strong community support.',
  finalClosedHint: 'Join the next incoming cohort',
}

export const techTreksTestimonials: Testimonial[] = [
  {
    id: 'omar',
    company: 'Amazon',
    quote: '"Tech Treks made the industry feel tangible. Visiting teams in person and hearing their workflows gave me clarity on where I fit and what to build next."',
    name: 'Omar Rahman',
    title: 'SDE Intern @ Amazon',
    cohort: 'Spring 2024',
  },
  {
    id: 'lucy',
    company: 'Palantir',
    quote: '"I joined with zero confidence and left with a portfolio project, mentors I still talk to, and a much clearer roadmap into tech."',
    name: 'Lucy Zhao',
    title: 'Forward Deployed Intern @ Palantir',
    cohort: 'Fall 2023',
  },
  {
    id: 'isaac',
    company: 'TikTok',
    quote: '"The PM track pushed me to lead a team and ship. Tech Treks gave me both product thinking and execution reps in one semester."',
    name: 'Isaac Rivera',
    title: 'Product Intern @ TikTok',
    cohort: 'Spring 2024',
  },
]

export const techTreksApproachCards: ApproachCard[] = [
  {
    id: 'exposure',
    title: 'Industry\nExposure',
    body: 'Visit companies, meet teams, and hear real career paths from engineers and PMs. You get firsthand context beyond social media advice.',
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
  },
  {
    id: 'workshops',
    title: 'Hands-On\nWorkshops',
    body: 'Weekly workshop sessions cover technical fundamentals, portfolio strategy, and internship readiness with practical deliverables each week.',
    glow: 'rgba(77, 255, 148, 0.4)',
    accentColor: '#4DFF94',
  },
  {
    id: 'cohort',
    title: 'Small Cohort\nSupport',
    body: 'You are placed in a focused group with peers and PM leads who keep accountability high and feedback loops fast throughout semester.',
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
  },
]

export const techTreksApproachImages: ProgramImageAsset[] = [
  { src: '/event-pics/img2.jpg', alt: 'Tech Treks company visit' },
  { src: '/event-pics/workshop.jpg', alt: 'Tech Treks workshop' },
  { src: '/event-pics/img3.jpg', alt: 'Tech Treks cohort project time' },
]

export const techTreksPillars: ProgramPillar[] = [
  {
    id: 'workshops',
    title: 'Workshops',
    description:
      'Weekly technical workshops build core SWE fundamentals through guided exercises and collaborative practice.',
    outcome: 'You leave each week with practical skills you can immediately apply.',
  },
  {
    id: 'projects',
    title: 'Team Projects',
    description:
      'Small teams of 2-3 build one focused project through the semester and present the final result to the cohort.',
    outcome: 'You gain real team-building reps and a portfolio-ready project.',
  },
  {
    id: 'tours',
    title: 'Office Tours',
    description:
      'Company visits and conversations with industry professionals give direct exposure to how teams build in the real world.',
    outcome: 'You build clarity on roles, cultures, and career paths in tech.',
  },
]

export const techTreksBuildTabs: BuildTab[] = [
  {
    id: 'cli',
    title: 'Company\nTreks',
    description:
      'Get direct exposure to engineering cultures through company visits and conversations with operators across product, engineering, and recruiting.',
  },
  {
    id: 'web',
    title: 'Workshop\nTracks',
    description:
      'Progress through beginner-friendly sessions that build your technical foundation while keeping pace with internship recruiting timelines.',
  },
  {
    id: 'ml',
    title: 'Portfolio\nProjects',
    description:
      'Ship scoped projects with guidance from PMs and mentors. Build public proof of work that you can showcase in applications and interviews.',
  },
  {
    id: 'oss',
    title: 'PM\nLeadership',
    description:
      'Lead a pod of members, define project scope, and run delivery cycles. Build communication and team leadership skills that stand out on resumes.',
  },
]

export const techTreksBuildImages: ProgramImageAsset[] = [
  { src: '/event-pics/img10.jpg', alt: 'Tech Treks members at event' },
  { src: '/event-pics/eboard_pic.jpg', alt: 'Tech Treks leadership team' },
  { src: '/event-pics/eboardpic1.jpg', alt: 'Tech Treks cohort collaboration' },
  { src: '/event-pics/keynote.jpg', alt: 'Tech Treks keynote session' },
]

export const techTreksTracks: ProgramTrack[] = [
  {
    id: 'onboard',
    label: 'Onboard',
    title: 'Cohort Kickoff',
    body: 'Start with orientation, pod assignments, and goal setting so every member has clarity on outcomes and project expectations.',
  },
  {
    id: 'explore',
    label: 'Explore',
    title: 'Industry Exploration',
    body: 'Join company treks, speaker sessions, and founder conversations to understand different career paths and role expectations.',
  },
  {
    id: 'build',
    label: 'Build',
    title: 'Project Sprint',
    body: 'Members work in pods with PM support to ship portfolio-ready projects in iterative weekly milestones.',
  },
  {
    id: 'polish',
    label: 'Polish',
    title: 'Interview & Resume Polish',
    body: 'Refine your technical story, project narratives, and interview readiness with targeted mock sessions and feedback loops.',
  },
  {
    id: 'showcase',
    label: 'Showcase',
    title: 'Demo & Network',
    body: 'End the semester by demoing projects and connecting with mentors, alumni, and peers for continued growth opportunities.',
  },
]
