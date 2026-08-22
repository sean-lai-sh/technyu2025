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
    body: 'In partnership with Databricks, weekly workshops cover the product suite: Delta Lake, Unity Catalog, and MLflow. You graduate knowing the exact tooling production data teams run on at scale.',
    glow: 'rgba(255, 176, 148, 0.3)',
    accentColor: '#FFB194',
  },
  {
    id: 'operators',
    title: 'Operator\nAccess',
    body: 'Complete the program and you become eligible for direct introductions to companies actively hiring Databricks-skilled engineers, including Airbnb, Delta, and American Airlines.',
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
      'Use MLflow for experiment tracking and model registry, then deploy with Databricks AI. Build the end-to-end muscle from training runs to serving infrastructure, covering the full loop most courses skip.',
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
    id: 'apply',
    label: 'Apply',
    title: 'Tell Us About You',
    body: 'Share your goals, your background, and what kind of support you are looking for. We use this to understand where you are today and what the right match looks like, beyond just your resume.',
  },
  {
    id: 'pairing',
    label: 'Pairing',
    title: 'Meet Your Mentor',
    body: 'Once accepted, you are paired with a relevant industry professional for a dedicated 1:1 relationship. Every pairing is deliberate, matched by domain, role fit, and how you both work best.',
  },
  {
    id: 'learn',
    label: 'Learn',
    title: 'Build Your Skills',
    body: 'Engage in weekly Databricks workshops alongside your cohort and show up to personalized mentor calls focused on exactly what you need. Both tracks reinforce each other: what you learn in workshops, your mentor helps you apply.',
  },
  {
    id: 'refine',
    label: 'Refine',
    title: 'Grow With Your Cohort',
    body: 'In a tight cohort of 10–12 people, you improve through shared feedback, peer accountability, and real work reviewed by people who have already shipped it. Small enough that everyone knows each other.',
  },
  {
    id: 'celebrate',
    label: 'Celebrate',
    title: 'Show What You\'ve Built',
    body: 'Close the semester by presenting the skills you have acquired and the work you have done, to your cohort, your mentor, and beyond. You leave with a documented story and a mentor who can vouch for it.',
  },
]

export type FAQItem = { question: string; answer: string }

export const mentorshipFAQItems: FAQItem[] = [
  {
    question: 'Who is this program for?',
    answer: 'Undergraduate students with some technical background, open to hone their skills in a given technical niche while learning AI and data governance with Databricks.',
  },
  {
    question: 'Do I need prior data or Databricks experience?',
    answer: 'No. The workshops start from the ground up with the Databricks product suite. What matters is that you show up ready to learn and apply new skills each week.',
  },
  {
    question: 'How are mentors matched to me?',
    answer: 'After your application, the team reviews your goals, target roles, and background to identify a match by domain and communication style. We do not auto-assign since we aim for every pairing to be deliberate.',
  },
  {
    question: 'What does a typical week look like?',
    answer: 'One weekly Databricks workshop with your cohort, plus a scheduled 1:1 with your mentor. In between, you complete structured deliverables that tie both tracks together. Its up to you how you want to meet our wonderful mentors.',
  },
  {
    question: 'How long is the program?',
    answer: 'Roughly 10-12 weeks. Long enough to build real skills, short enough to stay focused.',
  },
  {
    question: 'Why are cohorts kept to 10–12 people?',
    answer: 'Smaller groups mean you actually know your cohort, get real feedback, and do not get lost in the shuffle. The intimacy is the point.',
  },
  {
    question: 'What companies can I be introduced to?',
    answer: 'Students who complete the program become eligible for introductions to companies actively hiring Databricks-skilled interns, including Airbnb, Delta, and American Airlines. Introductions are earned and go to students who have done the work.',
  },
  {
    question: 'Is there a GPA or major requirement?',
    answer: 'No GPA cutoff and no required major. We care about your goals, your commitment, and your curiosity about the data ecosystem.',
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
