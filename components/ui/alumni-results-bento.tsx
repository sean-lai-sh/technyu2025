'use client'

import { useEffect, useRef, useState, type Ref } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AlumniResultTile } from '@/lib/types'
import styles from './alumni-results-bento.module.css'

const MARQUEE_COPIES = 3
const MARQUEE_SPEED_PX = 24
const DRAG_CLICK_SLOP_PX = 6

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
  if (tile.tileType === 'quote' || tile.tileType === 'combo' || tile.tileType === 'stat') {
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
      draggable={false}
    />
  )
}

function FallbackMark({ tile }: { tile: AlumniResultTile }) {
  if (!tile.isFallbackExample) return null
  return <p className={styles.example}>Fallback example</p>
}

function TileBody({ tile }: { tile: AlumniResultTile }) {
  const wideQuote = tile.tileType === 'quote' && (tile.span ?? 1) >= 3 && (tile.tall ?? 1) <= 1
  const stackedStat = (tile.tall ?? 1) >= 2 || !tile.imageUrl

  if (tile.tileType === 'quote') {
    return (
      <div className={cn(styles.quote, wideQuote && styles.quoteWide)}>
        {tile.imageUrl ? (
          <div className={styles.quoteLogo}>
            <TileLogo tile={tile} />
          </div>
        ) : null}
        <div>
          <p className={styles.quoteText}>“{tile.quote}”</p>
          <div className={styles.quoteMeta}>
            {tile.attributionName ? <p className={styles.quoteName}>{tile.attributionName}</p> : null}
            {tile.attributionRole ? <p className={styles.quoteRole}>{tile.attributionRole}</p> : null}
            <FallbackMark tile={tile} />
          </div>
        </div>
      </div>
    )
  }

  if (tile.tileType === 'stat') {
    return (
      <div className={cn(styles.stat, stackedStat && styles.statStack)}>
        {tile.imageUrl ? (
          <div className={styles.quoteLogo}>
            <TileLogo tile={tile} />
          </div>
        ) : null}
        <div className={styles.statCopy}>
          <p className={styles.statValue}>{tile.statValue}</p>
          {tile.statLabel ? <p className={styles.statLabel}>{tile.statLabel}</p> : null}
          <FallbackMark tile={tile} />
        </div>
      </div>
    )
  }

  if (tile.tileType === 'combo') {
    return (
      <div className={styles.combo}>
        {tile.imageUrl ? (
          <div className={styles.quoteLogo}>
            <TileLogo tile={tile} />
          </div>
        ) : null}
        <div className={styles.statCopy}>
          {tile.statValue ? <p className={styles.statValue}>{tile.statValue}</p> : null}
          {tile.statLabel ? <p className={styles.statLabel}>{tile.statLabel}</p> : null}
        </div>
        {tile.quote ? <p className={styles.quoteText}>“{tile.quote}”</p> : null}
        <FallbackMark tile={tile} />
      </div>
    )
  }

  if (tile.tileType === 'person') {
    return (
      <div className={styles.person}>
        {tile.personName ? <p className={styles.personName}>{tile.personName}</p> : null}
        {tile.personRole ? <p className={styles.personRole}>{tile.personRole}</p> : null}
        <FallbackMark tile={tile} />
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
  const marker = tile.foundedByEboard ? tile.marker || '*' : tile.marker
  const offsetX = (tile.offsetX || 0) + (tile.markerOffsetX || 0)
  const offsetY = (tile.offsetY || 0) + (tile.markerOffsetY || 0)

  const body = (
    <>
      <TileBody tile={tile} />
      {href ? <ArrowUpRight className={styles.arrow} aria-hidden="true" strokeWidth={1.75} /> : null}
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
    className: cn(styles.card, isLink && styles.cardClickable),
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

function TileGrid({
  tiles,
  duplicate,
  gridRef,
}: {
  tiles: AlumniResultTile[]
  duplicate?: boolean
  gridRef?: Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={gridRef}
      className={cn(styles.grid, duplicate && styles.duplicate)}
      aria-hidden={duplicate || undefined}
    >
      {tiles.map((tile) => (
        <AlumniTile key={`${duplicate ? 'dup-' : ''}${tile._key}`} tile={tile} inert={duplicate} />
      ))}
    </div>
  )
}

function wrapOffset(value: number, cycle: number) {
  if (cycle <= 0) return 0
  const wrapped = value % cycle
  return wrapped < 0 ? wrapped + cycle : wrapped
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function AlumniResultsBento({ tiles, className }: AlumniResultsBentoProps) {
  const trayRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cycleRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const inViewRef = useRef(false)
  const draggingRef = useRef(false)
  const reduceMotionRef = useRef(false)
  const pointerIdRef = useRef<number | null>(null)
  const lastXRef = useRef(0)
  const dragDistanceRef = useRef(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const tray = trayRef.current
    const track = trackRef.current
    const cycleNode = cycleRef.current
    if (!tray || !track || !cycleNode || tiles.length === 0) return

    reduceMotionRef.current = prefersReducedMotion()
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => {
      reduceMotionRef.current = motionQuery.matches
      if (motionQuery.matches) {
        offsetRef.current = 0
        track.style.transform = 'none'
      }
    }
    motionQuery.addEventListener('change', onMotionChange)

    const measure = () => {
      const width = cycleNode.getBoundingClientRect().width
      return width
    }

    const apply = () => {
      if (reduceMotionRef.current) {
        track.style.transform = 'none'
        return
      }
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting)
      },
      { threshold: 0.15 },
    )
    observer.observe(tray)

    let frame = 0
    let lastTime = performance.now()

    const tick = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.064)
      lastTime = now
      const cycle = measure()

      if (!reduceMotionRef.current && inViewRef.current && !draggingRef.current && cycle > 0) {
        offsetRef.current = wrapOffset(offsetRef.current + MARQUEE_SPEED_PX * delta, cycle)
        apply()
      }

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    apply()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [tiles.length])

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    const cycleNode = cycleRef.current
    if (!viewport || !track || !cycleNode) return

    const cycleWidth = () => cycleNode.getBoundingClientRect().width

    const apply = () => {
      if (reduceMotionRef.current) {
        track.style.transform = 'none'
        return
      }
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    }

    const onPointerDown = (event: PointerEvent) => {
      if (reduceMotionRef.current) return
      if (event.pointerType === 'mouse' && event.button !== 0) return
      draggingRef.current = true
      pointerIdRef.current = event.pointerId
      lastXRef.current = event.clientX
      dragDistanceRef.current = 0
      setDragging(true)
      viewport.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current || pointerIdRef.current !== event.pointerId) return
      const deltaX = event.clientX - lastXRef.current
      lastXRef.current = event.clientX
      dragDistanceRef.current += Math.abs(deltaX)
      offsetRef.current = wrapOffset(offsetRef.current - deltaX, cycleWidth())
      apply()
    }

    const endDrag = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) return
      draggingRef.current = false
      pointerIdRef.current = null
      setDragging(false)
    }

    const onClickCapture = (event: MouseEvent) => {
      if (dragDistanceRef.current <= DRAG_CLICK_SLOP_PX) return
      event.preventDefault()
      event.stopPropagation()
      dragDistanceRef.current = 0
    }

    viewport.addEventListener('pointerdown', onPointerDown)
    viewport.addEventListener('pointermove', onPointerMove)
    viewport.addEventListener('pointerup', endDrag)
    viewport.addEventListener('pointercancel', endDrag)
    viewport.addEventListener('click', onClickCapture, true)

    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', endDrag)
      viewport.removeEventListener('pointercancel', endDrag)
      viewport.removeEventListener('click', onClickCapture, true)
    }
  }, [tiles.length])

  if (tiles.length === 0) return null

  return (
    <div ref={trayRef} className={cn(styles.tray, className)}>
      <div
        ref={viewportRef}
        className={cn(styles.viewport, dragging && styles.viewportDragging)}
      >
        <div ref={trackRef} className={styles.track}>
          {Array.from({ length: MARQUEE_COPIES }, (_, copyIndex) => (
            <TileGrid
              key={`copy-${copyIndex}`}
              tiles={tiles}
              duplicate={copyIndex > 0}
              gridRef={copyIndex === 0 ? cycleRef : undefined}
            />
          ))}
        </div>
      </div>
      <div className={cn(styles.shade, styles.shadeLeft)} aria-hidden="true" />
      <div className={cn(styles.shade, styles.shadeRight)} aria-hidden="true" />
    </div>
  )
}
