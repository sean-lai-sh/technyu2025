'use client'

import React, { useEffect, useMemo, useState } from 'react'

type AsciiSignalLogoProps = {
  art: string
  className?: string
  tone?: 'green' | 'purple' | 'neutral'
  scale?: number
}

const NOISE_CHARS = ['#', '@', '%', '&', '*', '+', '=', '?', '~', ':', ';', '/']

const TONE_STYLES = {
  green: {
    text: '#98f7b4',
    glow: 'rgba(77,255,148,0.24)',
    border: 'rgba(77,255,148,0.24)',
  },
  purple: {
    text: '#e5c8ff',
    glow: 'rgba(179,0,255,0.22)',
    border: 'rgba(179,0,255,0.22)',
  },
  neutral: {
    text: '#ededed',
    glow: 'rgba(237,237,237,0.16)',
    border: 'rgba(237,237,237,0.14)',
  },
} as const

function normalizeAscii(source: string) {
  const rawLines = source.split('\n')
  const nonEmptyLines = rawLines.filter((line) => /\S/.test(line))

  if (nonEmptyLines.length === 0) return source.trim()

  let minStart = Number.POSITIVE_INFINITY
  let maxEnd = 0

  nonEmptyLines.forEach((line) => {
    const start = line.search(/\S/)
    const end = line.length - 1 - [...line].reverse().findIndex((char) => /\S/.test(char))
    minStart = Math.min(minStart, start)
    maxEnd = Math.max(maxEnd, end)
  })

  return nonEmptyLines
    .map((line) => line.slice(minStart, maxEnd + 1))
    .join('\n')
}

function lcg(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
}

function createCorruptedAscii(source: string, frame: number) {
  const random = lcg(frame * 7919 + 17)
  const heavyCorruption = frame % 11 === 0
  const mediumCorruption = frame % 5 === 0
  const corruptionRate = heavyCorruption ? 0.06 : mediumCorruption ? 0.028 : 0.012
  const blankNoiseRate = heavyCorruption ? 0.009 : 0.0025

  return source
    .split('\n')
    .map((line, lineIndex) =>
      line
        .split('')
        .map((char, charIndex) => {
          const shouldPulse =
            (lineIndex + frame) % 9 === 0 &&
            char !== ' ' &&
            charIndex % 7 === frame % 7 &&
            random() < 0.24

          if (char === ' ') {
            return random() < blankNoiseRate ? '.' : ' '
          }

          if (shouldPulse || random() < corruptionRate) {
            return NOISE_CHARS[Math.floor(random() * NOISE_CHARS.length)] ?? '#'
          }

          return char
        })
        .join('')
    )
    .join('\n')
}

export default function AsciiSignalLogo({
  art,
  className = '',
  tone = 'green',
  scale = 1,
}: AsciiSignalLogoProps) {
  const [frame, setFrame] = useState(0)
  const toneStyle = TONE_STYLES[tone]
  const normalizedArt = useMemo(() => normalizeAscii(art), [art])
  const artMetrics = useMemo(() => {
    const lines = normalizedArt.split('\n')
    const lineCount = lines.length
    const maxChars = lines.reduce((widest, line) => Math.max(widest, line.length), 0)
    const fitScale = Math.min(1.5, Math.max(0.9, Math.min(150 / Math.max(maxChars, 1), 41 / Math.max(lineCount, 1))))

    return { fitScale }
  }, [normalizedArt])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrame((current) => current + 1)
    }, 150)

    return () => window.clearInterval(interval)
  }, [])

  const displayArt = useMemo(() => createCorruptedAscii(normalizedArt, frame), [normalizedArt, frame])
  const staticOpacity = frame % 11 === 0 ? 0.18 : frame % 5 === 0 ? 0.1 : 0.045
  const jitterX = frame % 7 === 0 ? 1 : frame % 13 === 0 ? -1 : 0

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-[4px] border bg-black/70 ${className}`}
      style={{
        borderColor: toneStyle.border,
        boxShadow: `inset 0 0 32px ${toneStyle.glow}, 0 0 22px rgba(0,0,0,0.18)`,
      }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: staticOpacity,
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0 1px, transparent 1px), radial-gradient(circle at 78% 32%, rgba(255,255,255,0.16) 0 1px, transparent 1px), radial-gradient(circle at 42% 76%, rgba(255,255,255,0.12) 0 1px, transparent 1px)',
          backgroundSize: '18px 18px, 22px 22px, 26px 26px',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 4px)',
        }}
      />
      <div
        className="absolute inset-[1.75%] flex items-center justify-center overflow-hidden"
        style={{
          transform: `translate3d(${jitterX}px, 0, 0)`,
        }}
      >
        <pre
          className="select-none whitespace-pre font-mono font-semibold leading-[0.8] tracking-[-0.03em]"
          style={{
            color: toneStyle.text,
            fontSize: `clamp(${(3.6 * artMetrics.fitScale * scale).toFixed(2)}px, ${(0.56 * artMetrics.fitScale * scale).toFixed(3)}vw, ${(6.2 * artMetrics.fitScale * scale).toFixed(2)}px)`,
            textShadow: `0 0 12px ${toneStyle.glow}`,
          }}
        >
          {displayArt}
        </pre>
      </div>
    </div>
  )
}
