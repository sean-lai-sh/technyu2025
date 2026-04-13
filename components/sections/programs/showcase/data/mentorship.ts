import { ApproachCard, BuildTab, ProgramImageAsset, ProgramTrack, Testimonial } from '../types'

export const mentorshipShowcaseContent = {
  heroDescription:
    'A high-touch mentorship track built with Databricks to sharpen your craft, tighten your judgment, and prepare your work for enterprise-scale expectations.',
  heroImageFallback: '/program-logos/mentorship-desktop.jpg',
  applyStatusFallback: 'Matching opens each semester',
  approachTitle: 'Our Bespoke program to hone your craft and get your enterprise ready in partnership with Databricks',
  buildEyebrow: "What You'll Build",
  buildTitle: "What You'll\nBuild",
  trackHeading: 'Program Flow',
  tracksTitle: 'The Mentorship\nArc',
  finalKicker: 'Ready to Grow?',
  finalTitle: 'Move your career',
  finalAccent: 'forward.',
  finalBody: 'Small cohorts, high-accountability check-ins, and mentors who care about your long-term trajectory.',
  finalClosedHint: 'Applications reopen next cycle',
}

export const mentorshipTestimonials: Testimonial[] = [
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

export const mentorshipApproachCards: ApproachCard[] = [
  {
    id: 'craft',
    title: 'Craft\nSharpening',
    body: 'Every pairing is designed to pressure-test how you think, communicate, and execute. Mentors work with you on the details that make strong builders feel deliberate instead of reactive.',
    glow: 'rgba(255, 104, 54, 0.34)',
    accentColor: '#FF6836',
  },
  {
    id: 'enterprise',
    title: 'Enterprise\nReadiness',
    body: 'In partnership with Databricks, the program leans into the realities of production-facing work: stakeholder clarity, system quality, and the standards expected when products need to hold up beyond the classroom.',
    glow: 'rgba(255, 176, 148, 0.3)',
    accentColor: '#FFB194',
  },
  {
    id: 'operators',
    title: 'Operator\nAccess',
    body: 'You leave each cycle with concrete next moves, better judgment, and context from people who have recently shipped, recruited, and navigated the same decisions you are facing now.',
    glow: 'rgba(77, 255, 148, 0.34)',
    accentColor: '#4DFF94',
  },
]

export const mentorshipApproachImages: ProgramImageAsset[] = [
  { src: '/event-pics/mentorship1.jpg', alt: 'Mentorship cohort discussion' },
  { src: '/event-pics/mentorship2.jpg', alt: 'Mentor and mentee session' },
  { src: '/event-pics/mentorship3.jpg', alt: 'Mentorship workshop group' },
]

export const mentorshipBuildTabs: BuildTab[] = [
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

export const mentorshipBuildImages: ProgramImageAsset[] = [
  { src: '/event-pics/mentorship4.jpg', alt: 'Mentorship planning session' },
  { src: '/event-pics/mentorship2.jpg', alt: 'Career guidance conversation' },
  { src: '/event-pics/mentorship3.jpg', alt: 'Interview prep discussion' },
  { src: '/event-pics/mentorship1.jpg', alt: 'Mentorship networking group' },
]

export const mentorshipTracks: ProgramTrack[] = [
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
