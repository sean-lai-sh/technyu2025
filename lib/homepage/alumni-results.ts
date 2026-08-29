import type { AlumniResultTile, AlumniResultsSection } from '@/lib/types'

const FALLBACK_HEADING = 'Developing The Talent Building The Future Since 2009'

/**
 * Clay-style 3-row unit grid. Featured tiles use tall 2–3 / wide span.
 * Opening beat (left edge): Anthropic, SpaceX, Clay, Stripe, Jane Street, Check.
 * First two columns always include a tall well-known (Anthropic) and a tall
 * founded-by (Check) so phone/tablet/laptop first frames share that mix.
 *
 *   c1          c2          c3          c4          c5–c6         c7
 *   Anthropic   SpaceX ──────────────   Stripe      100% Mag 7    Browser
 *   Anthropic   Check       Clay        Stripe      100% Mag 7    Browser
 *   Jane St     Check       Clay        Coinbase    Carta Apollo  Browser
 *
 * Then Mag 7 names as tall-2, remaining companies as 1×1.
 */
const FALLBACK_TILES: AlumniResultTile[] = [
  {
    _key: 'fallback-anthropic',
    tileType: 'logo',
    col: 1,
    row: 1,
    span: 1,
    tall: 2,
    href: 'https://www.anthropic.com',
    alt: 'Anthropic',
    imageUrl: '/company-logos/anthropic.svg',
    width: 579,
    height: 65,
  },
  {
    _key: 'fallback-spacex',
    tileType: 'logo',
    col: 2,
    row: 1,
    span: 2,
    tall: 1,
    href: 'https://www.spacex.com',
    alt: 'SpaceX',
    imageUrl: '/company-logos/spacex.svg',
    width: 24,
    height: 12,
  },
  {
    _key: 'fallback-jane-street',
    tileType: 'logo',
    col: 1,
    row: 3,
    span: 1,
    tall: 1,
    alt: 'Jane Street',
    imageUrl: '/company-logos/jane-street.svg',
    width: 181,
    height: 49,
  },
  {
    _key: 'fallback-check',
    tileType: 'combo',
    col: 2,
    row: 2,
    span: 1,
    tall: 2,
    href: 'https://www.checkhq.com',
    foundedByEboard: true,
    statLabel: 'Founded by E-Board alumni Vivek Patel',
    alt: 'Check',
    imageUrl: '/company-logos/check.svg',
    width: 142,
    height: 34,
  },
  {
    _key: 'fallback-clay',
    tileType: 'logo',
    col: 3,
    row: 2,
    span: 1,
    tall: 2,
    href: 'https://www.clay.com',
    alt: 'Clay',
    imageUrl: '/company-logos/clay.svg',
    width: 200,
    height: 63,
  },
  {
    _key: 'fallback-stripe',
    tileType: 'logo',
    col: 4,
    row: 1,
    span: 1,
    tall: 2,
    href: 'https://stripe.com',
    alt: 'Stripe',
    imageUrl: '/company-logos/stripe.svg',
    width: 144,
    height: 60,
  },
  {
    _key: 'fallback-stat-mag7',
    tileType: 'stat',
    col: 5,
    row: 1,
    span: 2,
    tall: 2,
    statValue: '100%',
    statLabel: 'of the Mag 7',
  },
  {
    _key: 'fallback-browser-company',
    tileType: 'combo',
    col: 7,
    row: 1,
    span: 1,
    tall: 3,
    href: 'https://thebrowser.company',
    foundedByEboard: true,
    statLabel: 'Founded by E-Board alumni Hursh Agrawal',
    alt: 'The Browser Company',
    imageUrl: '/company-logos/the-browser-company.svg',
    width: 1023,
    height: 515,
  },
  {
    _key: 'fallback-apple',
    tileType: 'logo',
    col: 8,
    row: 1,
    span: 1,
    tall: 2,
    alt: 'Apple',
    imageUrl: '/company-logos/apple.svg',
    width: 562,
    height: 192,
  },
  {
    _key: 'fallback-google',
    tileType: 'logo',
    col: 9,
    row: 1,
    span: 1,
    tall: 2,
    alt: 'Google',
    imageUrl: '/company-logos/google.svg',
    width: 183,
    height: 60,
  },
  {
    _key: 'fallback-meta',
    tileType: 'logo',
    col: 10,
    row: 1,
    span: 1,
    tall: 2,
    alt: 'Meta',
    imageUrl: '/company-logos/meta.svg',
    width: 948,
    height: 191,
  },
  {
    _key: 'fallback-amazon',
    tileType: 'logo',
    col: 11,
    row: 1,
    span: 1,
    tall: 2,
    alt: 'Amazon',
    imageUrl: '/company-logos/amazon.svg',
    width: 603,
    height: 182,
  },
  {
    _key: 'fallback-microsoft',
    tileType: 'logo',
    col: 12,
    row: 1,
    span: 1,
    tall: 2,
    alt: 'Microsoft',
    imageUrl: '/company-logos/microsoft.svg',
    width: 338,
    height: 72,
  },
  {
    _key: 'fallback-coinbase',
    tileType: 'logo',
    col: 4,
    row: 3,
    span: 1,
    tall: 1,
    href: 'https://www.coinbase.com',
    alt: 'Coinbase',
    imageUrl: '/company-logos/Coinbase_Wordmark.svg',
    width: 1102,
    height: 197,
  },
  {
    _key: 'fallback-carta',
    tileType: 'logo',
    col: 5,
    row: 3,
    span: 1,
    tall: 1,
    href: 'https://carta.com',
    alt: 'Carta',
    imageUrl: '/company-logos/carta.svg',
    width: 99,
    height: 43,
  },
  {
    _key: 'fallback-apollo',
    tileType: 'logo',
    col: 6,
    row: 3,
    span: 1,
    tall: 1,
    alt: 'Apollo Global',
    imageUrl: '/company-logos/apollo-global.svg',
    width: 343,
    height: 54,
  },
  {
    _key: 'fallback-cursor',
    tileType: 'logo',
    col: 8,
    row: 3,
    span: 1,
    tall: 1,
    href: 'https://cursor.com',
    alt: 'Cursor',
    imageUrl: '/company-logos/Cursor.svg',
    width: 2239,
    height: 533,
  },
  {
    _key: 'fallback-datadog',
    tileType: 'logo',
    col: 9,
    row: 3,
    span: 1,
    tall: 1,
    href: 'https://www.datadoghq.com',
    alt: 'Datadog',
    imageUrl: '/company-logos/datadog.svg',
    width: 801,
    height: 196,
  },
  {
    _key: 'fallback-pinterest',
    tileType: 'logo',
    col: 10,
    row: 3,
    span: 1,
    tall: 1,
    alt: 'Pinterest',
    imageUrl: '/company-logos/pinterest.svg',
    width: 196,
    height: 36,
  },
  {
    _key: 'fallback-blackrock',
    tileType: 'logo',
    col: 11,
    row: 3,
    span: 1,
    tall: 1,
    alt: 'BlackRock',
    imageUrl: '/company-logos/blackrock.svg',
    width: 152,
    height: 22,
  },
  {
    _key: 'fallback-jpmc',
    tileType: 'logo',
    col: 12,
    row: 3,
    span: 1,
    tall: 1,
    alt: 'JPMC',
    imageUrl: '/company-logos/jpmc.svg',
    width: 140,
    height: 30,
  },
  {
    _key: 'fallback-box',
    tileType: 'logo',
    col: 13,
    row: 1,
    span: 1,
    tall: 1,
    alt: 'Box',
    imageUrl: '/company-logos/box.svg',
    width: 40,
    height: 22,
  },
  {
    _key: 'fallback-tandem',
    tileType: 'logo',
    col: 13,
    row: 2,
    span: 1,
    tall: 1,
    alt: 'Tandem Health',
    imageUrl: '/company-logos/tandem-health.svg',
    width: 95,
    height: 20,
  },
  {
    _key: 'fallback-nozomio',
    tileType: 'logo',
    col: 13,
    row: 3,
    span: 1,
    tall: 1,
    alt: 'Nozomio',
    imageUrl: '/company-logos/nozomio.svg',
    width: 406,
    height: 89,
  },
  {
    _key: 'fallback-manus',
    tileType: 'logo',
    col: 14,
    row: 1,
    span: 1,
    tall: 1,
    alt: 'Manus AI',
    imageUrl: '/company-logos/Manus_AI.svg',
    width: 207,
    height: 60,
  },
  {
    _key: 'fallback-zingage',
    tileType: 'logo',
    col: 14,
    row: 2,
    span: 1,
    tall: 1,
    alt: 'Zingage',
    imageUrl: '/company-logos/zingage.svg',
    width: 188,
    height: 24,
  },
]

function visualOrder(tile: AlumniResultTile) {
  return (tile.row ?? 99) * 20 + (tile.col ?? 99)
}

export const fallbackAlumniResults: AlumniResultsSection = {
  heading: FALLBACK_HEADING,
  source: 'fallback',
  tiles: [...FALLBACK_TILES].sort((a, b) => visualOrder(a) - visualOrder(b)),
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
