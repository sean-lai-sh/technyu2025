'use client'

import React, { useEffect, useMemo, useState } from 'react'

type FooterSignalFieldProps = {
  className?: string
}

const NOISE_CHARS = ['+', '+', '+', '.', ':', '#', ' ']
const RAW_REFERENCE_ART = `
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                               .:-=====---:.                                        
                                          -*%@@@@@@@@@@@@@@@@@%#-.                                  
                                    ..=%@@@@@@@@@@@@@@@@@@@@@@@@@@@#-.                              
                                  :*@@@@@@#*=-:..   ...:-=*%@@@@@@@@@@#-                            
                               .+@@@@@%-..                  ..=%@@@@@@@@@-                          
                             .*@@@@%=.                          .*@@@@@@@@#.                        
                           .*@@@@%-                               .*@@@@@@@@:                       
                          -@@@@@*.              .-==:.     *%#     .-@@@@@@@@-                      
                        .+@@@@@=           .-#@@@@@@@@@%=-@@@%       :@@@@@@@#.                     
                       .#@@@@@=          :#@@@@@@@@@@@@@@@@@@%       .=@@@@@@@-                     
                      .#@@@@@*.        .*@@@@%-....:*@@@@@@@@%        .#@@@@@@#                     
                      =@@@@@@=        :%@@@@#        .*@@@@@@%         +@@@@@@%                     
                     .#@@@@@%:       :@@@@@@:         .%@@@@@%         -@@@@@@@                     
                     :@@@@@@%.      .%@@@@@%.          #@@@@@%         -@@@@@@#                     
                     -@@@@@@%.      -%@@@@@%.          #@@@@@%         =@@@@@@-                     
                     -@@@@@@%:      -@@@@@@@:          #@@@@@%        .#@@@@@*.                     
                     :@@@@@@@-      :%@@@@@@#          #@@@@@%       .+@@@@@*.                      
                     :%@@@@@@*.      +@@@@@@@*.        #@@@@@%      :#@@@@%-                        
                     .*@@@@@@@:      .*@@@@@@@%=.  .:+#@@@@@@%    -#@@@@@=.                         
                      =@@@@@@@#.      .+@@@@@@@@@@@@@@@@@@@@@@+%@@@@@@%:                            
                      .#@@@@@@@*.       :#@@@@@@@@@@@+.#@@@@@@@@@@%*-.                              
                       .%@@@@@@@*.        .:-*###*+-.  --------:..                                  
                        .#@@@@@@@%.                                                                 
                         .+@@@@@@@@*:                                                               
                           :#@@@@@@@@%-                                                             
                             .*@@@@@@@@@#-..                                                        
                               .:+%@@@@@@@@@%*+=-.                                                  
                                   ..:+#@@@@@@@@:                                                   
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
`

function lcg(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
}

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

function padField(source: string, cols: number, rows: number) {
  const lines = source.split('\n')
  const maxLen = lines.reduce((max, l) => Math.max(max, l.length), 0)
  const colPad = ' '.repeat(cols)
  const blankRow = ' '.repeat(cols * 2 + maxLen)
  const paddedLines = lines.map((line) => colPad + line.padEnd(maxLen) + colPad)
  const topRows = Array(rows).fill(blankRow)
  const bottomRows = Array(rows).fill(blankRow)
  return [...topRows, ...paddedLines, ...bottomRows].join('\n')
}

function buildReferenceField(source: string, cols = 12, rows = 6) {
  const mapped = normalizeAscii(source)
    .split('\n')
    .map((line) =>
      line
        .split('')
        .map((char) => {
          if (char === '@') return '+'
          if (char === '%' || char === '#') return '#'
          if (char === '*' || char === '=') return ':'
          if (char === '-' || char === ':') return '.'
          if (char === '.') return '.'
          return char
        })
        .join('')
    )
    .join('\n')
  return cols === 0 && rows === 0 ? mapped : padField(mapped, cols, rows)
}

