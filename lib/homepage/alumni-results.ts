import type { AlumniResultTile, AlumniResultsSection } from '@/lib/types'

const FALLBACK_HEADING = 'Developing The Talent Building The Future Since 2009'
const FALLBACK_BODY = 'Alumni building the future — where members land and found.'
const FALLBACK_FOOTNOTE = '* Founded by Tech@NYU E-Board alumni'

type LogoInput = {
  src: string
  alt: string
  width: number
  height: number
  col: number
  row: number
  span?: number
  tall?: number
  href?: string
  foundedByEboard?: boolean
  markerOffsetX?: number
  markerOffsetY?: number
  offsetY?: number
  maxVisualWidth?: number
}

function logoTile(input: LogoInput, index: number): AlumniResultTile {
  return {
    _key: `fallback-logo-${index}-${input.alt}`,
    tileType: 'logo',
    col: input.col,
    row: input.row,
    span: input.span ?? 1,
    tall: input.tall ?? 1,
    href: input.href,
    foundedByEboard: input.foundedByEboard,
    marker: input.foundedByEboard ? '*' : undefined,
    markerOffsetX: input.markerOffsetX,
    markerOffsetY: input.markerOffsetY,
    alt: input.alt,
    imageUrl: input.src,
    width: input.width,
    height: input.height,
    maxVisualWidth: input.maxVisualWidth,
    offsetY: input.offsetY,
  }
}

/**
 * Clay-faithful 15-slot × 3-row pin map (~23 tiles).
 * Feature tiles (quote / stat / combo) are HARDCODED FALLBACK EXAMPLES
 * and are marked `isFallbackExample` until Sanity publishes a document.
 *
 *   slot  1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
 *   r1  Appl Goog |---- Stripe Q ----| 2009 Meta Data Jane Anth Pint Blck JPMC |-- Browser --|
 *   r2  |-- Cursor Q --| Coin Amaz Msft  ^  |-- Check C --| |---- 24+ ----| Box Nozo     ^
 *   r3        ^        |---- Clay S ----| Cart      ^      |-- Apollo --| Zing Tand Manu
 */
const FALLBACK_LOGOS: LogoInput[] = [
  { src: '/company-logos/apple.svg', alt: 'Apple', width: 562, height: 192, col: 1, row: 1 },
  { src: '/company-logos/google.svg', alt: 'Google', width: 183, height: 60, col: 2, row: 1 },
  { src: '/company-logos/meta.svg', alt: 'Meta', width: 948, height: 191, col: 7, row: 1 },
  {
    src: '/company-logos/datadog.svg',
    alt: 'Datadog',
    width: 801,
    height: 196,
    href: 'https://www.datadoghq.com',
    col: 8,
    row: 1,
  },
  { src: '/company-logos/jane-street.svg', alt: 'Jane Street', width: 181, height: 49, col: 9, row: 1 },
  {
    src: '/company-logos/anthropic.svg',
    alt: 'Anthropic',
    width: 579,
    height: 65,
    href: 'https://www.anthropic.com',
    col: 10,
    row: 1,
  },
  { src: '/company-logos/pinterest.svg', alt: 'Pinterest', width: 196, height: 36, col: 11, row: 1 },
  { src: '/company-logos/blackrock.svg', alt: 'BlackRock', width: 152, height: 22, col: 12, row: 1 },
  { src: '/company-logos/jpmc.svg', alt: 'JPMC', width: 140, height: 30, col: 13, row: 1 },
  {
    src: '/company-logos/Coinbase_Wordmark.svg',
    alt: 'Coinbase',
    width: 1102,
    height: 197,
    href: 'https://www.coinbase.com',
    col: 3,
    row: 2,
  },
  { src: '/company-logos/amazon.svg', alt: 'Amazon', width: 603, height: 182, offsetY: 10, col: 4, row: 2 },
  { src: '/company-logos/microsoft.svg', alt: 'Microsoft', width: 338, height: 72, col: 5, row: 2 },
  { src: '/company-logos/box.svg', alt: 'Box', width: 40, height: 22, offsetY: -4, col: 12, row: 2 },
  { src: '/company-logos/nozomio.svg', alt: 'Nozomio', width: 406, height: 89, col: 13, row: 2 },
  {
    src: '/company-logos/carta.svg',
    alt: 'Carta',
    width: 99,
    height: 43,
    maxVisualWidth: 132,
    href: 'https://carta.com',
    col: 6,
    row: 3,
  },
  { src: '/company-logos/apollo-global.svg', alt: 'Apollo Global', width: 343, height: 54, col: 9, row: 3, span: 2 },
  { src: '/company-logos/zingage.svg', alt: 'Zingage', width: 188, height: 24, offsetY: -3, col: 11, row: 3 },
  {
    src: '/company-logos/tandem-health.svg',
    alt: 'Tandem Health',
    width: 95,
    height: 20,
    maxVisualWidth: 168,
    col: 12,
    row: 3,
  },
  { src: '/company-logos/Manus_AI.svg', alt: 'Manus AI', width: 207, height: 60, col: 13, row: 3 },
]

