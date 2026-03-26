'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SanityProgram, RolesSection, CtaSection, PortableTextBlock } from '@/lib/types'
import ProgramHeroSection from './showcase/ProgramHeroSection'
import ProgramAboutSection from './showcase/ProgramAboutSection'
import ProgramPillarsSection from './showcase/ProgramPillarsSection'
import ProgramAlumniSection from './showcase/ProgramAlumniSection'
import ProgramTracksSection from './showcase/ProgramTracksSection'
import { Testimonial, ApproachCard, BuildTab, ProgramTrack, ProgramImageAsset, ProgramPillar } from './showcase/types'

type ProgramVariant = 'dev-team' | 'mentorship' | 'tech-treks'

interface ProgramShowcasePageProps {
  program?: SanityProgram | null
  variant?: ProgramVariant
}

type ProgramSectionKey = 'hero' | 'approach' | 'pillars' | 'alumni' | 'build' | 'tracks' | 'roles' | 'final'

type VariantContent = {
  sections: ProgramSectionKey[]
  heroVisual: 'wireframe' | 'image'
  heroImageFallback?: string
  heroTitle: string
  heroDescription: string
  applyStatusFallback: string
  approachTitle: string
  approachCards: ApproachCard[]
  approachImages?: ProgramImageAsset[]
  pillarsHeading?: string
  pillarsTitle?: string
  pillars?: ProgramPillar[]
  testimonials: Testimonial[]
  buildTitle: string
  buildTabs: BuildTab[]
  buildImages?: ProgramImageAsset[]
  trackHeading: string
  tracksTitle: string
  programTracks: ProgramTrack[]
  finalKicker: string
  finalTitle: string
  finalAccent: string
  finalBody: string
  finalClosedHint: string
}

// ── Static Data ────────────────────────────────────────────────────────────

