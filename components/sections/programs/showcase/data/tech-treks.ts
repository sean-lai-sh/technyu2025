import { ApproachCard, BuildTab, ProgramImageAsset, ProgramPillar, ProgramTrack, Testimonial } from '../types'

export const techTreksShowcaseContent = {
  heroTitle: 'TECH\nTREKS',
  heroDescription:
    'Not sure where you fit in tech? Tech Treks is built for beginners — visit real companies, build with a team, and discover your role in the industry. No experience needed.',
  heroImageFallback: '/program-logos/tech-treks-desktop.jpg',
  applyStatusFallback: 'Cohorts launch each semester',
  approachTitle: 'Your break\ninto tech.',
  pillarsHeading: "What You'll Do",
  pillarsTitle: 'Three things that\nchange everything.',
  buildEyebrow: 'The Experience',
  buildTitle: 'Four ways\nwe get you ready.',
  trackHeading: 'Semester Structure',
  tracksTitle: 'From Curiosity\nTo Confidence',
  companyGridEyebrow: "Companies We've Toured",
  companyGridTitle: "Inside the rooms\nyou're aiming for.",
  companyGridFootnote: 'Companies visited or partnered with across Tech Treks cohorts.',
  finalKicker: 'No experience needed.',
  finalTitle: 'Your first step',
  finalAccent: 'into tech.',
  finalBody:
    "Tech Treks is designed for beginners. We'll train you, place you in a team, get you inside real companies, and help you figure out exactly where you belong.",
  finalClosedHint: 'Applications open each semester — get notified',
}

export const techTreksTestimonials: Testimonial[] = [
  {
    id: 'omar',
    company: 'Amazon',
    quote:
      '"Tech Treks made the industry feel tangible. Visiting teams in person and hearing their workflows gave me clarity on where I fit and what to build next."',
    name: 'Omar Rahman',
    title: 'SDE Intern @ Amazon',
    cohort: 'Spring 2024',
  },
  {
    id: 'lucy',
    company: 'Palantir',
    quote:
      '"I joined with zero confidence and left with a portfolio project, mentors I still talk to, and a much clearer roadmap into tech."',
    name: 'Lucy Zhao',
    title: 'Forward Deployed Intern @ Palantir',
    cohort: 'Fall 2023',
  },
  {
    id: 'isaac',
    company: 'TikTok',
    quote:
      '"The PM track pushed me to lead a team and ship. Tech Treks gave me both product thinking and execution reps in one semester."',
    name: 'Isaac Rivera',
    title: 'Product Intern @ TikTok',
    cohort: 'Spring 2024',
  },
]

export const techTreksApproachCards: ApproachCard[] = [
  {
    id: 'zero-to-one',
    title: 'Zero Experience\nRequired',
    body: "We've trained complete beginners from day one. If you're curious, you're qualified — we handle the rest.",
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
  },
  {
    id: 'team-builds',
    title: 'Build With\nA Real Team',
    body: 'Work in a small pod on one scoped project through the semester. Real collaboration, real deadlines — just like the job.',
    glow: 'rgba(77, 255, 148, 0.4)',
    accentColor: '#4DFF94',
  },
  {
    id: 'find-your-role',
    title: 'Discover\nYour Role',
    body: "Engineer, PM, or designer? You'll figure it out by actually doing it — not by guessing on a job application.",
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
    id: 'treks',
    title: 'Company Treks',
    description:
      "Get inside the offices you've only seen on LinkedIn. Hear directly from engineers and PMs about what their day actually looks like.",
    outcome: "You leave knowing what you're building toward — and who to reach out to.",
  },
  {
    id: 'projects',
    title: 'Team Projects',
    description:
      'Build one focused product with 2–3 teammates and a PM lead. Ship it. Present it. Own it.',
    outcome: 'A portfolio project and real team reps before your first internship.',
  },
  {
    id: 'workshops',
    title: 'Weekly Workshops',
    description:
      'Structured sessions that build your technical foundation and internship readiness in parallel — no prior coding required.',
    outcome: 'Practical skills and interview prep every week, not just at the end.',
  },
]

export const techTreksWhatYoullDoCards: ApproachCard[] = [
  {
    id: 'treks',
    title: 'Embark on \nCompany Treks',
    body:
      "Network and learn how the best in tech operate. Get exclusive access to recruiting staff and engineers from our established pipelines",
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
  },
  {
    id: 'projects',
    title: 'Projects Based \n Learning',
    body:
      'Build projects recruiters and companies need to see with other techies. Figure out your role and develop expertise building something you love.',
    glow: 'rgba(77, 255, 148, 0.4)',
    accentColor: '#4DFF94',
  },
  {
    id: 'workshops',
    title: 'Weekly \n Workshops',
    body:
      'We\'ll cover the full stack basics to build your technical foundation and internship readiness in parallel. No prior coding experience required.',
    glow: 'rgba(179, 0, 255, 0.4)',
    accentColor: '#B300FF',
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

export const techTreksCompanyLogos = [
  { src: '/company-logos/google.svg', alt: 'Google', width: 272, height: 92 },
  { src: '/company-logos/amazon.svg', alt: 'Amazon', width: 512, height: 153 },
  { src: '/company-logos/meta.svg', alt: 'Meta', width: 512, height: 97 },
  { src: '/company-logos/microsoft.svg', alt: 'Microsoft', width: 512, height: 109 },
  { src: '/company-logos/stripe.svg', alt: 'Stripe', width: 300, height: 124 },
  { src: '/company-logos/figma.svg', alt: 'Figma', width: 192, height: 64 },
  { src: '/company-logos/openai.svg', alt: 'OpenAI', width: 440, height: 117 },
  { src: '/company-logos/Anthropic.svg', alt: 'Anthropic', width: 300, height: 100 },
  { src: '/company-logos/jpmc.svg', alt: 'JPMorgan Chase', width: 300, height: 80 },
  { src: '/company-logos/snap.svg', alt: 'Snap', width: 300, height: 104 },
  { src: '/company-logos/notion.svg', alt: 'Notion', width: 300, height: 80 },
  { src: '/company-logos/Coinbase_Wordmark.svg', alt: 'Coinbase', width: 456, height: 96 },
]
