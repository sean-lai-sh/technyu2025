import type { AlumniResultTile, AlumniResultsSection } from '@/lib/types'

type FallbackLogo = {
  src: string
  alt: string
  width: number
  height: number
  href?: string
  foundedByEboard?: boolean
  markerOffsetX?: number
  markerOffsetY?: number
  offsetY?: number
  maxVisualWidth?: number
  col: number
  row: number
  span?: number
  tall?: number
}

/**
 * Existing homepage outcome wall — companies members landed at / founded.
 * Layout pins follow Clay's 12-slot × 3-row unit grid (desktop only).
 */
const FALLBACK_LOGOS: FallbackLogo[] = [
  { src: '/company-logos/apple.svg', alt: 'Apple', width: 562, height: 192, col: 1, row: 1 },
  { src: '/company-logos/google.svg', alt: 'Google', width: 183, height: 60, col: 2, row: 1 },
  { src: '/company-logos/meta.svg', alt: 'Meta', width: 948, height: 191, col: 6, row: 1 },
  { src: '/company-logos/amazon.svg', alt: 'Amazon', width: 603, height: 182, offsetY: 10, col: 7, row: 1 },
  {
    src: '/company-logos/microsoft.svg',
    alt: 'Microsoft',
    width: 338,
    height: 72,
    col: 10,
    row: 1,
  },
  {
    src: '/company-logos/stripe.svg',
    alt: 'Stripe',
    width: 144,
    height: 60,
    href: 'https://stripe.com',
    col: 11,
    row: 1,
  },
  {
    src: '/company-logos/Coinbase_Wordmark.svg',
    alt: 'Coinbase',
    width: 1102,
    height: 197,
    href: 'https://www.coinbase.com',
    col: 12,
    row: 1,
  },
  {
    src: '/company-logos/Anthropic.svg',
    alt: 'Anthropic',
    width: 579,
    height: 65,
    href: 'https://www.anthropic.com',
    col: 1,
    row: 2,
  },
  {
    src: '/company-logos/Cursor.svg',
    alt: 'Cursor',
    width: 2239,
    height: 533,
    href: 'https://cursor.com',
    col: 2,
    row: 2,
  },
  {
    src: '/company-logos/datadog.svg',
    alt: 'Datadog',
    width: 801,
    height: 196,
    href: 'https://www.datadoghq.com',
    col: 6,
    row: 2,
  },
  { src: '/company-logos/jane-street.svg', alt: 'Jane Street', width: 181, height: 49, col: 7, row: 2 },
  { src: '/company-logos/pinterest.svg', alt: 'Pinterest', width: 196, height: 36, col: 8, row: 2 },
  { src: '/company-logos/blackrock.svg', alt: 'BlackRock', width: 152, height: 22, col: 9, row: 2 },
  { src: '/company-logos/jpmc.svg', alt: 'JPMC', width: 140, height: 30, col: 10, row: 2 },
  {
    src: '/company-logos/clay.svg',
    alt: 'Clay',
    width: 200,
    height: 63,
    href: 'https://www.clay.com',
    col: 11,
    row: 2,
  },
  { src: '/company-logos/box.svg', alt: 'Box', width: 40, height: 22, offsetY: -4, col: 12, row: 2 },
  {
    src: '/company-logos/carta.svg',
    alt: 'Carta',
    width: 99,
    height: 43,
    maxVisualWidth: 132,
    href: 'https://carta.com',
    col: 1,
    row: 3,
  },
  {
    src: '/company-logos/check.svg',
    alt: 'Check',
    width: 142,
    height: 34,
    foundedByEboard: true,
    markerOffsetX: 48,
    markerOffsetY: -12,
    href: 'https://www.checkhq.com',
    col: 2,
    row: 3,
  },
  { src: '/company-logos/apollo-global.svg', alt: 'Apollo Global', width: 343, height: 54, col: 3, row: 3 },
  {
    src: '/company-logos/the-browser-company.svg',
    alt: 'The Browser Company',
    width: 1023,
    height: 515,
    foundedByEboard: true,
    markerOffsetX: 28,
    markerOffsetY: -16,
    href: 'https://thebrowser.company',
    col: 4,
    row: 3,
  },
  {
    src: '/company-logos/tandem-health.svg',
    alt: 'Tandem Health',
    width: 95,
    height: 20,
    maxVisualWidth: 168,
    col: 5,
    row: 3,
  },
  { src: '/company-logos/nozomio.svg', alt: 'Nozomio', width: 406, height: 89, col: 6, row: 3 },
  { src: '/company-logos/Manus_AI.svg', alt: 'Manus AI', width: 207, height: 60, col: 7, row: 3 },
  {
    src: '/company-logos/zingage.svg',
    alt: 'Zingage',
    width: 188,
    height: 24,
    offsetY: -3,
    col: 8,
    row: 3,
  },
]

const FALLBACK_HEADING = 'Developing The Talent Building The Future Since 2009'
const FALLBACK_BODY = 'Alumni building the future — where members land and found.'
const FALLBACK_FOOTNOTE = '* Founded by Tech@NYU E-Board alumni'

