import { ApproachCard, BuildTab, ProgramImageAsset, ProgramTrack, Testimonial } from '../types'

export const mentorshipShowcaseContent = {
  heroDescription:
    'A high-touch mentorship track built with Databricks to sharpen your craft, tighten your judgment, and prepare your work for enterprise-scale expectations.',
  heroImageFallback: '/program-logos/mentorship-desktop.jpg',
  applyStatusFallback: 'Matching opens each semester',
  approachTitle: 'Our Bespoke program to hone your craft and get your enterprise ready in partnership with Databricks',
  buildEyebrow: "What You'll Build",
  buildTitle: "What You'll\nBuild",
  companyGridEyebrow: 'Spring Mentor Network',
  companyGridTitle: 'Mentors from\nwhere you want to go',
  companyGridFootnote: 'Representative Spring mentor companies, plus Databricks as our featured partner.',
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
    body: 'Every pairing is a dedicated 1:1 relationship with a professional who pressure-tests how you think, communicate, and execute. Mentors work with you on the details that make strong builders feel deliberate instead of reactive.',
    glow: 'rgba(255, 104, 54, 0.34)',
    accentColor: '#FF6836',
  },
  {
    id: 'enterprise',
    title: 'Enterprise\nReadiness',
    body: 'In partnership with Databricks, weekly workshops cover the product suite — Delta Lake, Unity Catalog, MLflow — so you graduate knowing the exact tooling production data teams run on at scale.',
    glow: 'rgba(255, 176, 148, 0.3)',
    accentColor: '#FFB194',
  },
  {
    id: 'operators',
    title: 'Operator\nAccess',
    body: 'Complete the program and you become eligible for direct introductions to companies actively hiring Databricks-skilled engineers — including Airbnb, Delta, and American Airlines.',
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
    id: 'data-eng',
    title: 'Data Engineering\nFoundations',
    description:
      'Get hands-on with Delta Lake, Apache Spark, and the lakehouse architecture that powers production pipelines at data-first companies. Learn how modern data platforms are actually built and maintained at scale.',
  },
  {
    id: 'governance',
    title: 'Data\nGovernance',
    description:
      'Work through Unity Catalog, data lineage tracking, and access control patterns that enterprise compliance requires. Understand why governance is the first thing senior data engineers are held accountable for.',
  },
  {
    id: 'ml-ai',
    title: 'ML & AI\nPipelines',
    description:
      'Use MLflow for experiment tracking and model registry, then deploy with Databricks AI. Build the end-to-end muscle from training runs to serving infrastructure — the full loop most courses skip.',
  },
  {
    id: 'career',
    title: 'Career\nPathway',
    description:
      'Map your Databricks skill set directly to the roles open at target companies like Airbnb, Delta, and American Airlines. Your mentor helps translate workshop output into a portfolio narrative that lands interviews.',
  },
]

export const mentorshipBuildImages: ProgramImageAsset[] = [
  { src: '/event-pics/mentorship4.jpg', alt: 'Mentorship planning session' },
  { src: '/event-pics/mentorship2.jpg', alt: 'Career guidance conversation' },
  { src: '/event-pics/mentorship3.jpg', alt: 'Interview prep discussion' },
  { src: '/event-pics/mentorship1.jpg', alt: 'Mentorship networking group' },
]

export const mentorshipMentorLogos = [
  {
    src: '/company-logos/databricks.svg',
    alt: 'Databricks',
    width: 713,
    height: 113,
    maxVisualWidth: 164,
  },
  {
    src: '/company-logos/google.svg',
    alt: 'Google',
    width: 272,
    height: 92,
  },
  {
    src: '/company-logos/meta.svg',
    alt: 'Meta',
    width: 512,
    height: 97,
  },
  {
    src: '/company-logos/amazon.svg',
    alt: 'Amazon',
    width: 512,
    height: 153,
  },
  {
    src: '/company-logos/waymo.svg',
    alt: 'Waymo',
    width: 2050,
    height: 335,
    maxVisualWidth: 168,
  },
  {
    src: '/company-logos/adobe.svg',
    alt: 'Adobe',
    width: 65,
    height: 35,
  },
]

export const mentorshipTracks: ProgramTrack[] = [
  {
    id: 'intake',
    label: 'Intake',
    title: 'Applications & Goal Setting',
    body: 'You submit your goals, timeline, target roles, and current data experience. The team assesses fit for the program and maps your background to mentor profiles and workshop cohort placement.',
  },
  {
    id: 'match',
    label: 'Match',
    title: 'Mentor Pairing + Cohort Placement',
    body: 'Mentors are matched by domain and communication style. You are also placed into a workshop cohort. Both tracks kick off with an orientation — your 1:1 rhythm and your weekly workshop schedule start here.',
  },
  {
    id: 'workshop',
    label: 'Workshops',
    title: 'Weekly Databricks Sessions',
    body: 'Each week your cohort covers a module from the Databricks product suite: Delta Lake, data governance, MLflow, and AI pipelines. Sessions are structured around real patterns used in production — not toy examples.',
  },
  {
    id: 'sprint',
    label: 'Sprints',
    title: 'Biweekly 1:1 Sessions',
    body: 'Every two weeks you meet your mentor with specific deliverables: updated portfolio artifacts, interview practice, or skill gap closures. The workshop content feeds directly into what you bring to these sessions.',
  },
  {
    id: 'handoff',
    label: 'Handoff',
    title: 'Final Plan + Company Introductions',
    body: 'Close the cohort with a documented 60–90 day action plan. Students who complete the program become eligible for introductions to partner companies — Airbnb, Delta, American Airlines — actively hiring Databricks-skilled interns.',
  },
]

// Logos sourced from /company-logos (google.svg, datadog.svg exist).
// Add databricks.svg and bloomberg.svg to /company-logos to complete the grid.
export const mentorshipCompanyLogos = [
  { src: '/company-logos/databricks.svg', alt: 'Databricks', width: 180, height: 60 },
  { src: '/company-logos/google.svg',     alt: 'Google',     width: 183, height: 60 },
  { src: '/company-logos/bloomberg.svg',  alt: 'Bloomberg',  width: 200, height: 60 },
  { src: '/company-logos/datadog.svg',    alt: 'Datadog',    width: 140, height: 60 },
]
