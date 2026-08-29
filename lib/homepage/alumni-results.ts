import type { AlumniResultTile, AlumniResultsSection } from '@/lib/types'

const FALLBACK_HEADING = 'Developing The Talent Building The Future Since 2009'

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
    alt: input.alt,
    imageUrl: input.src,
    width: input.width,
    height: input.height,
  }
}

/**
 * Opening beat (leftmost 2 columns, row-major):
 * Anthropic, SpaceX, Clay, Stripe, Jane Street, Check.
 * Next cluster: Mag 7 + Browser Company (Founded by…), then the rest.
 *
 *   slot  1        2        3        4        5       6       7       8       9
 *   r1  Anthropic SpaceX   |-- 100% Mag 7 --| Apple  Google  Meta   Amazon  Microsoft
 *   r2  Clay      Stripe   Coinbase Cursor   Datadog Pinterest Blck  JPMC   Box
 *   r3  Jane St   Check    Browser  Carta    Apollo  Tandem  Nozomio Manus  Zingage
 */
const FALLBACK_LOGOS: LogoInput[] = [
  {
    src: '/company-logos/anthropic.svg',
    alt: 'Anthropic',
    width: 579,
    height: 65,
    href: 'https://www.anthropic.com',
    col: 1,
    row: 1,
  },
  {
    src: '/company-logos/spacex.svg',
    alt: 'SpaceX',
    width: 24,
    height: 12,
    href: 'https://www.spacex.com',
    col: 2,
    row: 1,
  },
  {
    src: '/company-logos/clay.svg',
    alt: 'Clay',
    width: 200,
    height: 63,
    href: 'https://www.clay.com',
    col: 1,
    row: 2,
  },
  {
    src: '/company-logos/stripe.svg',
    alt: 'Stripe',
    width: 144,
    height: 60,
    href: 'https://stripe.com',
    col: 2,
    row: 2,
  },
  {
    src: '/company-logos/jane-street.svg',
    alt: 'Jane Street',
    width: 181,
    height: 49,
    col: 1,
    row: 3,
  },
  { src: '/company-logos/apple.svg', alt: 'Apple', width: 562, height: 192, col: 5, row: 1 },
  { src: '/company-logos/google.svg', alt: 'Google', width: 183, height: 60, col: 6, row: 1 },
  { src: '/company-logos/meta.svg', alt: 'Meta', width: 948, height: 191, col: 7, row: 1 },
  { src: '/company-logos/amazon.svg', alt: 'Amazon', width: 603, height: 182, col: 8, row: 1 },
  { src: '/company-logos/microsoft.svg', alt: 'Microsoft', width: 338, height: 72, col: 9, row: 1 },
  {
    src: '/company-logos/Coinbase_Wordmark.svg',
    alt: 'Coinbase',
    width: 1102,
    height: 197,
    href: 'https://www.coinbase.com',
    col: 3,
    row: 2,
  },
  {
    src: '/company-logos/Cursor.svg',
    alt: 'Cursor',
    width: 2239,
    height: 533,
    href: 'https://cursor.com',
    col: 4,
    row: 2,
  },
  {
    src: '/company-logos/datadog.svg',
    alt: 'Datadog',
    width: 801,
    height: 196,
    href: 'https://www.datadoghq.com',
    col: 5,
    row: 2,
  },
  { src: '/company-logos/pinterest.svg', alt: 'Pinterest', width: 196, height: 36, col: 6, row: 2 },
  { src: '/company-logos/blackrock.svg', alt: 'BlackRock', width: 152, height: 22, col: 7, row: 2 },
  { src: '/company-logos/jpmc.svg', alt: 'JPMC', width: 140, height: 30, col: 8, row: 2 },
  { src: '/company-logos/box.svg', alt: 'Box', width: 40, height: 22, col: 9, row: 2 },
  {
    src: '/company-logos/carta.svg',
    alt: 'Carta',
    width: 99,
    height: 43,
    href: 'https://carta.com',
    col: 4,
    row: 3,
  },
  { src: '/company-logos/apollo-global.svg', alt: 'Apollo Global', width: 343, height: 54, col: 5, row: 3 },
  {
    src: '/company-logos/tandem-health.svg',
    alt: 'Tandem Health',
    width: 95,
    height: 20,
    col: 6,
    row: 3,
  },
  { src: '/company-logos/nozomio.svg', alt: 'Nozomio', width: 406, height: 89, col: 7, row: 3 },
  { src: '/company-logos/Manus_AI.svg', alt: 'Manus AI', width: 207, height: 60, col: 8, row: 3 },
  { src: '/company-logos/zingage.svg', alt: 'Zingage', width: 188, height: 24, col: 9, row: 3 },
]

const FALLBACK_FEATURE_TILES: AlumniResultTile[] = [
  {
    _key: 'fallback-check',
    tileType: 'combo',
    col: 2,
    row: 3,
    span: 1,
    tall: 1,
    href: 'https://www.checkhq.com',
    statLabel: 'Founded by E-Board alumni Vivek Patel',
    imageUrl: '/company-logos/check.svg',
    alt: 'Check',
    width: 142,
    height: 34,
  },
  {
    _key: 'fallback-browser-company',
    tileType: 'combo',
    col: 3,
    row: 3,
    span: 1,
    tall: 1,
    href: 'https://thebrowser.company',
    statLabel: 'Founded by E-Board alumni Hursh Agrawal',
    imageUrl: '/company-logos/the-browser-company.svg',
    alt: 'The Browser Company',
    width: 1023,
    height: 515,
  },
  {
    _key: 'fallback-stat-mag7',
    tileType: 'stat',
    col: 3,
    row: 1,
    span: 2,
    tall: 1,
    statValue: '100%',
    statLabel: 'of the Mag 7',
  },
]

function visualOrder(tile: AlumniResultTile) {
  return (tile.row ?? 99) * 20 + (tile.col ?? 99)
}

export const fallbackAlumniResults: AlumniResultsSection = {
  heading: FALLBACK_HEADING,
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
  if (tile.tileType === 'combo') return Boolean(tile.imageUrl || tile.statValue || tile.statLabel || tile.quote)
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
      marker: resolveString(tile.marker),
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
    body: resolveString(source?.body),
    footnote: resolveString(source?.footnote),
    tiles,
    source: 'sanity',
  }
}