function logoToTile(logo: FallbackLogo, index: number): AlumniResultTile {
  return {
    _key: `fallback-logo-${index}-${logo.alt}`,
    tileType: 'logo',
    col: logo.col,
    row: logo.row,
    span: logo.span ?? 1,
    tall: logo.tall ?? 1,
    href: logo.href,
    foundedByEboard: logo.foundedByEboard,
    marker: logo.foundedByEboard ? '*' : undefined,
    markerOffsetX: logo.markerOffsetX,
    markerOffsetY: logo.markerOffsetY,
    alt: logo.alt,
    imageUrl: logo.src,
    width: logo.width,
    height: logo.height,
    maxVisualWidth: logo.maxVisualWidth,
    offsetY: logo.offsetY,
  }
}

/**
 * Quote / stat / role tiles are HARDCODED FALLBACK EXAMPLES.
 * They ship only while Sanity has no alumniResultsSection document.
 * Marked `isFallbackExample` so the UI can label them.
 */
const FALLBACK_FEATURE_TILES: AlumniResultTile[] = [
  {
    _key: 'fallback-quote-example',
    tileType: 'quote',
    col: 3,
    row: 1,
    span: 3,
    tall: 2,
    quote:
      'This room is where I learned to ship with people who take the work seriously.',
    attributionName: 'Fallback example',
    attributionRole: 'Replace this quote in Sanity',
    imageUrl: '/company-logos/Cursor.svg',
    alt: 'Cursor',
    width: 2239,
    height: 533,
    isFallbackExample: true,
  },
  {
    _key: 'fallback-stat-2009',
    tileType: 'stat',
    col: 8,
    row: 1,
    span: 2,
    tall: 1,
    statValue: '2009',
    statLabel: 'building since',
    isFallbackExample: true,
  },
  {
    _key: 'fallback-stat-destinations',
    tileType: 'stat',
    col: 9,
    row: 3,
    span: 2,
    tall: 1,
    statValue: '24+',
    statLabel: 'alumni destinations',
    isFallbackExample: true,
  },
  {
    _key: 'fallback-person-eboard',
    tileType: 'person',
    col: 11,
    row: 3,
    span: 2,
    tall: 1,
    personName: 'E-Board alumni',
    personRole: 'Founded Check* and The Browser Company*',
    isFallbackExample: true,
  },
]

function visualOrder(tile: AlumniResultTile) {
  return (tile.row ?? 99) * 20 + (tile.col ?? 99)
}

export const fallbackAlumniResults: AlumniResultsSection = {
  heading: FALLBACK_HEADING,
  body: FALLBACK_BODY,
  footnote: FALLBACK_FOOTNOTE,
  source: 'fallback',
  tiles: [...FALLBACK_LOGOS.map(logoToTile), ...FALLBACK_FEATURE_TILES].sort(
    (a, b) => visualOrder(a) - visualOrder(b),
  ),
}

type CmsAlumniResults = {
  heading?: string | null
  body?: string | null
  footnote?: string | null
  tiles?: Array<Partial<AlumniResultTile> & { _key?: string; tileType?: string }> | null
}

function isTileType(value: unknown): value is AlumniResultTile['tileType'] {
  return value === 'logo' || value === 'quote' || value === 'stat' || value === 'person'
}

function resolveNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function resolveString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function tileHasContent(tile: AlumniResultTile): boolean {
  if (tile.tileType === 'logo') return Boolean(tile.imageUrl)
  if (tile.tileType === 'quote') return Boolean(tile.quote)
  if (tile.tileType === 'stat') return Boolean(tile.statValue)
  if (tile.tileType === 'person') return Boolean(tile.personName)
  return false
}

export function normalizeAlumniResults(source: CmsAlumniResults | null | undefined): AlumniResultsSection {
  const tiles = (source?.tiles ?? [])
    .filter((tile): tile is Partial<AlumniResultTile> & { _key?: string; tileType: AlumniResultTile['tileType'] } =>
      isTileType(tile?.tileType),
    )
    .map((tile, index): AlumniResultTile => ({
      _key: resolveString(tile._key) ?? `cms-tile-${index}`,
      tileType: tile.tileType,
      col: resolveNumber(tile.col),
      row: resolveNumber(tile.row),
      span: resolveNumber(tile.span),
      tall: resolveNumber(tile.tall),
      href: resolveString(tile.href),
      foundedByEboard: Boolean(tile.foundedByEboard),
      marker: resolveString(tile.marker) ?? (tile.foundedByEboard ? '*' : undefined),
      alt: resolveString(tile.alt),
      imageUrl: resolveString(tile.imageUrl),
      width: resolveNumber(tile.width),
      height: resolveNumber(tile.height),
      quote: resolveString(tile.quote),
      attributionName: resolveString(tile.attributionName),
      attributionRole: resolveString(tile.attributionRole),
      statValue: resolveString(tile.statValue),
      statLabel: resolveString(tile.statLabel),
      personName: resolveString(tile.personName),
      personRole: resolveString(tile.personRole),
      personImageUrl: resolveString(tile.personImageUrl),
    }))
    .filter(tileHasContent)

  if (tiles.length === 0) {
    return fallbackAlumniResults
  }

  return {
    heading: resolveString(source?.heading) ?? FALLBACK_HEADING,
    body: resolveString(source?.body) ?? FALLBACK_BODY,
    footnote: resolveString(source?.footnote) ?? FALLBACK_FOOTNOTE,
    tiles,
    source: 'sanity',
  }
}
