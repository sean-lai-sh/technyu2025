export type SpotlightLinkMode = 'internal' | 'external' | 'luma' | 'markdown'

export type SpotlightItem = {
  eyebrow: string
  title: string
  summary: string
  image: string
  ctaLabel: string
  linkMode: SpotlightLinkMode
  url: string
  badge?: string
  date?: string
  slug?: string
  markdownPath?: string
}

export type SpotlightContent = {
  featuredItem: SpotlightItem
  items: [SpotlightItem, SpotlightItem, SpotlightItem]
}

export const spotlightContent: SpotlightContent = {
  featuredItem: {
    eyebrow: 'Roadmap',
    title: 'Startup Week Roadmap: Buildathon and Beyond',
    summary:
      'A working view into how Tech@NYU is shaping Startup Week as the umbrella for Buildathon and the wider community programming around it.',
    image: '/event-pics/buildathon.jpg',
    ctaLabel: 'View Roadmap',
    linkMode: 'internal',
    url: '/programs/startup-week',
    badge: 'Main story',
    date: 'Spring 2026',
  },
  items: [
    {
      eyebrow: 'Partnerships',
      title: 'Our Databricks Partnership',
      summary:
        'A closer look at one of the relationships helping shape programming, exposure, and technical opportunities.',
      image: '/event-pics/panel.jpg',
      ctaLabel: 'Read More',
      linkMode: 'internal',
      url: '/programs/tech-treks',
      badge: 'Left',
      date: 'Partner update',
    },
    {
      eyebrow: 'Programs',
      title: 'Revamping of Our Program Placements',
      summary:
        'An editorial take on how the club is rethinking where people fit and how they move through the system.',
      image: '/event-pics/mentorship2.jpg',
      ctaLabel: 'Read More',
      linkMode: 'internal',
      url: '/programs/mentorship',
      badge: 'Center',
      date: 'System update',
    },
    {
      eyebrow: 'Matching',
      title: 'How Do We Place People?',
      summary:
        'A story about the logic behind role fit, placement, and how members get routed into the right environment.',
      image: '/event-pics/devteam3.jpg',
      ctaLabel: 'Read More',
      linkMode: 'internal',
      url: '/programs/dev-team',
      badge: 'Right',
      date: 'Placement note',
    },
  ],
}

type PressSpotlightPost = {
  title?: string | null
  slug?: string | null
  eyebrow?: string | null
  category?: string | null
  publishedAt?: string | null
  date?: string | null
  excerpt?: string | null
  summary?: string | null
  coverImageUrl?: string | null
  imageUrl?: string | null
  image?: string | null
  coverImage?: { asset?: { url?: string | null } | null } | string | null
  sourceUrl?: string | null
  url?: string | null
  ctaLabel?: string | null
}

type PressSpotlightQueryResult = {
  featuredPost?: PressSpotlightPost | null
  secondaryPosts?: Array<PressSpotlightPost | null> | null
} | null

function getCmsQueryModule() {
  return import('@/lib/sanity/queries')
}

function resolveString(value: unknown) {
  if (typeof value === 'string') return value
  return undefined
}

function resolveImageUrl(post: PressSpotlightPost | null | undefined, fallback: string) {
  if (typeof post?.coverImage === 'string' && post.coverImage) {
    return post.coverImage
  }

  const nestedImageUrl =
    typeof post?.coverImage === 'object' && post?.coverImage?.asset?.url
      ? post.coverImage.asset.url
      : undefined

  const image =
    resolveString(post?.coverImageUrl) ??
    resolveString(post?.imageUrl) ??
    resolveString(post?.image) ??
    nestedImageUrl ??
    fallback

  return image
}

function resolveSpotlightUrl(post: PressSpotlightPost | null | undefined, fallback: string) {
  const slug = resolveString(post?.slug)
  if (slug) return `/blog/${slug}`

  return (
    resolveString(post?.sourceUrl) ??
    resolveString(post?.url) ??
    fallback
  )
}

function resolveSpotlightDate(post: PressSpotlightPost | null | undefined, fallback?: string) {
  const explicitDate = resolveString(post?.date)
  if (explicitDate) return explicitDate

  const publishedAt = resolveString(post?.publishedAt)
  if (!publishedAt) return fallback

  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) return fallback ?? publishedAt

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function buildSpotlightItem(
  post: PressSpotlightPost | null | undefined,
  fallback: SpotlightItem,
): SpotlightItem {
  if (!post) return fallback

  const title = resolveString(post.title) ?? fallback.title
  const url = resolveSpotlightUrl(post, fallback.url)
  const linkMode = url.startsWith('http') ? 'external' : 'internal'

  return {
    eyebrow: resolveString(post.eyebrow) ?? resolveString(post.category) ?? fallback.eyebrow,
    title,
    summary: resolveString(post.excerpt) ?? resolveString(post.summary) ?? fallback.summary,
    image: resolveImageUrl(post, fallback.image),
    ctaLabel: resolveString(post.ctaLabel) ?? fallback.ctaLabel,
    linkMode,
    url,
    badge: resolveString(post.category) ?? fallback.badge,
    date: resolveSpotlightDate(post, fallback.date),
    slug: resolveString(post.slug) ?? fallback.slug,
  }
}

function buildFallbackSecondary(index: number): SpotlightItem {
  return spotlightContent.items[index]
}

function normalizePressSpotlight(source: PressSpotlightQueryResult): SpotlightContent | null {
  if (!source?.featuredPost) return null

  const secondaryPosts = source.secondaryPosts ?? []
  if (secondaryPosts.length < 3) return null

  return {
    featuredItem: buildSpotlightItem(source.featuredPost, spotlightContent.featuredItem),
    items: [
      buildSpotlightItem(secondaryPosts[0], buildFallbackSecondary(0)),
      buildSpotlightItem(secondaryPosts[1], buildFallbackSecondary(1)),
      buildSpotlightItem(secondaryPosts[2], buildFallbackSecondary(2)),
    ],
  }
}

export async function getSharedSpotlightContent(): Promise<SpotlightContent> {
  try {
    const mod = await getCmsQueryModule()
    const getPressSpotlight = (mod as { getPressSpotlight?: () => Promise<PressSpotlightQueryResult> })
      .getPressSpotlight

    if (!getPressSpotlight) {
      return spotlightContent
    }

    const spotlight = await getPressSpotlight()
    return normalizePressSpotlight(spotlight) ?? spotlightContent
  } catch {
    return spotlightContent
  }
}