const testimonials = [
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

const approachCards = [
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

const buildTabs = [
  {
    id: 'cli',
    title: 'AI-Native\nCLI Tools',
    description:
      'Build terminal-first developer tools that integrate with modern AI workflows. Think agentic coding assistants, spec-driven TUIs, and autonomous scaffolding engines that developers actually want to use.',
  },
  {
    id: 'web',
    title: 'Full-Stack\nApplications',
    description:
      'Go from Figma to deployment in a single cohort. Build web applications with modern frameworks, serverless backends, and real database architectures — with users from day one.',
  },
  {
    id: 'ml',
    title: 'Applied ML\nProducts',
    description:
      'Turn models into products. We bridge the gap between ML research and shipped features — building inference APIs, fine-tuning pipelines, and user-facing AI experiences.',
  },
  {
    id: 'oss',
    title: 'Open Source\nContributions',
    description:
      'Build your public portfolio by contributing to high-impact open source projects. Get your commits merged, your name on releases, and your GitHub permanently green.',
  },
]

const programTracks = [
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

const mentorshipTestimonials: Testimonial[] = [
  {
    id: 'maya',
    company: 'Google',
    quote: '"Mentorship gave me a clear strategy when everything felt noisy. My mentor helped me tighten my resume, fix how I told my story, and actually enjoy recruiting again."',
    name: 'Maya Lee',
    title: 'Associate Product Manager @ Google',
    cohort: 'Fall 2024',
  },
  {
    id: 'daniel',
    company: 'Bloomberg',
    quote: '"I thought I needed more leetcode. What I actually needed was structure and accountability. The biweekly sessions kept me focused and moved me from stuck to offers."',
    name: 'Daniel Park',
    title: 'Software Engineer @ Bloomberg',
    cohort: 'Spring 2024',
  },
  {
    id: 'nina',
    company: 'Datadog',
    quote: '"The best part was getting honest feedback from someone already in the role I wanted. Mentorship turned vague goals into a concrete game plan I could execute."',
    name: 'Nina Alvarez',
    title: 'Solutions Engineer @ Datadog',
    cohort: 'Spring 2024',
  },
]

const mentorshipApproachCards: ApproachCard[] = [
  {
    id: 'match',
    title: 'Goal-First\nMatching',
    body: 'Pairing is based on role goals, current skill level, and where you want to be by the end of semester. The match is intentional, not random.',
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
  },
  {
    id: 'cadence',
    title: 'Structured\nCadence',
    body: 'Biweekly meetings with clear check-ins, milestones, and concrete next actions. You always know what to work on before the next session.',
    glow: 'rgba(77, 255, 148, 0.4)',
    accentColor: '#4DFF94',
  },
  {
    id: 'momentum',
    title: 'Career\nMomentum',
    body: 'Resume and portfolio reviews, interview preparation, and role-specific advice from mentors who recently navigated the exact process.',
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
  },
]

const mentorshipBuildTabs: BuildTab[] = [
  {
    id: 'cli',
    title: 'Career\nNarrative',
    description:
      'Craft a clear story around your background, projects, and goals. Learn to position your experience for internships, full-time roles, and startup environments.',
  },
  {
    id: 'web',
    title: 'Interview\nSystems',
    description:
      'Build a practical prep system for technical and behavioral interviews. Focus on consistency, targeted practice, and reflective review after each round.',
  },
  {
    id: 'ml',
    title: 'Skill Gap\nPlanning',
    description:
      'Break your growth path into weekly milestones. Mentors help prioritize what to learn now versus later, so your effort maps directly to outcomes.',
  },
  {
    id: 'oss',
    title: 'Network\nExpansion',
    description:
      'Learn warm outreach, coffee chat strategy, and long-term relationship building. Grow a network that helps beyond a single recruiting cycle.',
  },
]

const mentorshipTracks: ProgramTrack[] = [
  {
    id: 'intake',
    label: 'Intake',
    title: 'Applications & Goal Intake',
    body: 'You submit your goals, timeline, and target roles. The team reviews your profile to map mentor fit and expected outcomes for the semester.',
  },
  {
    id: 'match',
    label: 'Match',
    title: 'Mentor Pairing',
    body: 'Mentors are matched by role relevance and communication style. You begin with a kickoff meeting to define focus areas and session rhythm.',
  },
  {
    id: 'sprint',
    label: 'Sprint',
    title: 'Biweekly Growth Cycles',
    body: 'Each cycle has specific deliverables: updated resume bullets, interview practice logs, project refinements, or outreach tasks.',
  },
  {
    id: 'review',
    label: 'Review',
    title: 'Midpoint Calibration',
    body: 'Halfway through semester, mentors and mentees recalibrate goals based on progress, recruiting timelines, and evolving interests.',
  },
  {
    id: 'handoff',
    label: 'Handoff',
    title: 'Final Plan & Next Steps',
    body: 'Close the cohort with a documented action plan for the next 60-90 days so momentum continues after the formal program ends.',
  },
]

const techTreksTestimonials: Testimonial[] = [
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

const techTreksApproachCards: ApproachCard[] = [
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

const techTreksBuildTabs: BuildTab[] = [
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

const techTreksTracks: ProgramTrack[] = [
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

const techTreksPillars: ProgramPillar[] = [
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

const VARIANT_CONTENT: Record<ProgramVariant, VariantContent> = {
  'dev-team': {
    sections: ['hero', 'approach', 'alumni', 'build', 'tracks', 'roles', 'final'],
    heroVisual: 'wireframe',
    heroTitle: 'DEV\nTEAM',
    heroDescription:
      'Build in a small cohort from 0 → 1. Learn what it takes to get and maintain users, ship production code, and grow as an engineer alongside the best builders at NYU.',
    applyStatusFallback: 'Next cohort: Fall 2025',
    approachTitle: 'Build, Ship, Repeat',
    approachCards,
    testimonials,
    buildTitle: "Choose Your\nStack",
    buildTabs,
    trackHeading: 'Programmatic Support',
    tracksTitle: 'The Semester\nArc',
    programTracks,
    finalKicker: 'Ready to Build?',
    finalTitle: 'Ship something',
    finalAccent: 'real.',
    finalBody: 'Applications open each semester. Cohorts are small by design — every member ships.',
    finalClosedHint: 'Check back next semester',
  },
  mentorship: {
    sections: ['hero', 'approach', 'alumni', 'build', 'tracks', 'final'],
    heroVisual: 'image',
    heroImageFallback: '/program-logos/mentorship-desktop.jpg',
    heroTitle: 'MENTOR\nSHIP',
    heroDescription:
      'Get paired with mentors who have already navigated recruiting, internships, and career pivots. Build a concrete plan and execute it with consistent support.',
    applyStatusFallback: 'Matching opens each semester',
    approachTitle: 'Guidance With Structure',
    approachCards: mentorshipApproachCards,
    approachImages: [
      { src: '/event-pics/mentorship1.jpg', alt: 'Mentorship cohort discussion' },
      { src: '/event-pics/mentorship2.jpg', alt: 'Mentor and mentee session' },
      { src: '/event-pics/mentorship3.jpg', alt: 'Mentorship workshop group' },
    ],
    testimonials: mentorshipTestimonials,
    buildTitle: "What You'll\nBuild",
    buildTabs: mentorshipBuildTabs,
    buildImages: [
      { src: '/event-pics/mentorship4.jpg', alt: 'Mentorship planning session' },
      { src: '/event-pics/mentorship2.jpg', alt: 'Career guidance conversation' },
      { src: '/event-pics/mentorship3.jpg', alt: 'Interview prep discussion' },
      { src: '/event-pics/mentorship1.jpg', alt: 'Mentorship networking group' },
    ],
    trackHeading: 'Program Flow',
    tracksTitle: 'The Mentorship\nArc',
    programTracks: mentorshipTracks,
    finalKicker: 'Ready to Grow?',
    finalTitle: 'Move your career',
    finalAccent: 'forward.',
    finalBody: 'Small cohorts, high-accountability check-ins, and mentors who care about your long-term trajectory.',
    finalClosedHint: 'Applications reopen next cycle',
  },
  'tech-treks': {
    sections: ['hero', 'approach', 'pillars', 'alumni', 'build', 'tracks', 'roles', 'final'],
    heroVisual: 'image',
    heroImageFallback: '/program-logos/tech-treks-desktop.jpg',
    heroTitle: 'TECH\nTREKS',
    heroDescription:
      'Explore the tech industry with a cohort built for beginners and early builders. Meet professionals, visit companies, and ship portfolio-ready work.',
    applyStatusFallback: 'Cohorts launch each semester',
    approachTitle: 'Explore, Build, Belong',
    approachCards: techTreksApproachCards,
    approachImages: [
      { src: '/event-pics/img2.jpg', alt: 'Tech Treks company visit' },
      { src: '/event-pics/workshop.jpg', alt: 'Tech Treks workshop' },
      { src: '/event-pics/img3.jpg', alt: 'Tech Treks cohort project time' },
    ],
    pillarsHeading: 'Core Program Components',
    pillarsTitle: 'How Tech Treks Works',
    pillars: techTreksPillars,
    testimonials: techTreksTestimonials,
    buildTitle: "What You'll\nExperience",
    buildTabs: techTreksBuildTabs,
    buildImages: [
      { src: '/event-pics/img10.jpg', alt: 'Tech Treks members at event' },
      { src: '/event-pics/eboard_pic.jpg', alt: 'Tech Treks leadership team' },
      { src: '/event-pics/eboardpic1.jpg', alt: 'Tech Treks cohort collaboration' },
      { src: '/event-pics/keynote.jpg', alt: 'Tech Treks keynote session' },
    ],
    trackHeading: 'Semester Structure',
    tracksTitle: 'From Curiosity\nTo Confidence',
    programTracks: techTreksTracks,
    finalKicker: 'Ready to Explore?',
    finalTitle: 'Start your path',
    finalAccent: 'in tech.',
    finalBody: 'Tech Treks helps you turn curiosity into momentum through real exposure, practical projects, and strong community support.',
    finalClosedHint: 'Join the next incoming cohort',
  },
}

// ── SVG Wireframes ─────────────────────────────────────────────────────────

function HeroWireframe() {
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <circle cx="240" cy="240" r="200" stroke="#EDEDED" strokeWidth="0.6" strokeDasharray="3 8" opacity="0.2" />
      <circle cx="240" cy="240" r="160" stroke="#EDEDED" strokeWidth="0.5" opacity="0.12" />
      <g opacity="0.85">
        <line x1="240" y1="60" x2="380" y2="170" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="240" y1="60" x2="100" y2="170" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="240" y1="60" x2="240" y2="390" stroke="#EDEDED" strokeWidth="0.8" opacity="0.35" />
        <line x1="380" y1="170" x2="420" y2="305" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="100" y1="170" x2="60" y2="305" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="380" y1="170" x2="100" y2="170" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="380" y1="170" x2="240" y2="390" stroke="#EDEDED" strokeWidth="1" opacity="0.5" />
        <line x1="100" y1="170" x2="240" y2="390" stroke="#EDEDED" strokeWidth="1" opacity="0.5" />
        <line x1="420" y1="305" x2="60" y2="305" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="420" y1="305" x2="240" y2="390" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="60" y1="305" x2="240" y2="390" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="380" y1="170" x2="60" y2="305" stroke="#EDEDED" strokeWidth="0.5" opacity="0.25" />
        <line x1="100" y1="170" x2="420" y2="305" stroke="#EDEDED" strokeWidth="0.5" opacity="0.25" />
        <line x1="240" y1="60" x2="420" y2="305" stroke="#EDEDED" strokeWidth="0.5" opacity="0.22" />
        <line x1="240" y1="60" x2="60" y2="305" stroke="#EDEDED" strokeWidth="0.5" opacity="0.22" />
      </g>
      <circle cx="240" cy="60" r="5" fill="#EDEDED" />
      <circle cx="380" cy="170" r="5" fill="#EDEDED" />
      <circle cx="100" cy="170" r="5" fill="#EDEDED" />
      <circle cx="420" cy="305" r="5" fill="#EDEDED" />
      <circle cx="60" cy="305" r="5" fill="#EDEDED" />
      <circle cx="240" cy="390" r="5" fill="#EDEDED" />
      <circle cx="240" cy="225" r="8" fill="#B300FF" opacity="0.9">
        <animate attributeName="r" values="6;11;6" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="225" r="32" fill="#B300FF" opacity="0.05">
        <animate attributeName="r" values="22;44;22" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="60" r="3" fill="#4DFF94">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="380" cy="170" r="3" fill="#4DFF94">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="420" cy="305" r="3" fill="#B300FF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
      </circle>
      <circle cx="60" cy="305" r="3" fill="#B300FF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" begin="1.5s" />
      </circle>
      <circle r="3" fill="#4DFF94" opacity="0.8">
        <animateMotion dur="9s" repeatCount="indefinite" path="M180,130 Q250,80 310,150 Q260,220 180,130" />
        <animate attributeName="opacity" values="0;0.9;0" dur="9s" repeatCount="indefinite" />
      </circle>
      <g opacity="0.07" stroke="#EDEDED" strokeWidth="0.5">
        <line x1="60" y1="240" x2="420" y2="240" />
        <line x1="240" y1="60" x2="240" y2="420" />
        <circle cx="240" cy="240" r="80" />
        <circle cx="240" cy="240" r="140" />
      </g>
    </svg>
  )
}

function CircuitWireframe() {
  return (
    <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect x="20" y="20" width="260" height="200" rx="4" stroke="#EDEDED" strokeWidth="1" opacity="0.35" />
      <path d="M40 80 L120 80 L120 58 L200 58 L200 80 L260 80" stroke="#EDEDED" strokeWidth="1.5" opacity="0.7" />
      <path d="M40 145 L100 145 L100 162 L185 162 L185 145 L260 145" stroke="#EDEDED" strokeWidth="1.5" opacity="0.7" />
      <path d="M40 118 L260 118" stroke="#EDEDED" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.28" />
      <path d="M80 40 L80 200" stroke="#EDEDED" strokeWidth="0.8" opacity="0.35" />
      <path d="M160 40 L160 200" stroke="#EDEDED" strokeWidth="0.8" opacity="0.35" />
      <path d="M240 40 L240 200" stroke="#EDEDED" strokeWidth="0.8" opacity="0.35" />
      <rect x="106" y="48" width="28" height="20" rx="2" stroke="#B300FF" strokeWidth="1.5" fill="none" />
      <circle cx="160" cy="118" r="15" stroke="#4DFF94" strokeWidth="1.5" fill="none" />
      <rect x="222" y="109" width="18" height="18" rx="2" stroke="#EDEDED" strokeWidth="1.5" fill="none" />
      <rect x="62" y="134" width="18" height="18" rx="2" stroke="#EDEDED" strokeWidth="1.5" fill="none" />
      <circle cx="80" cy="80" r="4" stroke="#EDEDED" strokeWidth="1" fill="none" />
      <circle cx="80" cy="80" r="2" fill="#EDEDED" opacity="0.7" />
      <circle cx="240" cy="145" r="4" stroke="#EDEDED" strokeWidth="1" fill="none" />
      <circle cx="240" cy="145" r="2" fill="#EDEDED" opacity="0.7" />
      <circle cx="160" cy="58" r="4" stroke="#EDEDED" strokeWidth="1" fill="none" />
      <circle cx="160" cy="58" r="2" fill="#EDEDED" opacity="0.7" />
      <circle cx="160" cy="118" r="16" stroke="#4DFF94" strokeWidth="1" fill="none" opacity="0.2">
        <animate attributeName="r" values="13;20;13" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.08;0.35;0.08" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="58" r="3" fill="#B300FF" opacity="0.9">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function RocketWireframe() {
  return (
    <svg viewBox="0 0 300 270" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <path d="M150 28 L192 102 L192 184 L150 214 L108 184 L108 102 Z" stroke="#EDEDED" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M150 28 L150 102" stroke="#EDEDED" strokeWidth="0.8" opacity="0.45" />
      <path d="M128 72 Q150 50 172 72" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M118 92 Q150 65 182 92" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M108 122 L192 122" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M108 152 L192 152" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M130 102 L130 184" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M170 102 L170 184" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M108 162 L78 202 L108 186" stroke="#EDEDED" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M192 162 L222 202 L192 186" stroke="#EDEDED" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M132 208 L142 234 L158 234 L168 208" stroke="#EDEDED" strokeWidth="1.2" fill="none" opacity="0.8" />
      <circle cx="150" cy="134" r="12" stroke="#EDEDED" strokeWidth="1.2" fill="none" />
      <circle cx="150" cy="134" r="6" stroke="#4DFF94" strokeWidth="1" fill="none">
        <animate attributeName="opacity" values="0.35;0.9;0.35" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M142 234 Q150 262 158 234" stroke="#4DFF94" strokeWidth="1.5" fill="none" opacity="0.85">
        <animate attributeName="d" values="M142,234 Q150,262 158,234;M142,234 Q150,248 158,234;M142,234 Q150,262 158,234" dur="0.75s" repeatCount="indefinite" />
      </path>
      <path d="M145 234 Q150 248 155 234" stroke="#B300FF" strokeWidth="1" fill="none" opacity="0.6">
        <animate attributeName="d" values="M145,234 Q150,248 155,234;M145,234 Q150,238 155,234;M145,234 Q150,248 155,234" dur="0.55s" repeatCount="indefinite" />
      </path>
      {[{ cx: 50, cy: 55, d: '3s' }, { cx: 262, cy: 38, d: '2.5s', b: '1s' }, { cx: 68, cy: 185, d: '4s', b: '0.5s' }, { cx: 252, cy: 165, d: '3.5s', b: '2s' }].map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="1.5" fill="#EDEDED" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur={s.d} repeatCount="indefinite" begin={s.b || '0s'} />
        </circle>
      ))}
    </svg>
  )
}

function NetworkGrowthWireframe() {
  return (
    <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <g opacity="0.1" stroke="#EDEDED" strokeWidth="0.5">
        {[40, 90, 140, 190, 240].map((x) => <line key={x} x1={x} y1="40" x2={x} y2="225" />)}
        {[80, 120, 160, 200].map((y) => <line key={y} x1="20" y1={y} x2="280" y2={y} />)}
      </g>
      <path d="M40,205 L90,178 L140,152 L190,112 L240,70" fill="#4DFF94" fillOpacity="0.03" stroke="none" />
      <path d="M40,205 L240,205" stroke="none" />
      <polyline points="40,205 90,178 140,152 190,112 240,70" stroke="#EDEDED" strokeWidth="2" fill="none" opacity="0.7" />
      <line x1="40" y1="40" x2="40" y2="225" stroke="#EDEDED" strokeWidth="1.5" opacity="0.55" />
      <line x1="40" y1="225" x2="262" y2="225" stroke="#EDEDED" strokeWidth="1.5" opacity="0.55" />
      {[{ cx: 40, cy: 205 }, { cx: 90, cy: 178 }, { cx: 140, cy: 152 }].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="5" fill="#EDEDED" />
      ))}
      <circle cx="190" cy="112" r="6" fill="#4DFF94">
        <animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="70" r="7" fill="#4DFF94">
        <animate attributeName="r" values="5;11;5" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="70" r="22" fill="#4DFF94" opacity="0.04">
        <animate attributeName="r" values="15;35;15" dur="3s" repeatCount="indefinite" />
      </circle>
      <line x1="40" y1="205" x2="90" y2="178" stroke="#B300FF" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45" />
      <line x1="90" y1="178" x2="140" y2="152" stroke="#B300FF" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45" />
      <line x1="140" y1="152" x2="190" y2="112" stroke="#4DFF94" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
      <line x1="190" y1="112" x2="240" y2="70" stroke="#4DFF94" strokeWidth="1.2" opacity="0.55" />
    </svg>
  )
}

function TabWireframe({ tabId }: { tabId: string }) {
  if (tabId === 'cli') return (
    <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="20" y="20" width="320" height="240" rx="8" stroke="#EDEDED" strokeWidth="1.2" opacity="0.65" />
      <rect x="20" y="20" width="320" height="34" stroke="#EDEDED" strokeWidth="1.2" fill="none" opacity="0.4" />
      {[{ cx: 44 }, { cx: 60 }, { cx: 76 }].map((c, i) => (
        <circle key={i} cx={c.cx} cy="37" r="5" stroke="#EDEDED" strokeWidth="1" fill="none" opacity="0.4" />
      ))}
      <text x="36" y="76" fill="#4DFF94" fontSize="11" fontFamily="monospace" opacity="0.9">$ claude build --spec ./plan.md</text>
      <text x="36" y="100" fill="#EDEDED" fontSize="11" fontFamily="monospace" opacity="0.55">  → Analyzing specification...</text>
      <text x="36" y="120" fill="#EDEDED" fontSize="11" fontFamily="monospace" opacity="0.55">  → Scaffolding components...</text>
      <text x="36" y="140" fill="#4DFF94" fontSize="11" fontFamily="monospace" opacity="0.85">  ✓ Generated 12 files</text>
      <text x="36" y="160" fill="#4DFF94" fontSize="11" fontFamily="monospace" opacity="0.85">  ✓ Tests passing (47/47)</text>
      <text x="36" y="185" fill="#B300FF" fontSize="11" fontFamily="monospace" opacity="0.9">$ _</text>
      <rect x="47" y="175" width="7" height="13" fill="#B300FF" opacity="0.9">
        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
  if (tabId === 'web') return (
    <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="20" y="20" width="320" height="240" rx="6" stroke="#EDEDED" strokeWidth="1.2" opacity="0.65" />
      <rect x="20" y="20" width="320" height="36" stroke="#EDEDED" strokeWidth="1.2" fill="none" opacity="0.38" />
      <rect x="70" y="28" width="220" height="20" rx="3" stroke="#EDEDED" strokeWidth="0.8" fill="none" opacity="0.35" />
      {[{ cx: 38 }, { cx: 54 }].map((c, i) => (
        <circle key={i} cx={c.cx} cy="38" r="5" stroke="#EDEDED" strokeWidth="1" fill="none" opacity="0.35" />
      ))}
      <rect x="36" y="72" width="288" height="32" rx="3" stroke="#4DFF94" strokeWidth="1" fill="#4DFF94" fillOpacity="0.04" opacity="0.6" />
      <rect x="36" y="116" width="130" height="110" rx="3" stroke="#EDEDED" strokeWidth="0.8" fill="#B300FF" fillOpacity="0.03" opacity="0.4" />
      <line x1="36" y1="116" x2="166" y2="226" stroke="#EDEDED" strokeWidth="0.6" opacity="0.18" />
      <line x1="166" y1="116" x2="36" y2="226" stroke="#EDEDED" strokeWidth="0.6" opacity="0.18" />
      <rect x="178" y="116" width="146" height="50" rx="3" stroke="#EDEDED" strokeWidth="0.8" fill="none" opacity="0.38" />
      <rect x="178" y="176" width="146" height="50" rx="3" stroke="#EDEDED" strokeWidth="0.8" fill="none" opacity="0.38" />
    </svg>
  )
  if (tabId === 'ml') return (
    <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
      {([70, 110, 150, 190, 230] as number[]).map((y: number, i: number) => (
        <circle key={`in${i}`} cx="60" cy={y} r="12" stroke="#EDEDED" strokeWidth="1.2" fill="none" opacity="0.7" />
      ))}
      {([90, 130, 170, 210] as number[]).map((y: number, i: number) => (
        <g key={`h1${i}`}>
          <circle cx="150" cy={y} r="12" stroke="#B300FF" strokeWidth="1.2" fill="none" opacity="0.7" />
          <circle cx="150" cy={y} r="5" fill="#B300FF" opacity="0.28" />
        </g>
      ))}
      {([100, 150, 200] as number[]).map((y: number, i: number) => (
        <g key={`h2${i}`}>
          <circle cx="240" cy={y} r="12" stroke="#4DFF94" strokeWidth="1.2" fill="none" opacity="0.7" />
          <circle cx="240" cy={y} r="5" fill="#4DFF94" opacity="0.28" />
        </g>
      ))}
      {([130, 170] as number[]).map((y: number, i: number) => (
        <circle key={`out${i}`} cx="320" cy={y} r="12" stroke="#EDEDED" strokeWidth="1.5" fill="none" opacity="0.9" />
      ))}
      {([70, 110, 150, 190, 230] as number[]).flatMap((iy: number) =>
        ([90, 130, 170, 210] as number[]).map((hy: number) => (
          <line key={`${iy}-${hy}`} x1="72" y1={iy} x2="138" y2={hy} stroke="#EDEDED" strokeWidth="0.3" opacity="0.18" />
        ))
      )}
      {([90, 130, 170, 210] as number[]).flatMap((hy: number) =>
        ([100, 150, 200] as number[]).map((h2y: number) => (
          <line key={`hh-${hy}-${h2y}`} x1="162" y1={hy} x2="228" y2={h2y} stroke="#B300FF" strokeWidth="0.3" opacity="0.18" />
        ))
      )}
      {([100, 150, 200] as number[]).flatMap((hy: number) =>
        ([130, 170] as number[]).map((oy: number) => (
          <line key={`ho-${hy}-${oy}`} x1="252" y1={hy} x2="308" y2={oy} stroke="#4DFF94" strokeWidth="0.5" opacity="0.3" />
        ))
      )}
      <circle r="4" fill="#4DFF94" opacity="0.9">
        <animateMotion dur="3s" repeatCount="indefinite" path="M60,150 L150,150 L240,150 L320,150" />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
  return (
    <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
      <line x1="80" y1="240" x2="80" y2="60" stroke="#EDEDED" strokeWidth="2" opacity="0.7" />
      {([240, 180, 120, 60] as number[]).map((y: number) => (
        <g key={y}>
          <circle cx="80" cy={y} r="8" stroke="#EDEDED" strokeWidth="1.5" fill="none" />
          <circle cx="80" cy={y} r="4" fill="#EDEDED" />
        </g>
      ))}
      <path d="M80,180 Q120,180 140,150 L200,150" stroke="#4DFF94" strokeWidth="1.5" fill="none" opacity="0.8" />
      <line x1="200" y1="150" x2="200" y2="90" stroke="#4DFF94" strokeWidth="1.5" opacity="0.8" />
      <path d="M200,90 Q200,60 240,60 L280,60" stroke="#4DFF94" strokeWidth="1.5" fill="none" opacity="0.8" />
      {([150, 120, 90] as number[]).map((y: number) => (
        <g key={y}>
          <circle cx="200" cy={y} r="7" stroke="#4DFF94" strokeWidth="1.5" fill="none" />
          <circle cx="200" cy={y} r="4" fill="#4DFF94" opacity="0.8" />
        </g>
      ))}
      <path d="M280,60 Q310,60 310,90 L310,100 Q310,120 280,120" stroke="#B300FF" strokeWidth="1.2" fill="none" opacity="0.7" strokeDasharray="4 3" />
      <circle cx="280" cy="120" r="6" stroke="#B300FF" strokeWidth="1.2" fill="none" />
      <circle cx="280" cy="120" r="3" fill="#B300FF" opacity="0.8">
        <animate attributeName="opacity" values="0.35;1;0.35" dur="2s" repeatCount="indefinite" />
      </circle>
      <rect x="100" y="52" width="60" height="16" rx="2" stroke="#EDEDED" strokeWidth="0.8" fill="none" opacity="0.35" />
      <rect x="220" y="52" width="60" height="16" rx="2" stroke="#4DFF94" strokeWidth="0.8" fill="none" opacity="0.45" />
    </svg>
  )
}

function toHeroTitle(value?: string): string {
  if (!value) return ''
  const words = value.trim().toUpperCase().split(/\s+/)
  if (words.length <= 1) return words[0] || ''
  if (words.length === 2) return `${words[0]}\n${words[1]}`
  const midpoint = Math.ceil(words.length / 2)
  return `${words.slice(0, midpoint).join(' ')}\n${words.slice(midpoint).join(' ')}`
}

function portableTextToPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks?.length) return ''
  return blocks
    .flatMap((block) => block.children?.map((child) => child.text) ?? [])
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function ProgramShowcasePageClient({ program, variant = 'dev-team' }: ProgramShowcasePageProps) {
  const {
    sections,
    heroVisual,
    heroImageFallback,
    heroTitle,
    heroDescription,
    applyStatusFallback,
    approachTitle,
    approachCards: variantApproachCards,
    approachImages,
    pillarsHeading,
    pillarsTitle,
    pillars,
    testimonials: variantTestimonials,
    buildTitle,
    buildTabs: variantBuildTabs,
    buildImages,
    trackHeading,
    tracksTitle,
    programTracks: variantTracks,
    finalKicker,
    finalTitle,
    finalAccent,
    finalBody,
    finalClosedHint,
  } = VARIANT_CONTENT[variant]

  const [activeBuildTab, setActiveBuildTab] = useState(0)

  const rolesSection = program?.sections?.find(
    (s) => s._type === 'rolesSection'
  ) as RolesSection | undefined
  const ctaSection = program?.sections?.find(
    (s) => s._type === 'ctaSection'
  ) as CtaSection | undefined

  const resolvedHeroTitle = toHeroTitle(program?.name) || heroTitle
  const resolvedHeroDescription = program?.descriptionLarge || program?.tagline || heroDescription
  const resolvedHeroImage = program?.hero?.heroImageUrl || program?.desktopImageUrl || heroImageFallback
  const resolvedApproachTitle = program?.tagline || approachTitle
  const resolvedFinalBody = portableTextToPlainText(ctaSection?.body) || program?.descriptionSmall || finalBody

  const showHero = sections.includes('hero')
  const showApproach = sections.includes('approach')
  const showPillars = sections.includes('pillars') && Boolean(pillars?.length)
  const showAlumni = sections.includes('alumni')
  const showBuild = sections.includes('build')
  const showTracks = sections.includes('tracks')
  const showRoles = sections.includes('roles') && Boolean(rolesSection)
  const showFinal = sections.includes('final')

  const heroTitleLines = resolvedHeroTitle.split('\n')
  const buildTitleLines = buildTitle.split('\n')
  const tracksTitleLines = tracksTitle.split('\n')
  const activeBuildTabData = variantBuildTabs[activeBuildTab] ?? variantBuildTabs[0] ?? {
    id: 'cli',
    title: '',
    description: '',
  }
  const activeBuildImage = buildImages?.[activeBuildTab] ?? buildImages?.[0]

  useEffect(() => {
    setActiveBuildTab(0)
  }, [variant])

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] overflow-x-hidden">

      {showHero && (
        <ProgramHeroSection
          program={program}
          heroTitleLines={heroTitleLines}
          heroDescription={resolvedHeroDescription}
          applyStatusFallback={applyStatusFallback}
          heroVisual={heroVisual}
          heroImage={resolvedHeroImage}
          heroWireframe={<HeroWireframe />}
        />
      )}

      {showApproach && (
        <ProgramAboutSection
          title={resolvedApproachTitle}
          cards={variantApproachCards}
          images={approachImages}
          renderFallbackVisual={(index) => {
            if (index === 0) return <CircuitWireframe />
            if (index === 1) return <RocketWireframe />
            return <NetworkGrowthWireframe />
          }}
        />
      )}

      {showPillars && pillars && pillarsHeading && pillarsTitle && (
        <ProgramPillarsSection
          heading={pillarsHeading}
          title={pillarsTitle}
          pillars={pillars}
        />
      )}

      {showAlumni && <ProgramAlumniSection testimonials={variantTestimonials} />}

      {/* ── SECTION 4: WHAT YOU'LL BUILD — Vertical Tabs ─────────────────── */}
      {showBuild && (
      <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
        <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
          What You'll Build
        </p>
        <h2
          className="font-[family-name:var(--font-darker-grotesque)] font-medium leading-[0.92] text-[#EDEDED] mb-16"
          style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-1.2px' }}
        >
          {buildTitleLines.map((line, index) => (
            <React.Fragment key={line}>
              {line}
              {index < buildTitleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: tabs */}
          <div className="flex flex-col gap-1">
            {variantBuildTabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveBuildTab(i)}
                className={`text-left p-6 border transition-all duration-300 ${
                  activeBuildTab === i
                    ? 'border-dashed border-[#4DFF94] text-[#4DFF94]'
                    : 'border-transparent text-[#EDEDED]/50 hover:text-[#EDEDED]/75 hover:border-[#EDEDED]/15'
                }`}
                style={activeBuildTab === i ? { boxShadow: '0 0 24px rgba(77,255,148,0.07)' } : undefined}
              >
                <h3
                  className="font-[family-name:var(--font-darker-grotesque)] font-medium whitespace-pre-line leading-tight"
                  style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', letterSpacing: '-0.5px' }}
                >
                  {tab.title}
                </h3>
                {activeBuildTab === i && (
                  <p className="font-[family-name:var(--font-inter)] text-[15px] mt-3 text-[#EDEDED]/68 leading-relaxed">
                    {tab.description}
                  </p>
                )}
              </button>
            ))}
          </div>
          {/* Right: topical visual */}
          <div className="md:sticky md:top-[18svh] flex items-center justify-center">
            <div className="relative w-full max-w-[440px] aspect-square">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(77,255,148,0.05) 0%, transparent 70%)' }}
              />
              {activeBuildImage ? (
                <div className="relative w-full h-full border border-[#EDEDED]/15 overflow-hidden bg-black">
                  <Image
                    src={activeBuildImage.src}
                    alt={activeBuildImage.alt}
                    fill
                    className="object-cover opacity-86"
                    sizes="(max-width: 768px) 100vw, 440px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />
                  <div className="absolute left-4 right-4 bottom-4 border border-[#EDEDED]/20 bg-black/45 backdrop-blur-sm px-4 py-3">
                    <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.12em] uppercase text-[#EDEDED]/60 mb-1">
                      Current Focus
                    </p>
                    <p className="font-[family-name:var(--font-darker-grotesque)] text-[24px] leading-none text-[#EDEDED] whitespace-pre-line">
                      {activeBuildTabData.title}
                    </p>
                  </div>
                </div>
              ) : (
                <TabWireframe tabId={activeBuildTabData.id} />
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {showTracks && (
        <ProgramTracksSection
          heading={trackHeading}
          titleLines={tracksTitleLines}
          tracks={variantTracks}
        />
      )}

      {/* ── SECTION 6: OPEN ROLES (from Sanity) ──────────────────────────── */}
      {showRoles && rolesSection && (
        <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
          <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
            Open Roles
          </p>
          <h2
            className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-14"
            style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-1.2px' }}
          >
            {rolesSection.heading}
          </h2>

          {rolesSection.preRolesContent && rolesSection.preRolesContent.length > 0 && (
            <div className="mb-10 space-y-3 max-w-2xl">
              {rolesSection.preRolesContent.map((block) => {
                if (block.type === 'subheading')
                  return (
                    <h3 key={block._key} className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] text-2xl">
                      {block.text}
                    </h3>
                  )
                if (block.type === 'paragraph')
                  return (
                    <p key={block._key} className="font-[family-name:var(--font-inter)] text-[16px] text-[#EDEDED]/68 leading-relaxed">
                      {block.text}
                    </p>
                  )
                if (block.type === 'contact' && block.link)
                  return (
                    <p key={block._key} className="font-[family-name:var(--font-inter)] text-[16px] text-[#EDEDED]/68">
                      {block.text}{' '}
                      <a href={block.link} className="text-[#4DFF94] hover:underline font-semibold">
                        {block.link.replace('mailto:', '')}
                      </a>
                    </p>
                  )
                return null
              })}
            </div>
          )}

          <div className={`grid gap-6 ${rolesSection.roles.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
            {rolesSection.roles.map((role, i) => {
              const isPurple = i % 2 === 0
              const glowStyle = isPurple
                ? { boxShadow: 'inset 0px 0px 150px rgba(179, 0, 255, 0.4)' }
                : { boxShadow: 'inset 0px 0px 150px rgba(77, 255, 148, 0.4)' }
              const accentColor = isPurple ? '#B300FF' : '#4DFF94'
              return (
                <div key={role._key} className="p-8 border border-[#EDEDED] bg-black" style={glowStyle}>
                  <h3
                    className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-2"
                    style={{ fontSize: 'clamp(28px, 3vw, 42px)', letterSpacing: '-0.8px' }}
                  >
                    {role.title}
                  </h3>
                  <div className="w-12 h-0.5 mb-6" style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
                  <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-[#EDEDED]/68 mb-6">
                    {role.description}
                  </p>
                  <div className="space-y-2 mb-8">
                    {role.benefits.map((b, bi) => (
                      <div key={bi} className="flex items-start gap-3">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentColor }} />
                        <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#EDEDED]/62 leading-relaxed">{b}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className={`w-2 h-2 rounded-full ${role.isOpen ? 'bg-[#4DFF94]' : 'bg-red-500'}`}
                      style={role.isOpen ? { boxShadow: '0 0 6px #4DFF94' } : undefined}
                    />
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-medium tracking-[0.12em] uppercase opacity-65">
                      {role.isOpen ? 'Applications Open' : 'Applications Closed'}
                    </span>
                  </div>
                  {role.isOpen && role.applicationLink && (
                    <Link
                      href={role.applicationLink}
                      className="font-[family-name:var(--font-inter)] font-semibold text-[13px] inline-block px-6 py-3 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
                    >
                      {role.buttonText || 'Apply'}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          {(rolesSection.footer || rolesSection.footerContact) && (
            <div className="mt-12">
              {rolesSection.footer && (
                <p className="font-[family-name:var(--font-inter)] text-[16px] text-[#EDEDED]/55 mb-3">{rolesSection.footer}</p>
              )}
              {rolesSection.footerContact && (
                <a href={rolesSection.footerContact.href} className="font-[family-name:var(--font-inter)] text-[15px] font-semibold text-[#4DFF94] hover:underline">
                  {rolesSection.footerContact.label}
                </a>
              )}
            </div>
          )}
        </section>
      )}

      {/* ── SECTION 7: FINAL CTA ──────────────────────────────────────────── */}
      {showFinal && (
      <section className="px-[5vw] lg:px-[8vw] py-[14svh] border-t border-[#EDEDED]/8">
        <div className="max-w-[700px]">
          <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-6 flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[#B300FF]" aria-hidden="true" />
            {finalKicker}
          </p>
          <h2
            className="font-[family-name:var(--font-darker-grotesque)] font-extrabold text-[#EDEDED] mb-8 leading-none"
            style={{ fontSize: 'clamp(52px, 8vw, 100px)', letterSpacing: '-2px' }}
          >
            {finalTitle}<br />
            <span style={{ color: '#4DFF94' }}>{finalAccent}</span>
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-[#EDEDED] opacity-68 leading-relaxed mb-10 max-w-[480px]">
            {resolvedFinalBody}
          </p>
          {program?.apply?.status ? (
            <Link
              href={program.apply.link || '#'}
              className="font-[family-name:var(--font-inter)] font-semibold text-[14px] inline-block px-10 py-5 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
            >
              {program.apply.ctaLabel || 'Apply Now'} →
            </Link>
          ) : (
            <div className="flex items-center gap-6 flex-wrap">
              <span className="font-[family-name:var(--font-inter)] font-semibold text-[14px] inline-block px-10 py-5 border border-[#EDEDED]/18 text-[#EDEDED]/28 cursor-not-allowed tracking-widest uppercase">
                Applications Closed
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#EDEDED]/35">
                {finalClosedHint}
              </span>
            </div>
          )}
        </div>
      </section>
      )}

    </div>
  )
}
