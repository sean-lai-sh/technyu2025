'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

const TARGET_ASPECT_RATIO = 16 / 9
const ASCII_CHAR_WIDTH_RATIO = 0.61
const ASCII_LINE_HEIGHT_RATIO = 1.15
const COLS = 132
const ROWS = 40
const TICK_MS = 120
const BIRTH_DENSITY = 0.30
const REPOPULATE_THRESHOLD = 0.04 // re-seed if fewer than 4% cells alive

type Grid = number[][]

// Cell character by age — cells darken as they mature (born, growing, stable, ancient)
function cellChar(age: number): string {
  if (age === 0) return '·'   // dead — subtle dot grid
  if (age === 1) return '░'   // newborn
  if (age <= 3)  return '▒'   // young
  if (age <= 5)  return '▓'   // mature
  return '█'                  // ancient
}

function makeGrid(density = BIRTH_DENSITY): Grid {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => (Math.random() < density ? 1 : 0))
  )
}

function step(grid: Grid): Grid {
  const next: Grid = Array.from({ length: ROWS }, () => new Array(COLS).fill(0))
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let n = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          n += grid[(r + dr + ROWS) % ROWS][(c + dc + COLS) % COLS] > 0 ? 1 : 0
        }
      }
      const cell = grid[r][c]
      if (cell > 0) {
        next[r][c] = (n === 2 || n === 3) ? Math.min(cell + 1, 8) : 0
      } else {
        next[r][c] = n === 3 ? 1 : 0
      }
    }
  }
  return next
}

function countAlive(grid: Grid): number {
  let count = 0
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] > 0) count++
    }
  }
  return count
}

function gridToAscii(grid: Grid): string {
  const lines: string[] = []
  for (let r = 0; r < ROWS; r++) {
    let line = ''
    for (let c = 0; c < COLS; c++) {
      line += cellChar(grid[r][c])
    }
    lines.push(line)
  }
  return lines.join('\n')
}

export default function GameOfLifeAscii() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [grid, setGrid] = useState<Grid>(() => makeGrid())
  const [tick, setTick] = useState(0)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const id = setInterval(() => {
      setGrid(prev => {
        const next = step(prev)
        // Re-seed from extinction — sprinkle fresh life into a random patch
        if (countAlive(next) < ROWS * COLS * REPOPULATE_THRESHOLD) {
          const recovered = next.map(row => row.slice())
          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              if (Math.random() < 0.22) recovered[r][c] = 1
            }
          }
          return recovered
        }
        return next
      })
      setTick(t => t + 1)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return undefined

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setContainerSize({ width, height })
    })

    resizeObserver.observe(node)

    return () => resizeObserver.disconnect()
  }, [])

  const art = useMemo(() => gridToAscii(grid), [grid])

  const staticOpacity = tick % 11 === 0 ? 0.14 : tick % 5 === 0 ? 0.07 : 0.028
  const stageMetrics = useMemo(() => {
    const { width, height } = containerSize

    if (width === 0 || height === 0) {
      return {
        width: 0,
        height: 0,
        fontSize: 6,
      }
    }

    const containerAspect = width / height
    const stageWidth = containerAspect > TARGET_ASPECT_RATIO ? width : height * TARGET_ASPECT_RATIO
    const stageHeight = containerAspect > TARGET_ASPECT_RATIO ? width / TARGET_ASPECT_RATIO : height
    const fontSize = Math.min(
      stageWidth / (COLS * ASCII_CHAR_WIDTH_RATIO),
      stageHeight / (ROWS * ASCII_LINE_HEIGHT_RATIO),
    )

    return {
      width: stageWidth,
      height: stageHeight,
      fontSize: Math.max(fontSize * 0.98, 4),
    }
  }, [containerSize])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* Sparse static noise */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: staticOpacity,
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0 1px, transparent 1px),' +
            'radial-gradient(circle at 78% 32%, rgba(255,255,255,0.16) 0 1px, transparent 1px),' +
            'radial-gradient(circle at 42% 76%, rgba(255,255,255,0.12) 0 1px, transparent 1px)',
          backgroundSize: '18px 18px, 22px 22px, 26px 26px',
          mixBlendMode: 'screen',
        }}
      />
      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 4px)',
        }}
      />
      {/* Art */}
      <div
        className="absolute left-1/2 top-1/2 flex items-center justify-center overflow-hidden"
        style={{
          width: `${stageMetrics.width}px`,
          height: `${stageMetrics.height}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <pre
          className="select-none whitespace-pre font-mono font-semibold tracking-[0.01em]"
          style={{
            color: '#98f7b4',
            fontSize: `${stageMetrics.fontSize}px`,
            lineHeight: ASCII_LINE_HEIGHT_RATIO,
            textShadow: '0 0 10px rgba(77,255,148,0.22), 0 0 2px rgba(77,255,148,0.12)',
          }}
        >
          {art}
        </pre>
      </div>
    </div>
  )
}