const FALLBACK_FEATURE_TILES: AlumniResultTile[] = [
  {
    _key: 'fallback-quote-wide',
    tileType: 'quote',
    col: 3,
    row: 1,
    span: 3,
    tall: 1,
    href: 'https://stripe.com',
    quote: 'This room is where I learned to ship with people who take the work seriously.',
    attributionName: 'Fallback example',
    attributionRole: 'Replace this quote in Sanity',
    imageUrl: '/company-logos/stripe.svg',
    alt: 'Stripe',
    width: 144,
    height: 60,
    isFallbackExample: true,
  },
  {
    _key: 'fallback-stat-2009',
    tileType: 'stat',
    col: 6,
    row: 1,
    span: 1,
    tall: 2,
    statValue: '2009',
    statLabel: 'building since',
    isFallbackExample: true,
  },
  {
    _key: 'fallback-quote-browser',
    tileType: 'quote',
    col: 14,
    row: 1,
    span: 2,
    tall: 2,
    href: 'https://thebrowser.company',
    foundedByEboard: true,
    marker: '*',
    quote: 'E-Board alumni founded the company behind Arc.',
    attributionName: 'Fallback example',
    attributionRole: 'The Browser Company*',
    imageUrl: '/company-logos/the-browser-company.svg',
    alt: 'The Browser Company',
    width: 1023,
    height: 515,
    isFallbackExample: true,
  },
  {
    _key: 'fallback-quote-cursor',
    tileType: 'quote',
    col: 1,
    row: 2,
    span: 2,
    tall: 2,
    href: 'https://cursor.com',
    quote: 'The people I met here are the ones I still build with.',
    attributionName: 'Fallback example',
    attributionRole: 'Replace this quote in Sanity',
    imageUrl: '/company-logos/Cursor.svg',
    alt: 'Cursor',
    width: 2239,
    height: 533,
    isFallbackExample: true,
  },
  {
    _key: 'fallback-combo-check',
    tileType: 'combo',
    col: 7,
    row: 2,
    span: 2,
    tall: 2,
    href: 'https://www.checkhq.com',
    foundedByEboard: true,
    marker: '*',
    statValue: 'Founded',
    statLabel: 'by E-Board alumni',
    quote: 'Check* — a company started from this room.',
    imageUrl: '/company-logos/check.svg',
    alt: 'Check',
    width: 142,
    height: 34,
    isFallbackExample: true,
  },
  {
    _key: 'fallback-stat-destinations',
    tileType: 'stat',
    col: 9,
    row: 2,
    span: 3,
    tall: 1,
    statValue: '24+',
    statLabel: 'alumni destinations',
    isFallbackExample: true,
  },
  {
    _key: 'fallback-stat-clay',
    tileType: 'stat',
    col: 3,
    row: 3,
    span: 3,
    tall: 1,
    href: 'https://www.clay.com',
    statValue: 'Since ’09',
    statLabel: 'talent, then companies',
    imageUrl: '/company-logos/clay.svg',
    alt: 'Clay',
    width: 200,
    height: 63,
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
  tiles: [...FALLBACK_LOGOS.map(logoTile), ...FALLBACK_FEATURE_TILES].sort(
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
  return value === 'logo' || value === 'quote' || value === 'stat' || value === 'person' || value === 'combo'
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
  if (tile.tileType === 'combo') return Boolean(tile.statValue || tile.quote)
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