function createCorruptedField(source: string, frame: number, reducedMotion: boolean) {
  const random = lcg(frame * 92821 + 71)
  const heavyDrop = !reducedMotion && frame % 15 === 0
  const softPulse = !reducedMotion && frame % 6 === 0

  return source
    .split('\n')
    .map((line, lineIndex) => {
      const width = Math.max(line.length, 1)

      return line
        .split('')
        .map((char, charIndex) => {
          const xRatio = charIndex / width
          const decayZone = Math.max(0, (xRatio - 0.56) / 0.2)
          const leftDecayZone = Math.max(0, (0.14 - xRatio) / 0.14)

          if (char === ' ') {
            if (decayZone > 0.3 && random() < 0.02 * decayZone) return '.'
            if (leftDecayZone > 0.3 && random() < 0.015 * leftDecayZone) return '.'
            return ' '
          }

          if (decayZone > 0 && random() < decayZone * 0.12) {
            return random() < 0.7 ? ' ' : '.'
          }
          if (leftDecayZone > 0 && random() < leftDecayZone * 0.09) {
            return random() < 0.7 ? ' ' : '.'
          }

          const pulseRate = heavyDrop ? 0.045 : softPulse ? 0.02 : 0.008
          const shouldCorrupt =
            random() < pulseRate * (0.92 - xRatio * 0.45) ||
            (!reducedMotion &&
              (lineIndex + frame) % 9 === 0 &&
              charIndex % 11 === frame % 11 &&
              random() < 0.18)

          if (shouldCorrupt) {
            return NOISE_CHARS[Math.floor(random() * NOISE_CHARS.length)] ?? '+'
          }

          if (char === '#' && random() < 0.18) return '+'
          if (char === '+' && random() < 0.025) return '.'

          return char
        })
        .join('')
    })
    .join('\n')
}

export default function FooterSignalField({ className = '' }: FooterSignalFieldProps) {
  const [frame, setFrame] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const baseField = useMemo(
    () => buildReferenceField(RAW_REFERENCE_ART, isMobile ? 0 : 12, isMobile ? 0 : 6),
    [isMobile],
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotionPreference = () => setReducedMotion(mediaQuery.matches)

    syncMotionPreference()
    mediaQuery.addEventListener('change', syncMotionPreference)

    return () => mediaQuery.removeEventListener('change', syncMotionPreference)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined

    const interval = window.setInterval(() => {
      setFrame((current) => current + 1)
    }, 170)

    return () => window.clearInterval(interval)
  }, [reducedMotion])

  const displayField = useMemo(
    () => createCorruptedField(baseField, frame, reducedMotion),
    [baseField, frame, reducedMotion]
  )

  const staticOpacity = reducedMotion ? 0.04 : frame % 15 === 0 ? 0.08 : 0.045

  return (
    <div className={`relative isolate h-full w-full overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_72%,rgba(77,255,148,0.09),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.008),rgba(255,255,255,0))]" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          opacity: staticOpacity,
          backgroundImage:
            'radial-gradient(circle at 10% 18%, rgba(255,255,255,0.22) 0 1px, transparent 1px), radial-gradient(circle at 31% 72%, rgba(255,255,255,0.16) 0 1px, transparent 1px), radial-gradient(circle at 58% 46%, rgba(255,255,255,0.14) 0 1px, transparent 1px)',
          backgroundSize: '20px 20px, 26px 26px, 32px 32px',
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[20%] bg-[linear-gradient(90deg,rgba(2,2,2,0),rgba(2,2,2,0.16)_48%,rgba(2,2,2,0.58)_100%)]" />
      <div className="absolute inset-[10px] overflow-hidden">
        <pre
          className="footer-signal-animate absolute bottom-0 left-0 select-none whitespace-pre font-mono font-semibold leading-[0.78] tracking-[-0.04em] text-[clamp(9px,1.8vw,14px)] sm:text-[clamp(11px,1.5vw,16px)] lg:text-[clamp(12px,1.1vw,16px)]"
          style={{
            color: '#d8d8d8',
            textShadow: '0 0 8px rgba(77,255,148,0.07)',
          }}
        >
          {displayField}
        </pre>
        <pre
          className="footer-signal-animate absolute bottom-0 left-0 select-none whitespace-pre font-mono font-semibold leading-[0.78] tracking-[-0.04em] text-[clamp(9px,1.8vw,14px)] sm:text-[clamp(11px,1.5vw,16px)] lg:text-[clamp(12px,1.1vw,16px)] opacity-[0.09] blur-[0.2px]"
          style={{
            color: '#4dff94',
            transform: 'translate3d(1px, 0, 0)',
          }}
        >
          {displayField}
        </pre>
      </div>
    </div>
  )
}
