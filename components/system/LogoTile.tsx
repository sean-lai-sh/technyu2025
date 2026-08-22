import React from 'react'

type Tone = 'green' | 'purple' | 'neutral'
type Intensity = 'subtle' | 'default'

const TONE_STYLES: Record<Tone, { border: string; glow: string }> = {
  green: { border: 'rgba(77,255,148,0.24)', glow: 'rgba(77,255,148,0.24)' },
  purple: { border: 'rgba(179,0,255,0.22)', glow: 'rgba(179,0,255,0.22)' },
  neutral: { border: 'rgba(237,237,237,0.14)', glow: 'rgba(237,237,237,0.16)' },
}

const INTENSITY: Record<Intensity, { insetPx: number; noiseOpacity: number; scanOpacity: number }> = {
  subtle: { insetPx: 18, noiseOpacity: 0.025, scanOpacity: 0.06 },
  default: { insetPx: 32, noiseOpacity: 0.045, scanOpacity: 0.1 },
}

type LogoTileProps = {
  children: React.ReactNode
  tone?: Tone
  intensity?: Intensity
  className?: string
  innerClassName?: string
}

export default function LogoTile({
  children,
  tone = 'green',
  intensity = 'default',
  className = '',
  innerClassName = '',
}: LogoTileProps) {
  const toneStyle = TONE_STYLES[tone]
  const intensityStyle = INTENSITY[intensity]

  return (
    <div
      className={`relative overflow-hidden rounded-[4px] border bg-black/70 ${className}`}
      style={{
        borderColor: toneStyle.border,
        boxShadow: `inset 0 0 ${intensityStyle.insetPx}px ${toneStyle.glow}, 0 0 18px rgba(0,0,0,0.18)`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: intensityStyle.noiseOpacity,
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0 1px, transparent 1px), radial-gradient(circle at 78% 32%, rgba(255,255,255,0.16) 0 1px, transparent 1px), radial-gradient(circle at 42% 76%, rgba(255,255,255,0.12) 0 1px, transparent 1px)',
          backgroundSize: '18px 18px, 22px 22px, 26px 26px',
          mixBlendMode: 'screen',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: intensityStyle.scanOpacity,
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 4px)',
        }}
      />
      <div className={`relative flex h-full w-full items-center justify-center ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}
