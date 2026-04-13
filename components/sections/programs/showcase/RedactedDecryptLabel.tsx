'use client'

import { useEffect, useState } from 'react'

const FAILED_DECRYPT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>?#$%/=+*'.split('')

function seededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
}

function buildFailedDecryptText(label: string, frame: number) {
  const cycle = Math.min(frame, 17)

  if (cycle >= 14) return label

  const random = seededRandom((cycle + 1) * 92821 + label.length * 73)
  const sweepPosition = cycle * 0.78 - 2
  const baseVolatility = cycle < 5 ? 0.86 : cycle < 10 ? 0.58 : 0.28

  return label
    .split('')
    .map((char, index) => {
      if (char === ' ' || char === '[' || char === ']') return char

      const distanceFromSweep = Math.abs(index - sweepPosition)
      const sweepBoost = distanceFromSweep < 1.2 ? 0.72 : distanceFromSweep < 2.8 ? 0.24 : 0
      const shouldScramble = random() < Math.min(0.94, baseVolatility + sweepBoost)

      if (!shouldScramble) return char

      return FAILED_DECRYPT_CHARS[Math.floor(random() * FAILED_DECRYPT_CHARS.length)] ?? char
    })
    .join('')
}

function getFailedDecryptStatus(frame: number) {
  const cycle = Math.min(frame, 17)

  if (cycle < 5) return 'probing cipher...'
  if (cycle < 10) return 'breaking encryption...'
  if (cycle < 14) return 'key mismatch detected'
  return 'redaction maintained'
}

function getFailedDecryptTone(frame: number) {
  const cycle = Math.min(frame, 17)
  return cycle >= 14 ? 'failure' : 'active'
}

export default function RedactedDecryptLabel({ label, engaged }: { label: string; engaged: boolean }) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!engaged) {
      setFrame(0)
      return
    }

    const interval = window.setInterval(() => {
      setFrame((current) => {
        if (current >= 17) {
          window.clearInterval(interval)
          return current
        }

        return current + 1
      })
    }, 76)

    return () => window.clearInterval(interval)
  }, [engaged])

  const displayLabel = engaged ? buildFailedDecryptText(label, frame) : label
  const statusText = engaged ? getFailedDecryptStatus(frame) : 'identity intentionally withheld'
  const tone = engaged ? getFailedDecryptTone(frame) : 'idle'

  return (
    <>
      <span
        className={`block transition-colors duration-200 ${tone === 'failure' ? 'text-[#FF6B6B]' : ''}`}
        style={
          engaged
            ? tone === 'failure'
              ? { textShadow: '0 0 18px rgba(255,107,107,0.2), 0 0 8px rgba(179,0,255,0.12)' }
              : { textShadow: '0 0 18px rgba(179,0,255,0.16), 0 0 8px rgba(77,255,148,0.14)' }
            : undefined
        }
      >
        {displayLabel}
      </span>
      <span
        aria-hidden="true"
        className={`mt-2 block h-[0.95rem] overflow-hidden font-mono text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${
          tone === 'failure' ? 'text-[#FF6B6B]' : engaged ? 'text-[#92f7b5]' : 'text-[#EDEDED]/34'
        }`}
      >
        {statusText}
      </span>
    </>
  )
}
