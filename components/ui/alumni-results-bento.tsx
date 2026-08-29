import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AlumniResultTile } from '@/lib/types'
import styles from './alumni-results-bento.module.css'

type AlumniResultsBentoProps = {
  tiles: AlumniResultTile[]
  className?: string
}

function getContainedDimensions(
  width: number,
  height: number,
  maxVisualWidth: number,
  maxVisualHeight: number,
) {
  const scale = Math.min(maxVisualWidth / width, maxVisualHeight / height)

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

function tileLogoLimits(tile: AlumniResultTile) {
  if (tile.tileType === 'quote') {
    return {
      maxVisualWidth: Math.min(tile.maxVisualWidth ?? 104, 104),
      maxVisualHeight: Math.min(tile.maxVisualHeight ?? 22, 22),
    }
  }

  return {
    maxVisualWidth: Math.min(tile.maxVisualWidth ?? 96, 96),
    maxVisualHeight: Math.min(tile.maxVisualHeight ?? 28, 28),
  }
}

function TileLogo({ tile }: { tile: AlumniResultTile }) {
  if (!tile.imageUrl) return null

  const baseWidth = tile.width || 120
  const baseHeight = tile.height || 60
  const { maxVisualWidth, maxVisualHeight } = tileLogoLimits(tile)
  const fitted = getContainedDimensions(baseWidth, baseHeight, maxVisualWidth, maxVisualHeight)
  const offsetX = tile.offsetX || 0
  const offsetY = tile.offsetY || 0

  return (
    <Image
      src={tile.imageUrl}
      alt={tile.alt || ''}
      width={fitted.width}
      height={fitted.height}
      className="block h-auto max-w-full object-contain"
      style={{
        maxWidth: `${maxVisualWidth}px`,
        maxHeight: `${maxVisualHeight}px`,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
      unoptimized
    />
  )
}

function TileBody({ tile }: { tile: AlumniResultTile }) {
  if (tile.tileType === 'quote') {
    return (
      <div className={styles.quote}>
        {tile.imageUrl ? (
          <div className={styles.quoteLogo}>
            <TileLogo tile={tile} />
          </div>
        ) : null}
        <p className={styles.quoteText}>“{tile.quote}”</p>
        <div className={styles.quoteMeta}>
          {tile.attributionName ? <p className={styles.quoteName}>{tile.attributionName}</p> : null}
          {tile.attributionRole ? <p className={styles.quoteRole}>{tile.attributionRole}</p> : null}
          {tile.isFallbackExample ? <p className={styles.example}>Fallback example</p> : null}
        </div>
      </div>
    )
  }

  if (tile.tileType === 'stat') {
    return (
      <div className={styles.stat}>
        <p className={styles.statValue}>{tile.statValue}</p>
        {tile.statLabel ? <p className={styles.statLabel}>{tile.statLabel}</p> : null}
        {tile.isFallbackExample ? <p className={styles.example}>Fallback example</p> : null}
      </div>
    )
  }

  if (tile.tileType === 'person') {
    return (
      <div className={styles.person}>
        {tile.personName ? <p className={styles.personName}>{tile.personName}</p> : null}
        {tile.personRole ? <p className={styles.personRole}>{tile.personRole}</p> : null}
        {tile.isFallbackExample ? <p className={styles.example}>Fallback example</p> : null}
      </div>
    )
  }

  return (
    <div className={styles.logoWrap}>
      <TileLogo tile={tile} />
    </div>
  )
}

function AlumniTile({ tile, inert }: { tile: AlumniResultTile; inert?: boolean }) {
  const href = tile.href
  const isLink = Boolean(href) && !inert
  const className = cn(styles.card, isLink && styles.cardClickable)
  const marker = tile.foundedByEboard ? tile.marker || '*' : tile.marker
  const offsetX = (tile.offsetX || 0) + (tile.markerOffsetX || 0)
  const offsetY = (tile.offsetY || 0) + (tile.markerOffsetY || 0)

  const body = (
    <>
      <TileBody tile={tile} />
      {isLink ? (
        <ArrowUpRight className={styles.arrow} aria-hidden="true" strokeWidth={1.75} />
      ) : null}
      {marker ? (
        <span
          aria-hidden="true"
          className={styles.marker}
          style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
        >
          {marker}
        </span>
      ) : null}
    </>
  )

  const dataProps = {
    className,
    'data-col': tile.col ? String(tile.col) : undefined,
    'data-row': tile.row ? String(tile.row) : undefined,
    'data-span': String(tile.span || 1),
    'data-tall': tile.tall && tile.tall > 1 ? String(tile.tall) : undefined,
    'data-type': tile.tileType,
  }

  if (isLink && href) {
    return (
      <a
        {...dataProps}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={tile.alt || tile.personName || tile.statValue || 'Alumni destination'}
      >
        {body}
      </a>
    )
  }

  return <div {...dataProps}>{body}</div>
}

function TileGrid({ tiles, duplicate }: { tiles: AlumniResultTile[]; duplicate?: boolean }) {
  return (
    <div className={cn(styles.grid, duplicate && styles.duplicate)} aria-hidden={duplicate || undefined}>
      {tiles.map((tile) => (
        <AlumniTile key={`${duplicate ? 'dup-' : ''}${tile._key}`} tile={tile} inert={duplicate} />
      ))}
    </div>
  )
}

export default function AlumniResultsBento({ tiles, className }: AlumniResultsBentoProps) {
  if (tiles.length === 0) return null

  return (
    <div className={cn(styles.tray, className)}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <TileGrid tiles={tiles} />
          <TileGrid tiles={tiles} duplicate />
        </div>
      </div>
      <div className={cn(styles.shade, styles.shadeLeft)} aria-hidden="true" />
      <div className={cn(styles.shade, styles.shadeRight)} aria-hidden="true" />
    </div>
  )
}
