import { ApproachCard, BuildTab, ProgramTrack, Testimonial } from '../types'

export const devTeamShowcaseContent = {
  heroTitle: 'DEV\nTEAM',
  heroDescription:
    'Build in a small cohort from 0 → 1. Learn what it takes to get and maintain users, ship production code, and grow as an engineer alongside the best builders at NYU.',
  applyStatusFallback: 'Next cohort: Fall 2025',
  approachTitle: 'Build, Ship, Repeat',
  buildEyebrow: 'Startup Portfolio',
  buildTitle: 'Introducing Your\nStartups',
  trackHeading: 'Programmatic Support',
  tracksTitle: 'The Semester\nArc',
  finalBody: 'If you are a startup, lab, or company looking for a fast-moving student team to prototype, ship, or pressure-test a real product idea, reach out. We are always open to strong partners and meaningful problems.',
  contactHref: 'mailto:devteam@techatnyu.org',
  contactLabel: 'Reach Out',
}

export const devTeamTestimonials: Testimonial[] = [
  {
    id: 'jane',
    company: 'Google',
    quote: '"Dev Team gave me the structured environment to go from tutorial hell to shipping real products. I built my portfolio, found my co-founder, and landed my first internship — all in one semester."',
    name: 'Jane Kim',
    title: 'SWE Intern @ Google',
    cohort: 'Spring 2024',
  },
  {
    id: 'alex',
    company: 'Meta',
    quote: '"The feedback loops in Dev Team are unlike anything else at NYU. Weekly standups with industry mentors pushed my code quality from hobby-level to production-ready in weeks."',
    name: 'Alex Chen',
    title: 'Software Engineer @ Meta',
    cohort: 'Fall 2023',
  },
  {
    id: 'priya',
    company: 'Stripe',
    quote: '"I came in knowing Python basics. I left having shipped a full-stack app with 500+ users. Dev Team doesn\'t teach you to code — it teaches you to build."',
    name: 'Priya Sharma',
    title: 'Backend Engineer @ Stripe',
    cohort: 'Spring 2023',
  },
]

export const devTeamApproachCards: ApproachCard[] = [
  {
    id: 'build',
    title: 'Build in\nPublic',
    body: 'Ship real software to real users from week one. Every sprint ends with a deployment. No toy projects — only production code that solves actual problems.',
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
  },
  {
    id: 'ship',
    title: 'Ship to Real\nUsers',
    body: "Your code isn't real until someone uses it. We obsess over user metrics, retention, and feedback loops — the same frameworks used at top tech companies.",
    glow: 'rgba(77, 255, 148, 0.4)',
    accentColor: '#4DFF94',
  },
  {
    id: 'grow',
    title: 'Grow as\nEngineers',
    body: 'Weekly code reviews, industry mentor sessions, and pair programming build engineering intuition that no course can replicate.',
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
  },
]

export const devTeamBuildTabs: BuildTab[] = [
  {
    id: 'the-interface',
    serial: 'AI World Model Simulation',
    title: 'The Interface',
    badge: 'YC S25',
    badgeTone: 'public',
    description:
      'One public company in the portfolio. The Interface is a frontier lab building foundational neural engines and models for AI-simulated cities and high-fidelity virtual worlds.',
    companySummary:
      'A frontier simulation lab building foundational neural engines and models for AI-simulated cities.',
    cohortWork:
      'Cohort teams could work on simulation tooling, visualization systems, eval surfaces, data pipelines, or operator workflows that make large synthetic environments usable.',
    facts: ['YC S25', 'AI-simulated cities', 'Foundational neural engines'],
  },
  {
    id: 'nozomio-labs',
    serial: 'Context Infrastructure',
    title: 'Nozomio',
    badge: 'YC S25',
    badgeTone: 'public',
    description:
      'A second public company in the portfolio. Nozomio is building Nia, a context layer that gives agents up-to-date access to repositories, docs, PDFs, Slack, and local knowledge sources.',
    companySummary:
      'An applied product lab building Nia, a context infrastructure layer for coding agents and software teams.',
    cohortWork:
      'Cohort teams could work on retrieval pipelines, evals, agent UX, source connectors, or systems that keep agent context legible, fresh, and reliable.',
    facts: ['YC S25', 'Nia context layer', 'Agent infrastructure'],
  },
  {
    id: 'redacted-03',
    serial: '03',
    title: '[REDACTED]',
    badge: 'Redacted',
    badgeTone: 'redacted',
    description:
      'Another company held in redacted state by design. The point is to show that multiple startups are coming through the pipeline even when not every team is ready to be named publicly.',
    companySummary: 'A second stealth company used to show the active breadth of the Dev Team portfolio.',
    cohortWork: 'Cohort teams could own infrastructure, product polish, or early feature delivery before public reveal.',
    facts: ['Stealth presentation layer', 'Protected while iterating', 'Still reads as real portfolio output'],
  },
  {
    id: 'redacted-04',
    serial: '04',
    title: '[REDACTED]',
    badge: 'Redacted',
    badgeTone: 'redacted',
    description:
      'A final hidden slot rounds out the roster. It gives Dev Team a distinct startup-portfolio feel instead of framing the cohort around a single shared stack.',
    companySummary: 'A final unreleased company entry that rounds out the startup roster without breaking confidentiality.',
    cohortWork: 'Cohort teams could support launch preparation, technical cleanup, or fast iteration on core workflows.',
    facts: ['Deliberately unrevealed', 'Portfolio slot stays live', 'Supports the stealth-to-public arc'],
  },
]

export const devTeamTracks: ProgramTrack[] = [
  {
    id: 'onboarding',
    label: 'Onboarding',
    title: 'Orientation & Stack Setup',
    body: 'Get your local environment, CI/CD pipeline, and team norms established. We align on tech stack, tooling, and project specification before writing a single line of feature code.',
  },
  {
    id: 'build',
    label: 'Build Sprint',
    title: 'Core Development',
    body: 'Two-week sprints with defined scope, daily standups, and a shipped increment at the end of each cycle. Mentors review PRs, unblock architecture decisions, and push code quality.',
  },
  {
    id: 'growth',
    label: 'User Growth',
    title: 'Launch & Acquisition',
    body: 'Deploy your v1, run guerrilla user testing sessions, and instrument analytics. We treat user growth as an engineering problem — A/B tests, funnels, and retention loops.',
  },
  {
    id: 'polish',
    label: 'Polish',
    title: 'Refinement & Demo Prep',
    body: 'Performance audits, accessibility passes, and documentation sprints. Prepare for the end-of-cohort showcase where you demo to industry professionals and potential employers.',
  },
  {
    id: 'demo',
    label: 'Demo Day',
    title: 'Showcase & Next Steps',
    body: "Present your shipped product to an audience of engineers, founders, and recruiters from top tech companies. The best projects get featured on Tech@NYU's platforms and alumni network.",
  },
]
